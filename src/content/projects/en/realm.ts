import image0 from "../../../assets/images/projects/realm/realm-cover.webp";
import image1 from "../../../assets/images/projects/realm/realm-chapter.webp";
import image2 from "../../../assets/images/projects/realm/realm-diagram.webp";

import type { ProjectContent } from "../../types";

export default {
  "title": "Realm 3D Agent Workspace",
  "theme": "dark",
  "tags": [
    "agent",
    "three",
    "typescript",
    "websockets"
  ],
  "videoBorder": false,
  "source": "https://github.com/Ryder-Sun/Realm",
  "description": "Realm turns Coding Agent activity from terminal logs into a real-time observable product interface. Claude Code and multi-agent actions such as file reads, code edits, shell commands, search, errors, and commits become 3D character behaviors, while Hex Zones separate concurrent sessions.<br/><br/>GitHub API check on 2026-08-12: 26 stars, TypeScript. The product focus is agent observability, REST task dispatch, webhook callbacks, and spatial product storytelling.",
  "components": [
    {
      "type": "text",
      "props": {
        "title": "Context",
        "text": "Most agent tools only expose final answers or scrolling logs, but multi-agent collaboration needs an explainable process. Realm is built on the assumption that when tool calls, task state, errors, and handoffs become spatial events, agent systems become easier to demo, monitor, coordinate, and integrate with external products."
      }
    },
    {
      "type": "list",
      "props": {
        "title": "What the Project Proves",
        "size": "lg",
        "items": [
          "Maps common coding-agent tool calls to distinct 3D avatar behaviors and workstation feedback.",
          "Uses multi-session Hex Zones so different agents can work in separate visible areas without losing context.",
          "Adds REST API and webhook paths for external products to dispatch tasks and receive status callbacks.",
          "Turns agent observability into a memorable interface layer rather than another analytics dashboard."
        ]
      }
    },
    {
      "type": "imageText",
      "props": {
        "imagePosition": "right",
        "src": image0,
        "alt": "Realm 3D agent workspace cover visual",
        "component": {
          "type": "list",
          "props": {
            "title": "Product Shape",
            "items": [
              "3D agent room and tool stations",
              "Session zones for parallel work",
              "Tool-call event stream",
              "REST task intake and webhook callbacks",
              "Agent status, error, and completion feedback"
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
          "Makes agent execution explainable for demos, monitoring, and multi-agent orchestration.",
          "Creates a bridge between developer tooling and product storytelling.",
          "Shows how a command-line workflow can become a spatial, user-facing product experience."
        ]
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image1,
        "alt": "Realm 3D agent workspace cover visual",
        "caption": "Chapter visual: tool-call events becoming spatial agent actions"
      }
    },
    {
      "type": "media",
      "props": {
        "type": "image",
        "src": image2,
        "alt": "Realm Hex Zone session diagram visual",
        "caption": "System diagram: Hex Zones, event flow, and callback path"
      }
    }
  ]
} as const satisfies ProjectContent;
