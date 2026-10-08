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
    "Meldwork is a local-first desktop workspace that keeps a task continuous while AI agents change. Each conversation retains its context, attachments, permissions, compatible native session, and sanitized execution history, so direct work can move into bounded multi-Agent review without becoming a chain of copied prompts.<br/><br/>GitHub API check on 2026-08-12: 54 stars, JavaScript. The product focus is durable task context, controlled collaboration, inspectable execution, and local ownership of workspace state.",
  components: [
    {
      type: "text",
      props: {
        title: "Product problem",
        text: "Individual agents can finish isolated steps, but work becomes fragile when it crosses tools. Context is copied manually, files are attached again, permissions drift, and a polished final answer can hide how it was produced. Meldwork treats the conversation and its evidence as the stable unit while agents remain replaceable.",
      },
    },
    {
      type: "list",
      props: {
        title: "What ships",
        size: "lg",
        items: [
          "Discovers supported local Agent CLIs and keeps readiness visible without exposing unrestricted shell access.",
          "Preserves direct conversations, multimodal attachments, permission modes, and compatible native sessions.",
          "Runs targeted multi-Agent review with explicit participants, bounded rounds, stop controls, and independent replies.",
          "Stores sanitized run evidence, checkpoints, completion states, and recovery actions locally.",
        ],
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        src: cover,
        alt: "Meldwork local-first multi-Agent workspace cover",
        component: {
          type: "list",
          props: {
            title: "System shape",
            items: [
              "Persistent task workspace",
              "Direct and group conversations",
              "Native CLI and Provider connectors",
              "Target-scoped context and permissions",
              "Inspectable local execution records",
            ],
          },
        },
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: chapter,
        alt: "Meldwork task continuity across multiple agents",
        caption: "Task continuity: one durable workspace, several controlled Agent paths",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: diagram,
        alt: "Meldwork harness architecture diagram",
        caption: "System diagram: scoped context, Agent runtimes, evidence, and user review",
      },
    },
  ],
} as const satisfies ProjectContent;
