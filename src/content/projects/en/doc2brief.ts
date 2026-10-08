import image0 from "../../../assets/images/projects/doc2brief/doc2brief-0.png";
import image1 from "../../../assets/images/projects/doc2brief/doc2brief-1.png";
import image2 from "../../../assets/images/projects/doc2brief/doc2brief-2.png";
import image3 from "../../../assets/images/projects/doc2brief/doc2brief-3.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Doc2Brief Report Generator",
  theme: "light",
  tags: ["react", "javascript", "node", "agent", "product"],
  videoBorder: false,
  source: "https://github.com/Ryder-Sun/Doc2Brief",
  description:
    "Doc2Brief turns files or raw text into accessible, editable, reusable weekly-report links. Instead of asking an LLM to directly improvise HTML, it separates extraction, structuring, template matching, rendering, publishing, and same-link updates into a stable generation pipeline.<br/><br/>GitHub API check on 2026-05-27: 0 stars, JavaScript. The project focus is React/Vite frontend delivery, Node services, Agent CLI usage, built-in template systems, document parsing, and reusable report publishing workflows.",
  components: [
    {
      type: "text",
      props: {
        title: "Context",
        text: "Many AI report generators depend on one prompt and produce inconsistent layout, quality, and editability. Doc2Brief makes a more productized tradeoff: models or local parsers first turn input into structured data, then a template runtime renders the final report so repeated weekly materials stay visually stable and linkable.",
      },
    },
    {
      type: "list",
      props: {
        title: "Core Capabilities",
        size: "lg",
        items: [
          "Supports PDF, DOCX, DOC, TXT, MD, CSV, and direct pasted text as inputs for extraction and structuring.",
          "Includes 9 built-in weekly-report templates; Agent CLI can auto-match templates and preserve the original template when editing an existing report.",
          "Provides generate and update CLI flows: create a share link for a new report or overwrite the same link during revisions.",
          "Ships with an Agent Skill and JSON output contract so automation agents can generate or update reports reliably.",
          "Adds poster mode with brief extraction and image-model support, with local SVG fallback when generation fails.",
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
            title: "Product Flow",
            items: [
              "File or text input",
              "Content extraction and structuring",
              "Automatic template matching",
              "HTML / poster rendering",
              "Share-link publishing",
              "Same-link updates",
            ],
          },
        },
      },
    },
    {
      type: "list",
      props: {
        title: "Product Decisions",
        size: "lg",
        items: [
          "Uses templates to stabilize output quality instead of leaving the whole page design to the model.",
          "Uses same-link updates so iterative Agent revisions do not scatter into multiple report URLs.",
          "Supports web upload, CLI invocation, and Agent Skill usage so both people and automation systems can use it.",
          "Targets recurring formats such as team weekly reports, department briefs, research updates, and operations reviews.",
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: image1,
        alt: "Doc2Brief console dashboard template",
        caption: "Template example: console-dashboard weekly report for project progress, operations meetings, and launch coordination.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: image2,
        alt: "Doc2Brief academic journal template",
        caption: "Template example: academic-journal weekly report for research, experiments, papers, and archive-ready material.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: image3,
        alt: "Doc2Brief magazine cover template",
        caption: "Template example: magazine-cover weekly report for external sharing, brand-style updates, and thematic reviews.",
      },
    },
  ],
} as const satisfies ProjectContent;
