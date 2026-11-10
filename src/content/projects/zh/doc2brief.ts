import image0 from "../../../assets/images/projects/doc2brief/doc2brief-0.png";
import image1 from "../../../assets/images/projects/doc2brief/doc2brief-1.png";
import image2 from "../../../assets/images/projects/doc2brief/doc2brief-2.png";
import image3 from "../../../assets/images/projects/doc2brief/doc2brief-3.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Doc2Brief 周报生成平台",
  theme: "light",
  tags: ["react", "javascript", "node", "agent", "product"],
  videoBorder: false,
  source: "https://github.com/Ryder-Sun/Doc2Brief",
  description:
    "Doc2Brief 是一个把文件或文本转换成可访问、可编辑、可复用周报链接的生成平台。它不是简单让模型直接吐 HTML，而是把抽取、结构化、模板匹配、模板渲染、发布链接和同链接更新拆成稳定链路。<br/><br/>GitHub API 于 2026-05-27 核验：0 Stars、JavaScript。项目重点在 React/Vite 前端、Node 服务、Agent CLI、内置模板库、文件解析与可复用报告发布工作流。",
  components: [
    {
      type: "text",
      props: {
        title: "项目背景",
        text: "很多 AI 周报生成只依赖一次 Prompt，生成质量、版式稳定性和后续修改都难控制。Doc2Brief 的产品判断是让模型或本地解析先把输入整理成结构化数据，再交给内置模板运行时渲染，这样同一类汇报可以保持稳定视觉和可复用链接。",
      },
    },
    {
      type: "list",
      props: {
        title: "核心能力",
        size: "lg",
        items: [
          "支持 PDF、DOCX、DOC、TXT、MD、CSV 与直接粘贴文本输入，统一进入抽取和结构化流程。",
          "内置 9 套周报模板，Agent CLI 默认可自动匹配模板，编辑已有报告时可沿用原模板。",
          "提供 generate / update 两条 CLI 链路：新建报告返回分享链接，修改报告覆盖同一链接。",
          "包含 Agent Skill 与 JSON 输出约定，让自动化代理能够稳定生成或更新周报。",
          "海报模式支持 brief 提炼与图片模型调用，失败时回退本地 SVG 草图。",
        ],
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        src: image0,
        alt: "Doc2Brief Banner cover",
        component: {
          type: "list",
          props: {
            title: "产品链路",
            items: [
              "文件/文本输入",
              "内容抽取与结构化",
              "自动模板匹配",
              "HTML / poster 渲染",
              "分享链接发布",
              "同链接持续更新",
            ],
          },
        },
      },
    },
    {
      type: "list",
      props: {
        title: "产品取舍",
        size: "lg",
        items: [
          "用模板系统保证交付质量，而不是把版式完全交给模型随机生成。",
          "用同链接更新解决 Agent 反复修改时链接失效、版本分散的问题。",
          "兼顾网页上传、CLI 调用和 Agent Skill 三种入口，适合人和自动化系统共同使用。",
          "面向团队周报、部门简报、科研汇报、运营复盘等固定格式高频材料。",
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: image1,
        alt: "Doc2Brief 控制台仪表盘模板",
        caption: "模板示例：控制台仪表盘周报，适合项目推进、运营周会和上线联调。",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: image2,
        alt: "Doc2Brief 学术期刊模板",
        caption: "模板示例：学术期刊周报，适合科研、课题、论文、实验和归档材料。",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: image3,
        alt: "Doc2Brief 杂志封面模板",
        caption: "模板示例：杂志封面周报，适合对外展示、品牌汇报和专题复盘。",
      },
    },
  ],
} as const satisfies ProjectContent;
