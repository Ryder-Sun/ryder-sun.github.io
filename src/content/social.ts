export const social = [
  { url: "mailto:mhumble010221@gmail.com", name: "mail" },
  { url: "https://github.com/Ryder-Sun", name: "github" },
  { url: "https://www.linkedin.com/in/ryder-sun/?locale=en", name: "linkedin" },
  { url: "https://x.com/RyderSun0221", name: "x" },
  { url: "https://www.youtube.com/@RyderSunhaha", name: "youtube" },
  { url: "https://space.bilibili.com/296920670", name: "bilibili" },
] as const satisfies {
  url: string;
  name: "mail" | "github" | "instagram" | "linkedin" | "x" | "youtube" | "bilibili";
}[];
