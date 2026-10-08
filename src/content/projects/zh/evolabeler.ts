import image0 from "../../../assets/images/projects/evolabeler/evolabeler-cover.webp";
import image1 from "../../../assets/images/projects/evolabeler/evolabeler-chapter.webp";
import image2 from "../../../assets/images/projects/evolabeler/evolabeler-diagram.webp";

import type { ProjectContent } from "../../types";

export default {
  "title": "EvoLabeler AI Agent MLOps 引擎",
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
  "description": "EvoLabeler 是面向遥感目标检测的 AI Agent 驱动 MLOps 系统，覆盖数据上传、智能标注、主动学习、半监督学习、课程学习、模型训练、评估与迭代反馈。它不是单一标注工具，而是把数据生产和模型进化放进同一个闭环。<br/><br/>GitHub API 于 2026-08-12 核验：15 Stars、Python。项目重点在于让每次样本选择、标注动作、训练结果和质量评估都能成为下一轮模型改进的依据。",
  "components": [
    {
      "type": "text",
      "props": {
        "title": "项目背景",
        "text": "遥感模型迭代常常被拆成标注、训练、评估几个孤立步骤，导致数据决策和模型效果之间缺少反馈。EvoLabeler 的设计思路是把这些步骤交给 Agent 编排：系统根据不确定性、伪标签质量和训练指标决定下一批数据和下一轮实验。"
      }
    },
    {
      "type": "list",
      "props": {
        "title": "核心交付",
        "size": "lg",
        "items": [
          "连接 Electron 桌面工作区、Vue 3 前端与 FastAPI 后端，形成完整 MLOps 闭环。",
          "支持项目工作区、智能画布、YOLO/JSON 导出与训练指标管理。",
          "把主动学习、半监督学习、课程学习与评估反馈整合进同一条工作流。",
          "将模型迭代从分散工具升级为可持续自进化的数据生产线。"
        ]
      }
    },
    {
      "type": "imageText",
      "props": {
        "imagePosition": "right",
        "src": image0,
        "alt": "EvoLabeler MLOps 封面图",
        "component": {
          "type": "list",
          "props": {
            "title": "系统模块",
            "items": [
              "桌面端标注工作区",
              "Agent 编排层",
              "主动学习样本选择器",
              "YOLO 训练与评估闭环",
              "指标看板与导出路径"
            ]
          }
        }
      }
    },
    {
      "type": "list",
      "props": {
        "title": "产品判断",
        "size": "lg",
        "items": [
          "降低标注运营动作与模型效果判断之间的断层。",
          "让每次数据反馈都可以被产品与研究团队共同讨论。",
          "展示 AI 数据平台如何从人工工具走向 Agentic MLOps 系统。"
        ]
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image1,
        "alt": "EvoLabeler MLOps 封面图",
        "caption": "章节图：不确定性样本选择与标注工作流"
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image2,
        "alt": "EvoLabeler 标注闭环图",
        "caption": "示意图：数据、训练、评估与下一轮反馈"
      }
    }
  ]
} as const satisfies ProjectContent;
