import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Product Image Studio",
    short_name: "Image Studio",
    description: "Generate boutique product images and captions.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4ee",
    theme_color: "#566b4c",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
