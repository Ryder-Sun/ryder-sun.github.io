import image0 from "../../../assets/images/projects/scholarsentry/scholarsentry-cover.webp";
import image1 from "../../../assets/images/projects/scholarsentry/scholarsentry-chapter.webp";
import image2 from "../../../assets/images/projects/scholarsentry/scholarsentry-diagram.webp";

import type { ProjectContent } from "../../types";

export default {
  "title": "ScholarSentry Academic Intelligence",
  "theme": "dark",
  "tags": [
    "research",
    "react",
    "typescript",
    "ai"
  ],
  "videoBorder": false,
  "source": "https://github.com/Ryder-Sun/Scholars-System",
  "description": "Scholars System is an academic-intelligence interface for scholar profiles, paper outputs, institution relationships, and research movement. It turns paper repositories and scholar graphs into a searchable, monitorable, alert-oriented product surface.<br/><br/>GitHub API check on 2026-08-12: 9 stars, TypeScript. The case focuses on converting fragmented academic records into a reusable research-monitoring workflow.",
  "components": [
    {
      "type": "text",
      "props": {
        "title": "Context",
        "text": "Academic intelligence is not just a list of papers; it should help users understand who is doing what, how outputs connect, and which signals deserve monitoring. Scholars System organizes scholars, papers, institutions, topics, and alert rules into a continuous research-monitoring experience."
      }
    },
    {
      "type": "list",
      "props": {
        "title": "Product Focus",
        "size": "lg",
        "items": [
          "Presents scholars, papers, institutions, and topics as a research-monitoring interface.",
          "Provides a frontend layer that can pair with paper warehouses and scholar knowledge graphs.",
          "Uses alert-oriented information architecture so new outputs can become timely signals.",
          "Turns one-off academic lookup into a reusable monitoring and comparison workflow."
        ]
      }
    },
    {
      "type": "media",
      "props": { "type": "image", "src": image1, "alt": "Academic intelligence knowledge graph chapter visual", "caption": "Chapter visual: scholars, papers, institutions, and monitoring signals" }
    },
    {
      "type": "media",
      "props": { "type": "image", "src": image2, "alt": "Academic intelligence system architecture diagram", "caption": "System diagram: sources, scholar graph, profiles, and alerts" }
    },
    {
      "type": "imageText",
      "props": {
        "imagePosition": "right",
        "src": image0,
        "alt": "ScholarSentry academic intelligence cover visual",
        "component": {
          "type": "list",
          "props": {
            "title": "Experience Modules",
            "items": [
              "Scholar profile cards",
              "Paper and institution relationships",
              "Topic filters and research signals",
              "Monitoring alerts",
              "Knowledge-graph style navigation"
            ]
          }
        }
      }
    },
    {
      "type": "list",
      "props": {
        "title": "Why It Matters",
        "size": "lg",
        "items": [
          "Turns academic data into a decision surface for talent tracking and research scanning.",
          "Complements Intelligence Engine data services with a user-facing research interface.",
          "Shows how scholarly data can become a repeatable product workflow rather than ad-hoc search."
        ]
      }
    },
  ]
} as const satisfies ProjectContent;
