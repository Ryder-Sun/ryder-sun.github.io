import cover from "../../../assets/images/projects/tda-yolo/tda-yolo-cover.webp";
import chapter from "../../../assets/images/projects/tda-yolo/tda-yolo-chapter.webp";
import diagram from "../../../assets/images/projects/tda-yolo/tda-yolo-diagram.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "TDA-YOLO",
  theme: "light",
  tags: ["research", "pytorch", "python", "ai"],
  source: "https://github.com/Ryder-Sun/TDA-YOLO",
  description:
    "TDA-YOLO is an adaptive object-detection framework for UAV remote-sensing imagery. It addresses small, dense, and scale-varying targets with lightweight adaptive weighted downsampling, dynamic upsampling, and a deformable dynamic detection head.<br/><br/>GitHub API check on 2026-08-12: 7 stars. The repository publishes experiment evidence for VisDrone and DOTAv2 and connects model architecture choices with accuracy, computation, and deployability.",
  components: [
    {
      type: "text",
      props: {
        title: "Research problem",
        text: "UAV imagery contains tiny objects, irregular shapes, and large scale changes. Conventional downsampling can discard critical detail, while heavier receptive-field modules raise deployment cost. TDA-YOLO focuses on retaining useful spatial evidence and adapting sampling to the target rather than applying one fixed operation everywhere.",
      },
    },
    {
      type: "list",
      props: {
        title: "Core contributions",
        size: "lg",
        items: [
          "LAWDS adaptively weights features during downsampling to preserve spatial detail.",
          "Dynamic upsampling uses learned offsets and modulation with lower overhead.",
          "TD Detect applies deformable dynamic sampling across varied target scales and shapes.",
          "Published experiment artifacts make training and validation claims easier to inspect.",
        ],
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        src: cover,
        alt: "TDA-YOLO UAV remote-sensing detection cover",
        component: {
          type: "list",
          props: {
            title: "Evaluation frame",
            items: ["VisDrone and DOTAv2", "Small and dense targets", "Adaptive feature retention", "Dynamic detection head", "Accuracy and computation tradeoff"],
          },
        },
      },
    },
    {
      type: "media",
      props: { type: "image", src: chapter, alt: "TDA-YOLO small-object aerial detection scene", caption: "Chapter visual: dense aerial targets and adaptive feature preservation" },
    },
    {
      type: "media",
      props: { type: "image", src: diagram, alt: "TDA-YOLO model architecture diagram", caption: "System diagram: LAWDS, dynamic upsampling, and TD Detect" },
    },
  ],
} as const satisfies ProjectContent;
