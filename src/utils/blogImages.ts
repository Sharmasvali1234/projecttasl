// Image imports for blog posts
import reactServerComponents from "@/assets/react-server-components.jpg";
import typescriptPatterns from "@/assets/typescript-patterns.jpg";
import webAccessibility from "@/assets/web-accessibility.jpg";
import cssGridFlexbox from "@/assets/css-grid-flexbox.jpg";
import psychologyUiDesign from "@/assets/psychology-ui-design.jpg";
import reactPerformance from "@/assets/react-performance.jpg";
import blogHero from "@/assets/blog-hero.jpg";

const blogImages: Record<string, string> = {
  "react-server-components": reactServerComponents,
  "typescript-patterns": typescriptPatterns,
  "web-accessibility": webAccessibility,
  "css-grid-flexbox": cssGridFlexbox,
  "psychology-ui-design": psychologyUiDesign,
  "react-performance": reactPerformance,
  "blog-hero": blogHero,
};

export const getBlogImage = (imageName: string): string => {
  return blogImages[imageName] || blogImages["blog-hero"];
};