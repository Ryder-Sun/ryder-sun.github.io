import pokedex0 from "../../../assets/images/projects/pokedex/pokedex-0.webp";
import pokedex1 from "../../../assets/images/projects/pokedex/pokedex-1.webp";
import pokedex2 from "../../../assets/images/projects/pokedex/pokedex-2.webp";
import pokedex3 from "../../../assets/images/projects/pokedex/pokedex-3.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "LPS-YOLO 科研项目",
  theme: "light",
  tags: ["research", "pytorch", "python", "ai"],
  source: "https://github.com/Ryder-Sun/LPS-YOLO",
  description:
    "这是我从算法研究走向 AI 产品判断的重要项目：围绕无人机遥感图像中的小目标、密集目标和尺度变化问题，提出更轻量的特征增强与检测结构，在保证效果提升的同时关注部署成本。<br/><br/>项目发表于 Scientific Reports，并在 VisDrone、DOTAv2 等评估中体现出精度、参数量和小目标检测能力的综合改进。本页用脱敏视觉表达结构，不声称展示论文原图。",
  components: [
    {
      type: "text",
      props: {
        title: "研究问题",
        text: "遥感检测不是单纯追求榜单指标：无人机平台算力有限，目标又小且密集，任何结构改动都必须同时回答“能不能更准”和“能不能更轻”。我在这个项目中关注的是特征保留、多尺度融合和轻量化之间的平衡，这也影响了我后来评价 AI 产品时对部署约束的敏感度。",
      },
    },
    {
      type: "list",
      props: {
        title: "核心结构",
        size: "lg",
        items: [
          "SPDConv：在下采样过程中保留更多空间细节。",
          "SKAPP：自适应特征选择，强化小目标表达。",
          "E-BiFPN：更高效的多尺度特征融合。",
          "基于 PyTorch 与遥感数据集实现 YOLO 检测流程。",
        ],
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        src: pokedex0,
        alt: "遥感检测结果结构示意",
        component: {
          type: "list",
          props: {
            title: "论文结果",
            items: [
              "VisDrone：相较基线 mAP 提升 17.3%",
              "参数量：相较基线减少 42.5%",
              "DOTAv2：F1 分数提升 14.5%",
              "发表于 Scientific Reports",
            ],
          },
        },
      },
    },
    {
      type: "text",
      props: {
        title: "产品化视角",
        text: "这段科研经历影响了我后来做 AI 产品的评价方式：模型改进只有真正改变部署约束、流程成本或用户能力时才有产品意义。这个视角也迁移到了我后续的 Agent 和 AI 产品工作中。",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex1,
        alt: "模型结构示意",
        caption: "结构示意：LPS-YOLO 模块关系",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex2,
        alt: "小目标检测场景示意",
        caption: "结构示意：无人机遥感小目标检测场景",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex3,
        alt: "实验对比示意",
        caption: "结构示意：实验对比与消融分析框架",
      },
    },
  ],
} as const satisfies ProjectContent;
