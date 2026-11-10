import image0 from "../../../assets/images/projects/evolabeler/evolabeler-cover.webp";
import image1 from "../../../assets/images/projects/evolabeler/evolabeler-chapter.webp";
import image2 from "../../../assets/images/projects/evolabeler/evolabeler-diagram.webp";

import type { ProjectContent } from "../../types";

export default {
  "title": "EvoLabeler AI-Agent MLOps",
  "theme": "dark",
  "tags": [
    "mlops",
    "agent",
    "python",
    "fastapi",
    "vue",
    "pytorch"
  ],
  "videoBorder": false,
  "source": "https://github.com/Ryder-Sun/EvoLabeler-AIAgent-MLOps",
  "description": "EvoLabeler is an AI Agent-driven MLOps system for remote-sensing object detection. It connects data upload, intelligent annotation, active learning, semi-supervised learning, curriculum learning, model training, evaluation, and iteration feedback into one loop rather than a standalone labeling tool.<br/><br/>GitHub API check on 2026-08-12: 15 stars, Python. The product focus is making every sample-selection decision, annotation action, training result, and quality signal usable for the next model-improvement cycle.",
  "components": [
    {
      "type": "text",
      "props": {
        "title": "Context",
        "text": "Remote-sensing model iteration is often split into disconnected labeling, training, and evaluation steps, which weakens feedback between data decisions and model outcomes. EvoLabeler treats those steps as an Agent-orchestrated workflow where uncertainty, pseudo-label quality, and training metrics decide the next batch of data and experiments."
      }
    },
    {
      "type": "list",
      "props": {
        "title": "Core Delivery",
        "size": "lg",
        "items": [
          "Connects Electron desktop workspace, Vue 3 frontend, and FastAPI backend into a full MLOps loop.",
          "Supports project workspaces, intelligent canvas operations, YOLO/JSON export, and training metric management.",
          "Combines active learning, semi-supervised learning, curriculum learning, and evaluation feedback into one workflow.",
          "Frames model iteration as a self-evolving pipeline rather than isolated labeling and training tools."
        ]
      }
    },
    {
      "type": "imageText",
      "props": {
        "imagePosition": "right",
        "src": image0,
        "alt": "EvoLabeler MLOps cover visual",
        "component": {
          "type": "list",
          "props": {
            "title": "System Modules",
            "items": [
              "Desktop annotation workspace",
              "Agent orchestration layer",
              "Active-learning sample selector",
              "YOLO training and evaluation loop",
              "Metrics dashboard and export path"
            ]
          }
        }
      }
    },
    {
      "type": "list",
      "props": {
        "title": "Product Judgment",
        "size": "lg",
        "items": [
          "Reduces the gap between annotation operations and model performance decisions.",
          "Makes each data feedback loop measurable enough for product and research discussion.",
          "Shows how AI data platforms can move from manual tooling to agentic MLOps systems."
        ]
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image1,
        "alt": "EvoLabeler MLOps cover visual",
        "caption": "Chapter visual: uncertainty selection and annotation workflow"
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image2,
        "alt": "EvoLabeler annotation loop visual",
        "caption": "System diagram: data, training, evaluation, and next-round feedback"
      }
    }
  ]
} as const satisfies ProjectContent;
