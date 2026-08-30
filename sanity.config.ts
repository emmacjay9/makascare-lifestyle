"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "default",
  title: "Makascare Lifestyle",

  projectId: "kmh1m4dn",
  dataset: "production",

  basePath: "/studio",

  plugins: [structureTool()],

  import { productType } from "./product";
  },
});
