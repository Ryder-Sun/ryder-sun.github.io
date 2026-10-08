import image0 from "../../../assets/images/projects/intelligence-engine-db/intelligence-engine-db-cover.png";
import image1 from "../../../assets/images/projects/intelligence-engine-db/intelligence-engine-db-cover.png";
import image2 from "../../../assets/images/projects/intelligence-engine-db/intelligence-engine-db-nexus.png";
import image3 from "../../../assets/images/projects/intelligence-engine-db/intelligence-engine-db-intro.png";

import type { ProjectContent } from "../../types";

export default {
  "title": "Intelligence Engine Data Base 多维信源后台",
  "theme": "dark",
  "tags": [
    "python",
    "fastapi",
    "postgresql",
    "crawler"
  ],
  "videoBorder": false,
  "source": "https://github.com/Ryder-Sun/Intelligence-Engine-Data-Base",
  "description": "Intelligence Engine Data Base 是多维情报系统背后的后端数据基础设施，负责把政策页面、论文信息、社媒信号、外部数据和学者知识采集到统一存储与 API 层。它支撑 DeanAgent、ScholarSentry 和项目资料库这类上层产品。<br/><br/>GitHub API 于 2026-05-27 核验：0 Stars、Python，仓库于 2026-05-26 更新。项目重点在 FastAPI、APScheduler、Playwright、PostgreSQL/Supabase 与信源治理。",
  "components": [
    {
      "type": "text",
      "props": {
        "title": "项目背景",
        "text": "真正可用的信息产品必须先有稳定的数据底座。这个仓库的价值在于把一次性爬虫脚本升级为可维护后端：信源有状态、任务有调度、结果有存储、失败有重试、上层产品通过统一 API 消费数据。"
      }
    },
    {
      "type": "list",
      "props": {
        "title": "后端范围",
        "size": "lg",
        "items": [
          "覆盖 9 个信息维度，支持定时采集、信源归一化与后端 API。",
          "技术栈包含 FastAPI、APScheduler、httpx、BeautifulSoup4、Playwright、feedparser、PostgreSQL/Supabase 与文件存储。",
          "以爬虫管理思路组织信源状态、更新节奏、存储路径与下游消费。",
          "作为 DeanAgent 式情报产品和学术监测层的数据底座。"
        ]
      }
    },
    {
      "type": "imageText",
      "props": {
        "imagePosition": "right",
        "src": image0,
        "alt": "Intelligence Engine DB 封面图",
        "component": {
          "type": "list",
          "props": {
            "title": "数据模块",
            "items": [
              "定时爬虫任务",
              "静态、动态、RSS 与外部信源采集",
              "论文与学者知识存储",
              "PostgreSQL/Supabase 持久化",
              "面向上层产品的 REST API"
            ]
          }
        }
      }
    },
    {
      "type": "list",
      "props": {
        "title": "基础设施价值",
        "size": "lg",
        "items": [
          "把情报采集与前端展示解耦，让多个产品复用同一数据层。",
          "让信源扩展和数据治理显性化，而不是散落在一次性脚本中。",
          "为日报、学者图谱与项目资料库分析提供后端基础。"
        ]
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image1,
        "alt": "Intelligence Engine DB 封面图",
        "caption": "解释图：爬虫网络汇入知识仓库"
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image2,
        "alt": "Intelligence Engine 信源管线图",
        "caption": "解释图：多信源采集与归一化管线"
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image3,
        "alt": "Intelligence Engine API 存储图",
        "caption": "解释图：数据库、文件存储与 REST API 消费层"
      }
    }
  ]
} as const satisfies ProjectContent;
