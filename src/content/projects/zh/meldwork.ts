import cover from "../../../assets/images/projects/meldwork/meldwork-cover.webp";
import chapter from "../../../assets/images/projects/meldwork/meldwork-chapter.webp";
import diagram from "../../../assets/images/projects/meldwork/meldwork-diagram.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Meldwork",
  theme: "dark",
  tags: ["agent", "product", "javascript", "vue", "node"],
  source: "https://github.com/Ryder-Sun/Meldwork",
  description:
    "Meldwork 是一个本地优先的桌面 Agent 工作台，让任务在切换不同 AI Agent 时仍保持连续。每个会话都保留上下文、附件、权限、兼容的原生 Session 和脱敏执行记录，使单 Agent 工作可以自然进入边界明确的多 Agent 复核，而不是不断复制 Prompt。<br/><br/>GitHub API 于 2026-08-12 核验：54 Stars、JavaScript。项目重点是持久任务上下文、受控协作、可检查执行过程和本地数据所有权。",
  components: [
    {
      type: "text",
      props: {
        title: "产品问题",
        text: "单个 Agent 已经能完成独立步骤，真正脆弱的是跨工具协作：上下文需要手工搬运、文件反复上传、权限边界漂移，最终答案看似完整却很难追溯形成过程。Meldwork 把会话及其证据作为稳定单元，让 Agent 可以替换，任务本身不丢失。",
      },
    },
    {
      type: "list",
      props: {
        title: "核心交付",
        size: "lg",
        items: [
          "识别受支持的本地 Agent CLI，并在不开放任意 Shell 的前提下展示可用状态。",
          "保留直接会话、多模态附件、权限模式和兼容的原生 Session。",
          "通过明确参与者、有限轮次、停止控制和独立回复实现定向多 Agent 复核。",
          "在本地保存脱敏执行证据、检查点、完成状态与恢复动作。",
        ],
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        src: cover,
        alt: "Meldwork 本地优先多 Agent 工作台封面",
        component: {
          type: "list",
          props: {
            title: "系统形态",
            items: ["持久任务工作区", "直接会话与群组会话", "原生 CLI 与 Provider 连接", "按目标隔离的上下文与权限", "可检查的本地执行记录"],
          },
        },
      },
    },
    {
      type: "media",
      props: { type: "image", src: chapter, alt: "Meldwork 多 Agent 任务连续性", caption: "章节图：一个持久工作区承接多条受控 Agent 路径" },
    },
    {
      type: "media",
      props: { type: "image", src: diagram, alt: "Meldwork Harness 架构示意", caption: "示意图：上下文、Agent 运行时、执行证据与人工复核" },
    },
  ],
} as const satisfies ProjectContent;
