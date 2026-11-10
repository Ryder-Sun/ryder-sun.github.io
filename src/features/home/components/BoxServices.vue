<script setup lang="ts">
import { computed, ref, watchEffect, onBeforeUnmount, onBeforeUpdate } from "vue";
import gsap from "gsap";
import { locale } from "../../../i18n/store";
import { t } from "../../../i18n/utils/translate";
import AppearingText from "../../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import ProjectedElement from "../../../components/ProjectedElement.vue";
import zgciLogo from "../../../assets/logos/zgci.png";
import meituanLogo from "../../../assets/logos/meituan-white.svg";
import baiduLogo from "../../../assets/logos/baidu-white.svg";
import zhipuLogo from "../../../assets/logos/zhipu-lobe.svg";
import jiduLogo from "../../../assets/logos/jidu.png";

const point = new Vector3(0.75, 2.75, 6.75);

const wrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
const subRefs = ref<HTMLElement[]>([]);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value;
  if (!wrapperEl) return;

  if (matchMedia) {
    matchMedia.revert();
    matchMedia = null;
  }

  matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      isMobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
      isDesktop: `(min-width: ${BREAKPOINTS.md}px)`,
    },
    (context) => {
      const { conditions } = context;
      const { isMobile } = conditions as { isMobile: boolean; isDesktop: boolean };

      const tl = gsap.timeline({
        paused: true,
      });

      // Only animate clipPath on desktop
      if (!isMobile) {
        tl.fromTo(
          wrapperEl,
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "none" },
          0,
        );
      } else {
        // On mobile, ensure clipPath is set to visible immediately
        gsap.set(wrapperEl, { clipPath: "inset(0% 0% 0% 0%)" });
      }

      for (let i = 0; i < timelines.value.length; i++) {
        const item = timelines.value[i];
        if (!item) continue;
        tl.add(() => {
          item.timeline.restart(true);
        }, item.delay + 0.25);
      }

      // Only fade in on desktop
      if (!isMobile && subRefs.value.length > 0) {
        const subItems = subRefs.value.filter((ref) => ref !== null && ref !== undefined);
        if (subItems.length > 0) {
          tl.fromTo(
            subItems,
            { opacity: 0, x: 18, filter: "blur(6px)" },
            { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.24, stagger: 0.08, ease: "power2.out" },
            0.28,
          );
        }
      } else if (isMobile && subRefs.value.length > 0) {
        // On mobile, ensure opacity is 1 immediately
        const subItems = subRefs.value.filter((ref) => ref !== null && ref !== undefined);
        if (subItems.length > 0) {
          gsap.set(subItems, { opacity: 1, x: 0, filter: "blur(0px)" });
        }
      }

      emit("timeline:created", tl);

      // Return cleanup function
      return () => {
        tl.kill();
      };
    },
  );

  onInvalidate(() => {
    if (matchMedia) {
      matchMedia.revert();
      matchMedia = null;
    }
  });
});

onBeforeUnmount(() => {
  if (matchMedia) {
    matchMedia.revert();
  }
});

onBeforeUpdate(() => {
  subRefs.value = [];
});

const handleTimelineCreated = (timeline: gsap.core.Timeline, delay: number) => {
  const updatedTimelines = [...timelines.value, { timeline, delay }];
  timelines.value = updatedTimelines;
};

const setExperienceRef = (el: unknown) => {
  if (el instanceof HTMLElement) {
    subRefs.value.push(el);
  }
};

type ExperienceLogoKey = "zgci" | "meituan" | "baidu" | "zhipu" | "jidu";

type Experience = {
  period: string;
  company: string;
  role: string;
  logo: ExperienceLogoKey;
};

/** Official brand marks imported as modules so Vite resolves the deployed base path. */
const LOGO_SOURCES: Record<ExperienceLogoKey, string> = {
  zgci: zgciLogo,
  meituan: meituanLogo,
  baidu: baiduLogo,
  zhipu: zhipuLogo,
  jidu: jiduLogo,
};

const LOGO_ALT: Record<ExperienceLogoKey, string> = {
  zgci: "ZGCI logo",
  meituan: "Meituan logo",
  baidu: "Baidu logo",
  zhipu: "Zhipu AI logo",
  jidu: "JIDU logo",
};

/** Horizontal wordmarks need a wider logo slot than square icons to stay legible. */
const WIDE_LOGO_KEYS: ReadonlySet<string> = new Set(["zgci", "jidu"]);

const EXPERIENCE_EN = [
  { period: "2025.8 - Now", company: "ZGCI Intelligent Innovation Center", role: "Product Manager (Full-time)", logo: "zgci" },
  { period: "2025.6 - 2025.8", company: "Meituan Infrastructure", role: "Product Manager Intern", logo: "meituan" },
  { period: "2025.4 - 2025.4", company: "Baidu · Wenxin Yige", role: "AIGC Product Manager Intern", logo: "baidu" },
  { period: "2024.4 - 2025.6", company: "Zhipu AI", role: "Product Manager Intern", logo: "zhipu" },
  { period: "2024.11 - 2025.4", company: "Meituan AI Product", role: "LLM Platform PM Intern", logo: "meituan" },
  { period: "2024.5 - 2024.11", company: "JIDU / Zhongke Huizhou", role: "AI Product & Algorithm PM", logo: "jidu" },
] as const satisfies readonly Experience[];

const EXPERIENCE_ZH = [
  { period: "2025.8 - 至今", company: "ZGCI 智能创新中心", role: "产品经理（正职）", logo: "zgci" },
  { period: "2025.6 - 2025.8", company: "美团基础技术部", role: "产品经理实习生", logo: "meituan" },
  { period: "2025.4 - 2025.4", company: "百度 · 文心一格", role: "AIGC 产品经理实习生", logo: "baidu" },
  { period: "2024.4 - 2025.6", company: "北京智谱科技", role: "产品经理实习生", logo: "zhipu" },
  { period: "2024.11 - 2025.4", company: "美团智能产品部", role: "LLM 平台产品经理实习生", logo: "meituan" },
  { period: "2024.5 - 2024.11", company: "集度汽车 / 中科汇洲", role: "AI 产品与算法产品实习", logo: "jidu" },
] as const satisfies readonly Experience[];

const experiences = computed(() => {
  return locale.value === "zh" ? EXPERIENCE_ZH : EXPERIENCE_EN;
});
</script>

<template>
  <ProjectedElement :point="point">
    <div ref="wrapperRef" class="box-services">
      <div class="box-services-content">
        <div class="box-services-header">
          <div>
            <p class="box-services-eyebrow">{{ t("experience-meta") }}</p>
            <div class="box-services-title">
              <AppearingText
                :text="t('experience-title')"
                :steps="1"
                :duration="0.35"
                @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
              />
            </div>
          </div>
          <span class="box-services-status">LIVE</span>
        </div>
        <div class="box-services-timeline">
          <div
            class="box-services-experience"
            :class="{ 'has-wide-logo': WIDE_LOGO_KEYS.has(experience.logo) }"
            v-for="experience in experiences"
            :key="`${experience.period}-${experience.company}`"
            :ref="setExperienceRef"
          >
            <span class="box-services-dot" aria-hidden="true"></span>
            <div class="box-services-experience-main">
              <span class="box-services-logo">
                <img :src="LOGO_SOURCES[experience.logo]" :alt="LOGO_ALT[experience.logo]" />
              </span>
              <p class="box-services-company">{{ experience.company }}</p>
              <p class="box-services-period">{{ experience.period }}</p>
              <p class="box-services-role">{{ experience.role }}</p>
            </div>
          </div>
        </div>
        <p class="box-services-footer">{{ t("experience-footer") }}</p>
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
// 全新视觉：深色磨砂玻璃 + 极简编辑感时间轴
// accent 单色，白灰做层次；无扫描线 / 网格 / 脉冲等 HUD 元素
.box-services {
  --line-length: min(48px, calc(var(--svw) * 5));

  // 时间轴几何：圆点尺寸 / 圆点到文案的间距 / 卡片左内边距
  --accent: #67e8f9;
  --dot-size: 7px;
  --rail-gap: 14px;
  --card-pad-left: 12px;

  position: absolute;
  bottom: var(--count-height);
  width: calc(100% - var(--space-outer) * 2);
  left: var(--space-outer);

  @include mixins.landscape {
    width: 620px;
    max-width: calc(var(--svw) * 46);
    padding-left: var(--line-length);
    position: relative;
    left: 0;
    bottom: 0;
    padding-top: 3px;
    transform: translate(0, -42%);
  }

  @include mixins.landscape-large {
    width: 560px;
    max-width: calc(var(--svw) * 44);
  }

  &::after,
  &::before {
    display: none;

    @include mixins.landscape {
      display: block;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 9px;
    height: 9px;
    background-color: var(--accent);
    border-radius: 50%;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 0;
    border-top: var(--stroke-sm) solid rgba(103, 232, 249, 0.6);

    @include mixins.landscape {
      width: var(--line-length);
    }
  }

  &-content {
    border: var(--stroke-sm) solid rgba(255, 255, 255, 0.09);
    border-radius: 16px;
    background: rgba(7, 12, 20, 0.6);
    backdrop-filter: blur(20px) saturate(1.25);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    overflow: hidden;
    padding: var(--space-sm) var(--space-md);

    @include mixins.landscape {
      padding: var(--space-xs) var(--space-sm);
    }

    @include mixins.mq("md") {
      padding: var(--space-sm) var(--space-md);
    }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    gap: var(--space-sm);
    align-items: flex-start;
  }

  &-title {
    font-size: var(--font-size-title-xs);
    font-weight: 700;
    color: var(--color-white-400);
    letter-spacing: -0.01em;

    @include mixins.landscape {
      font-size: var(--font-size-title-xxs);
    }

    @include mixins.landscape-large {
      font-size: var(--font-size-title-xs);
    }
  }

  &-eyebrow,
  &-footer,
  &-status {
    font-size: var(--font-size-xs);
  }

  &-eyebrow {
    margin-bottom: 4px;
    color: rgba(255, 255, 255, 0.42);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  // 极简状态：小圆点 + 文字，无描边无辉光
  &-status {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    gap: 6px;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-size: 10px;

    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 8px rgba(103, 232, 249, 0.7);
      animation: experience-live-blink 2.6s ease-in-out infinite;
    }
  }

  &-timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &::before {
      content: "";
      position: absolute;
      top: 14px;
      bottom: 14px;
      left: calc(var(--card-pad-left) + var(--dot-size) / 2);
      width: 1px;
      background: rgba(255, 255, 255, 0.08);
    }
  }

  // 每条经历：时间轴圆点 + logo + 公司/时间 + 职位
  &-experience {
    --badge-width: 64px;

    position: relative;
    display: grid;
    grid-template-columns: var(--dot-size) minmax(0, 1fr);
    column-gap: var(--rail-gap);
    row-gap: 5px;
    padding: 12px 12px 13px var(--card-pad-left);
    border-radius: 12px;
    opacity: 0;

    &.has-wide-logo {
      --badge-width: 96px;
    }
  }

  // 时间轴节点：accent 内芯 + 白色描边，静态呈现
  &-dot {
    position: relative;
    z-index: 1;
    grid-column: 1;
    width: var(--dot-size);
    height: var(--dot-size);
    margin-top: 7px;
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    border-radius: 50%;
    background: rgba(7, 12, 20, 0.9);
    box-shadow: 0 0 0 3px rgba(7, 12, 20, 0.9);

    &::after {
      content: "";
      position: absolute;
      inset: 1.5px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 8px rgba(103, 232, 249, 0.8);
    }
  }

  // 第二列内部再分三栏：logo / 公司名 / 时间；职位跨后两栏，与公司名左对齐
  &-experience-main {
    grid-column: 2;
    display: grid;
    grid-template-columns: var(--badge-width) minmax(0, 1fr) auto;
    column-gap: 10px;
    row-gap: 4px;
    align-items: center;
    min-width: 0;
  }

  // 透明布局占位：仅负责 logo 与公司名左对齐，无背景 / 边框 / 圆角
  &-logo {
    grid-column: 1;
    grid-row: 1 / span 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--badge-width);
    height: 36px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &-company {
    grid-column: 2;
    grid-row: 1;
    overflow: hidden;
    min-width: 0;
    color: var(--color-white-400);
    font-size: var(--font-size-sm);
    font-weight: 600;
    letter-spacing: -0.005em;
    text-overflow: ellipsis;
    white-space: nowrap;

    @include mixins.landscape-large {
      font-size: var(--font-size-md);
    }
  }

  &-period {
    grid-column: 3;
    grid-row: 1;
    color: rgba(255, 255, 255, 0.4);
    font-size: 10.5px;
    letter-spacing: 0.06em;
    font-variant-numeric: tabular-nums;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &-role {
    grid-column: 2 / span 2;
    grid-row: 2;
    color: rgba(255, 255, 255, 0.68);
    font-size: var(--font-size-xxs);
    line-height: 1.35;
  }

  &-footer {
    color: rgba(255, 255, 255, 0.42);
    line-height: 1.4;
  }

  @media (prefers-reduced-motion: reduce) {
    .box-services-status::before {
      animation: none;
    }
  }
}

@keyframes experience-live-blink {
  0%,
  100% {
    opacity: 0.4;
  }

  50% {
    opacity: 1;
  }
}
</style>
