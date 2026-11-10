import image0 from "../../../assets/images/projects/realm/realm-cover.webp";
import image1 from "../../../assets/images/projects/realm/realm-chapter.webp";
import image2 from "../../../assets/images/projects/realm/realm-diagram.webp";

import type { ProjectContent } from "../../types";

export default {
  "title": "Realm 3D Agent 实时工作台",
  "theme": "dark",
  "tags": [
    "agent",
    "three",
    "typescript",
    "websockets"
  ],
  "videoBorder": false,
  "source": "https://github.com/Ryder-Sun/Realm",
  "description": "Realm 是我把 Coding Agent 从“终端日志”转化为“实时可观察产品界面”的开源实验。它把 Claude Code 与多 Agent 协作中的读文件、写代码、运行命令、搜索、报错和提交映射为 3D 角色动作，并用 Hex Zone 区分不同任务会话。<br/><br/>GitHub API 于 2026-08-12 核验：26 Stars、TypeScript。这个项目的重点是 Agent 可观测性、外部 REST API 派发、Webhook 回传与空间化产品叙事。",
  "components": [
    {
      "type": "text",
      "props": {
        "title": "项目背景",
        "text": "大多数 Agent 工具只能让用户看到结果或滚动日志，但多 Agent 协作真正需要的是“过程可解释”。Realm 的产品假设是：如果工具调用、任务状态、错误和交接能被空间化展示，Agent 系统就更适合演示、监控、协作和对外集成。"
      }
    },
    {
      "type": "list",
      "props": {
        "title": "项目证明了什么",
        "size": "lg",
        "items": [
          "把常见 Coding Agent 工具调用映射为不同的 3D 角色动作与工作站反馈。",
          "通过多会话 Hex Zone 让不同 Agent 拥有独立工作区域，避免并行任务混在一条日志里。",
          "提供 REST API 与 Webhook，让外部产品可以派发任务、接收状态与完成回调。",
          "把 Agent 可观测性做成有记忆点的界面层，而不是又一个普通监控面板。"
        ]
      }
    },
    {
      "type": "imageText",
      "props": {
        "imagePosition": "right",
        "src": image0,
        "alt": "Realm 3D Agent 工作台封面图",
        "component": {
          "type": "list",
          "props": {
            "title": "产品形态",
            "items": [
              "3D Agent 房间与工具工作站",
              "并行会话 Hex Zone",
              "工具调用事件流",
              "REST 任务入口与 Webhook 回调",
              "Agent 状态、错误与完成反馈"
            ]
          }
        }
      }
    },
    {
      "type": "list",
      "props": {
        "title": "项目价值",
        "size": "lg",
        "items": [
          "让 Agent 执行过程更适合演示、监控与多 Agent 编排。",
          "把开发者工具能力转化为更容易被理解的产品叙事。",
          "展示命令行工作流如何延展成空间化、用户可感知的产品体验。"
        ]
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image1,
        "alt": "Realm 3D Agent 工作台封面图",
        "caption": "章节图：工具调用事件转化为空间化 Agent 动作"
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image2,
        "alt": "Realm Hex Zone 会话结构图",
        "caption": "示意图：Hex Zone、事件流与回调链路"
      }
    }
  ]
} as const satisfies ProjectContent;
