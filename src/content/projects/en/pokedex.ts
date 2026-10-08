import pokedex0 from "../../../assets/images/projects/pokedex/pokedex-0.webp";
import pokedex1 from "../../../assets/images/projects/pokedex/pokedex-1.webp";
import pokedex2 from "../../../assets/images/projects/pokedex/pokedex-2.webp";
import pokedex3 from "../../../assets/images/projects/pokedex/pokedex-3.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "LPS-YOLO Research",
  theme: "light",
  tags: ["research", "pytorch", "python", "ai"],
  source: "https://github.com/Ryder-Sun/LPS-YOLO",
  description:
    "A research project that shaped how I connect algorithms with product judgment. It addresses small, dense, and scale-varying objects in UAV remote-sensing imagery with lightweight feature enhancement and detection modules, improving accuracy while keeping deployment cost in view.<br/><br/>The work was published in Scientific Reports and evaluated on datasets such as VisDrone and DOTAv2. This page preserves the research metrics and uses privacy-safe structural visuals rather than claiming to show original paper figures.",
  components: [
    {
      type: "text",
      props: {
        title: "Research Problem",
        text: "Remote-sensing detection is not just about chasing benchmark numbers: UAV platforms have limited compute, while targets are small and dense. Every architectural change needs to answer both “is it more accurate?” and “is it still deployable?” This project trained my sensitivity to the tradeoff between feature preservation, multi-scale fusion, and lightweight deployment.",
      },
    },
    {
      type: "list",
      props: {
        title: "Core Architecture",
        size: "lg",
        items: [
          "SPDConv for preserving spatial detail during downsampling.",
          "SKAPP for adaptive feature selection and stronger small-object representation.",
          "E-BiFPN for efficient multi-scale feature fusion.",
          "YOLO-based detection pipeline implemented with PyTorch and remote-sensing datasets.",
        ],
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        src: pokedex0,
        alt: "Concept visual of remote-sensing detection results",
        component: {
          type: "list",
          props: {
            title: "Reported Results",
            items: [
              "VisDrone: mAP +17.3% versus baseline",
              "Parameters: -42.5% versus baseline",
              "DOTAv2: F1 score +14.5%",
              "Published in Scientific Reports",
            ],
          },
        },
      },
    },
    {
      type: "text",
      props: {
        title: "Product-Minded Takeaway",
        text: "This research shaped how I evaluate AI products: a model improvement is only useful when it changes a deployment constraint, workflow cost, or user-facing capability. That lens now guides my Agent and AI product work as well.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex1,
        alt: "Model structure concept visual",
        caption: "Concept visual: LPS-YOLO module structure",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex2,
        alt: "Small-object detection concept visual",
        caption: "Concept visual: small-object detection scenario",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex3,
        alt: "Experiment comparison concept visual",
        caption: "Concept visual: experiment comparison and ablation framing",
      },
    },
  ],
} as const satisfies ProjectContent;
