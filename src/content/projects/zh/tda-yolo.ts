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
    "TDA-YOLO 是面向无人机遥感影像的自适应目标检测框架，针对小目标、密集目标和尺度变化问题，引入轻量自适应加权下采样、动态上采样和可变形动态检测头。<br/><br/>GitHub API 于 2026-08-12 核验：7 Stars。仓库公开 VisDrone 与 DOTAv2 的实验数据，把模型结构选择与精度、计算量和部署可行性联系起来。",
  components: [
    {
      type: "text",
      props: {
        title: "研究问题",
        text: "无人机影像中的目标尺寸小、形状不规则且尺度变化明显。固定下采样容易损失关键细节，单纯扩大感受野又会提高部署成本。TDA-YOLO 的重点是根据特征与目标动态调整采样，在保留空间证据的同时控制计算开销。",
      },
    },
    {
      type: "list",
      props: {
        title: "核心贡献",
        size: "lg",
        items: [
          "LAWDS 在下采样时自适应加权特征，保留关键空间细节。",
          "动态上采样通过学习偏移与调制降低传统方案开销。",
          "TD Detect 用可变形动态采样适配不同尺度和形状的目标。",
          "公开训练与验证实验数据，使研究结果更容易复核。",
        ],
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        src: cover,
        alt: "TDA-YOLO 无人机遥感检测封面",
        component: {
          type: "list",
          props: { title: "评估框架", items: ["VisDrone 与 DOTAv2", "小目标与密集目标", "自适应特征保留", "动态检测头", "精度与计算量权衡"] },
        },
      },
    },
    {
      type: "media",
      props: { type: "image", src: chapter, alt: "TDA-YOLO 航拍小目标检测场景", caption: "章节图：密集航拍目标与自适应特征保留" },
    },
    {
      type: "media",
      props: { type: "image", src: diagram, alt: "TDA-YOLO 模型架构示意", caption: "示意图：LAWDS、动态上采样与 TD Detect" },
    },
  ],
} as const satisfies ProjectContent;
