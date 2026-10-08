import image0 from "../../../assets/images/projects/intelligence-engine-db/intelligence-engine-db-cover.png";
import image1 from "../../../assets/images/projects/intelligence-engine-db/intelligence-engine-db-cover.png";
import image2 from "../../../assets/images/projects/intelligence-engine-db/intelligence-engine-db-nexus.png";
import image3 from "../../../assets/images/projects/intelligence-engine-db/intelligence-engine-db-intro.png";

import type { ProjectContent } from "../../types";

export default {
  "title": "Intelligence Engine Data Base",
  "theme": "dark",
  "tags": [
    "python",
    "fastapi",
    "postgresql",
    "crawler"
  ],
  "videoBorder": false,
  "source": "https://github.com/Ryder-Sun/Intelligence-Engine-Data-Base",
  "description": "Intelligence Engine Data Base is the backend data infrastructure behind multi-dimensional intelligence products. It collects policy pages, paper information, social signals, external data, and scholar knowledge into a shared storage and API layer for DeanAgent, ScholarSentry, and project-library analysis.<br/><br/>GitHub API check on 2026-05-27: 0 stars, Python, updated on 2026-05-26. The project focus is FastAPI, APScheduler, Playwright, PostgreSQL/Supabase, and source governance.",
  "components": [
    {
      "type": "text",
      "props": {
        "title": "Context",
        "text": "Useful intelligence products need a stable data substrate first. This repository turns one-off crawler scripts into maintainable backend infrastructure: sources have status, jobs have schedules, results have storage, failures have retries, and upper-layer products consume data through unified APIs."
      }
    },
    {
      "type": "list",
      "props": {
        "title": "Backend Scope",
        "size": "lg",
        "items": [
          "Covers 9 information dimensions with scheduled crawling, source normalization, and backend APIs.",
          "Uses FastAPI, APScheduler, httpx, BeautifulSoup4, Playwright, feedparser, PostgreSQL/Supabase, and file storage patterns.",
          "Supports a crawler-management mindset: source status, update rhythm, storage path, and downstream consumption all matter.",
          "Acts as the data base for DeanAgent-style intelligence products and academic monitoring layers."
        ]
      }
    },
    {
      "type": "imageText",
      "props": {
        "imagePosition": "right",
        "src": image0,
        "alt": "Intelligence Engine DB cover visual",
        "component": {
          "type": "list",
          "props": {
            "title": "Data Modules",
            "items": [
              "Scheduled crawler jobs",
              "Static, dynamic, RSS, and external-source ingestion",
              "Paper and scholar knowledge storage",
              "PostgreSQL/Supabase persistence",
              "REST endpoints for upper-layer products"
            ]
          }
        }
      }
    },
    {
      "type": "list",
      "props": {
        "title": "Infrastructure Value",
        "size": "lg",
        "items": [
          "Separates intelligence collection from frontend presentation so products can reuse the same data layer.",
          "Makes source expansion and data governance explicit instead of hidden in one-off scripts.",
          "Provides the backend basis for daily briefings, scholar graphs, and project-library analysis."
        ]
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image1,
        "alt": "Intelligence Engine DB cover visual",
        "caption": "Explanation visual: crawler mesh feeding a knowledge vault"
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image2,
        "alt": "Intelligence Engine source pipeline visual",
        "caption": "Explanation visual: multi-source ingestion and normalization pipeline"
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image3,
        "alt": "Intelligence Engine API storage visual",
        "caption": "Explanation visual: database, file storage, and REST API consumption layer"
      }
    }
  ]
} as const satisfies ProjectContent;
