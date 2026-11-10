<script setup lang="ts">
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import ButtonRound from "../../../components/ButtonRound.vue";
import ArrowRightLong from "../../../components/icons/ArrowRightLong.vue";
import { useRouter } from "../../../composables/useRouter";

import type { ProjectPreview } from "../../../content/types";

type GL = Renderer["gl"];
type Direction = "right" | "left";

type GalleryItem = {
  image: string;
  text: string;
  slug?: string;
  url?: string;
  external?: boolean;
};

const props = withDefaults(
  defineProps<{
    previews: ProjectPreview[];
    showStartCard?: boolean;
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    scrollSpeed?: number;
    scrollEase?: number;
    autoScrollSpeed?: number;
  }>(),
  {
    showStartCard: false,
    bend: 2.4,
    textColor: "#2b2822",
    borderRadius: 0.055,
    scrollSpeed: 2,
    scrollEase: 0.055,
    autoScrollSpeed: 0.65,
  },
);

const router = useRouter();
const containerRef = ref<HTMLDivElement | null>(null);
const appRef = ref<GalleryApp | null>(null);

const galleryItems = computed<GalleryItem[]>(() => {
  const items = props.previews.map((preview) => ({
    image: preview.thumbnail,
    text: preview.title,
    slug: preview.slug,
  }));

  return items;
});

const selectItem = (item: GalleryItem) => {
  if (item.external && item.url) {
    window.open(item.url, "_blank", "noopener,noreferrer");
    return;
  }

  if (item.slug) router.push(`/project/${item.slug}`);
};

const rebuildGallery = () => {
  appRef.value?.destroy();
  appRef.value = null;

  if (!containerRef.value || galleryItems.value.length === 0) return;

  appRef.value = new GalleryApp(containerRef.value, {
    items: galleryItems.value,
    bend: props.bend,
    textColor: props.textColor,
    borderRadius: props.borderRadius,
    scrollSpeed: props.scrollSpeed,
    scrollEase: props.scrollEase,
    autoScrollSpeed: props.autoScrollSpeed,
    onSelect: selectItem,
  });
};

watch(
  () => [galleryItems.value, props.bend, props.textColor, props.borderRadius, props.scrollSpeed, props.scrollEase, props.autoScrollSpeed],
  () => {
    nextTick(rebuildGallery);
  },
  { deep: true },
);

onMounted(() => {
  nextTick(rebuildGallery);
});

onUnmounted(() => {
  appRef.value?.destroy();
  appRef.value = null;
});

function debounce<T extends (...args: never[]) => void>(func: T, wait: number) {
  let timeout = 0;
  return (...args: Parameters<T>) => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function getFontSize(font: string) {
  const match = font.match(/(\d+)px/);
  return match ? Number.parseInt(match[1] ?? "30", 10) : 30;
}

function createTextTexture(gl: GL, text: string, font = "900 34px Urbanist", color = "#2b2822") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get 2d context");

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  context.font = font;
  const metrics = context.measureText(text);
  const fontSize = getFontSize(font);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(fontSize * 1.25);
  const width = textWidth + 28;
  const height = textHeight + 22;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  context.scale(dpr, dpr);
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, width, height);
  context.fillText(text, width / 2, height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width, height };
}

interface ScreenSize {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

class Title {
  gl: GL;
  plane: Mesh;
  text: string;
  textColor: string;
  font: string;
  mesh!: Mesh;
  textureAspect = 1;

  constructor(gl: GL, plane: Mesh, text: string, textColor: string, font: string) {
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    this.textureAspect = width / height;
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });

    this.mesh = new Mesh(this.gl, { geometry, program });
    this.onResize();
    this.mesh.setParent(this.plane);
  }

  onResize() {
    const localTextHeight = 0.12;
    const localTextWidth = (this.plane.scale.y * localTextHeight * this.textureAspect) / this.plane.scale.x;
    this.mesh.scale.set(localTextWidth, localTextHeight, 1);
    this.mesh.position.y = -0.5 - localTextHeight * 0.5 - 0.055;
  }
}

interface MediaProps {
  geometry: Plane;
  gl: GL;
  item: GalleryItem;
  index: number;
  length: number;
  scene: Transform;
  screen: ScreenSize;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius: number;
}

class Media {
  props: MediaProps;
  extra = 0;
  program!: Program;
  plane!: Mesh;
  title!: Title;
  scale = 1;
  padding = 2;
  width = 0;
  widthTotal = 0;
  x = 0;
  speed = 0;
  isBefore = false;
  isAfter = false;
  imageAspect = 16 / 9;

  constructor(props: MediaProps) {
    this.props = props;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  get item(): GalleryItem {
    return this.props.item;
  }

  createShader() {
    const texture = new Texture(this.props.gl, { generateMipmaps: false });
    this.program = new Program(this.props.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + abs(uSpeed) * 0.55);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, color.a * alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [1200, 760] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.props.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.props.item.image;
    img.onload = () => {
      this.imageAspect = img.naturalWidth / img.naturalHeight;
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      this.onResize();
    };
  }

  createMesh() {
    this.plane = new Mesh(this.props.gl, {
      geometry: this.props.geometry,
      program: this.program,
    });
    this.plane.setParent(this.props.scene);
  }

  createTitle() {
    this.title = new Title(this.props.gl, this.plane, this.props.item.text, this.props.textColor, "900 34px Urbanist");
  }

  update(scroll: { current: number; last: number }, direction: Direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const halfViewport = this.props.viewport.width / 2;

    if (this.props.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bendAbs = Math.abs(this.props.bend);
      const radius = (halfViewport * halfViewport + bendAbs * bendAbs) / (2 * bendAbs);
      const effectiveX = Math.min(Math.abs(x), halfViewport);
      const arc = radius - Math.sqrt(radius * radius - effectiveX * effectiveX);

      if (this.props.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / radius);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / radius);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.props.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }

    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize(screen?: ScreenSize, viewport?: Viewport) {
    if (screen) this.props.screen = screen;
    if (viewport) this.props.viewport = viewport;

    this.scale = this.props.screen.height / 1500;
    const maxHeight = (this.props.viewport.height * (880 * this.scale)) / this.props.screen.height;
    const maxWidth = maxHeight * 1.62;
    const aspect = Math.min(Math.max(this.imageAspect, 0.68), 1.9);

    if (aspect >= 1) {
      this.plane.scale.x = Math.min(maxHeight * aspect, maxWidth);
      this.plane.scale.y = this.plane.scale.x / aspect;
    } else {
      this.plane.scale.y = maxHeight;
      this.plane.scale.x = maxHeight * aspect;
    }

    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.title?.onResize();
    this.padding = this.props.viewport.width < 18 ? 1.45 : 1.95;
    this.width = maxWidth + this.padding;
    this.widthTotal = this.width * this.props.length;
    this.x = this.width * this.props.index;
  }
}

interface GalleryAppConfig {
  items: GalleryItem[];
  bend: number;
  textColor: string;
  borderRadius: number;
  scrollSpeed: number;
  scrollEase: number;
  autoScrollSpeed: number;
  onSelect: (item: GalleryItem) => void;
}

class GalleryApp {
  container: HTMLElement;
  config: GalleryAppConfig;
  scroll: { ease: number; current: number; target: number; last: number; position: number };
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  screen!: ScreenSize;
  viewport!: Viewport;
  raf = 0;
  isDown = false;
  isHovering = false;
  start = 0;
  startY = 0;
  pointerId = -1;
  movedDuringDrag = false;
  lastFrameTime = performance.now();
  onCheckDebounce: () => void;
  boundOnResize = this.onResize.bind(this);
  boundOnPointerDown = this.onPointerDown.bind(this);
  boundOnPointerMove = this.onPointerMove.bind(this);
  boundOnPointerUp = this.onPointerUp.bind(this);
  boundOnPointerEnter = this.onPointerEnter.bind(this);
  boundOnPointerLeave = this.onPointerLeave.bind(this);

  constructor(container: HTMLElement, config: GalleryAppConfig) {
    this.container = container;
    this.config = config;
    this.scroll = { ease: config.scrollEase, current: 0, target: 0, last: 0, position: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 180);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias() {
    const doubledItems = this.config.items.concat(this.config.items);
    this.medias = doubledItems.map((item, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        item,
        index,
        length: doubledItems.length,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend: this.config.bend,
        textColor: this.config.textColor,
        borderRadius: this.config.borderRadius,
      });
    });
  }

  onPointerEnter() {
    this.isHovering = true;
  }

  onPointerLeave() {
    this.isHovering = false;
    if (this.isDown) this.finishPointer();
  }

  onPointerDown(event: PointerEvent) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    this.isDown = true;
    this.pointerId = event.pointerId;
    this.movedDuringDrag = false;
    this.scroll.position = this.scroll.current;
    this.start = event.clientX;
    this.startY = event.clientY;
    this.container.setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent) {
    if (!this.isDown || event.pointerId !== this.pointerId) return;
    const deltaX = event.clientX - this.start;
    const deltaY = event.clientY - this.startY;
    const distance = -deltaX * (this.config.scrollSpeed * 0.025);
    if (Math.hypot(deltaX, deltaY) > 8) this.movedDuringDrag = true;
    this.scroll.target = this.scroll.position + distance;
    event.preventDefault();
  }

  onPointerUp(event: PointerEvent) {
    if (event.pointerId !== this.pointerId) return;
    const shouldSelect = !this.movedDuringDrag;
    this.finishPointer(event);
    if (shouldSelect) this.selectFromPointer(event.clientX, event.clientY);
  }

  finishPointer(event?: PointerEvent) {
    if (event && this.container.hasPointerCapture(event.pointerId)) {
      this.container.releasePointerCapture(event.pointerId);
    }

    this.isDown = false;
    this.pointerId = -1;
    this.onCheck();
  }

  onCheck() {
    if (!this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: Math.max(this.container.clientWidth, 1),
      height: Math.max(this.container.clientHeight, 1),
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    this.medias.forEach((media) => media.onResize(this.screen, this.viewport));
  }

  update() {
    const now = performance.now();
    const deltaMs = Math.min(now - this.lastFrameTime, 120);
    this.lastFrameTime = now;

    if (!this.isDown && this.config.autoScrollSpeed !== 0 && !document.hidden) {
      this.scroll.target += (this.config.autoScrollSpeed * deltaMs) / 1000;
    }

    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction: Direction = this.scroll.current > this.scroll.last ? "right" : "left";
    this.medias.forEach((media) => media.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  scrollByCard(direction: -1 | 1) {
    const width = this.medias[0]?.width ?? 1;
    this.scroll.target += width * direction;
    this.onCheckDebounce();
  }

  selectFromPointer(clientX: number, clientY: number) {
    const rect = this.container.getBoundingClientRect();
    const worldX = ((clientX - rect.left) / rect.width - 0.5) * this.viewport.width;
    const worldY = -((clientY - rect.top) / rect.height - 0.5) * this.viewport.height;
    let selected: Media | null = null;
    let bestScore = Number.POSITIVE_INFINITY;

    for (const media of this.medias) {
      const dx = Math.abs(worldX - media.plane.position.x);
      const dy = Math.abs(worldY - media.plane.position.y);
      const titleCenterY = media.plane.position.y + media.plane.scale.y * (media.title?.mesh.position.y ?? 0);
      const imageHalfX = media.plane.scale.x * 0.62;
      const imageHalfY = media.plane.scale.y * 0.68;
      const titleHalfX = Math.max(imageHalfX, media.plane.scale.x * (media.title?.mesh.scale.x ?? 0) * 0.72);
      const titleHalfY = Math.max(media.plane.scale.y * (media.title?.mesh.scale.y ?? 0) * 1.1, 0.18);
      const titleDy = Math.abs(worldY - titleCenterY);
      const cardTop = Math.max(media.plane.position.y + imageHalfY, titleCenterY + titleHalfY) + 0.16;
      const cardBottom = Math.min(media.plane.position.y - imageHalfY, titleCenterY - titleHalfY) - 0.16;
      const insideImage = dx <= imageHalfX && dy <= imageHalfY;
      const insideTitle = dx <= titleHalfX && titleDy <= titleHalfY;
      const insideCard = dx <= titleHalfX && worldY >= cardBottom && worldY <= cardTop;
      const score = insideTitle ? dx + titleDy : dx + Math.min(dy, titleDy) * 1.4;

      if ((insideImage || insideTitle || insideCard) && score < bestScore) {
        selected = media;
        bestScore = score;
      }
    }

    if (selected) this.config.onSelect(selected.item);
  }

  addEventListeners() {
    window.addEventListener("resize", this.boundOnResize);
    this.container.addEventListener("pointerdown", this.boundOnPointerDown);
    this.container.addEventListener("pointermove", this.boundOnPointerMove);
    this.container.addEventListener("pointerup", this.boundOnPointerUp);
    this.container.addEventListener("pointercancel", this.boundOnPointerUp);
    this.container.addEventListener("pointerenter", this.boundOnPointerEnter);
    this.container.addEventListener("pointerleave", this.boundOnPointerLeave);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    this.container.removeEventListener("pointerdown", this.boundOnPointerDown);
    this.container.removeEventListener("pointermove", this.boundOnPointerMove);
    this.container.removeEventListener("pointerup", this.boundOnPointerUp);
    this.container.removeEventListener("pointercancel", this.boundOnPointerUp);
    this.container.removeEventListener("pointerenter", this.boundOnPointerEnter);
    this.container.removeEventListener("pointerleave", this.boundOnPointerLeave);

    const canvas = this.renderer.gl.canvas as HTMLCanvasElement;
    canvas.parentNode?.removeChild(canvas);
    this.gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
}
</script>

<template>
  <div class="projects-circular-gallery-shell">
    <div
      ref="containerRef"
      class="projects-circular-gallery"
      aria-label="Selected projects circular gallery"
      data-cursor="arrow"
      data-hoversound="hover"
    />

    <div class="projects-circular-gallery-controls" aria-label="Project carousel controls">
      <ButtonRound
        class="projects-circular-gallery-control projects-circular-gallery-control-prev"
        variant="theme"
        type="button"
        aria-label="Previous projects"
        data-cursor="circle-white"
        data-hoversound="hover"
        @click="appRef?.scrollByCard(-1)"
      >
        <ArrowRightLong />
      </ButtonRound>
      <ButtonRound
        class="projects-circular-gallery-control"
        variant="accent"
        type="button"
        aria-label="Next projects"
        data-cursor="circle-white"
        data-hoversound="hover"
        @click="appRef?.scrollByCard(1)"
      >
        <ArrowRightLong />
      </ButtonRound>
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects-circular-gallery {
  position: relative;
  width: 100%;
  height: clamp(440px, 55vw, 660px);
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;

  &:active {
    cursor: grabbing;
  }

  :deep(canvas) {
    display: block;
    width: 100%;
    height: 100%;
  }

  &-shell {
    position: relative;
    width: 100%;
    padding: 0;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      z-index: 1;
      width: min(12vw, 150px);
      height: 100%;
      pointer-events: none;
    }

    &::before {
      left: 0;
      background: linear-gradient(90deg, var(--color-beige-400), rgba(245, 239, 230, 0));
    }

    &::after {
      right: 0;
      background: linear-gradient(270deg, var(--color-beige-400), rgba(245, 239, 230, 0));
    }
  }

  &-controls {
    position: absolute;
    right: max(var(--space-outer), calc((100vw - var(--breakpoint-xl)) / 2 + var(--space-outer)));
    bottom: var(--space-lg);
    z-index: 2;
    display: flex;
    gap: var(--space-xs);
  }

  &-control {
    box-shadow: 0 14px 34px rgba(36, 29, 24, 0.16);

    &-prev {
      transform: rotate(180deg);
    }
  }
}
</style>
