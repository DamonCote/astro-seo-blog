import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import node from "@astrojs/node";

const isProduction = process.env.NODE_ENV !== "development";

console.info(
    `===> Running in ${isProduction ? "production" : "development"} mode...`,
);

const baseURL = isProduction
    ? "https://en.coffeestyle.info/"
    : "http://localhost:4321/";

const defaultConfig = {
    vite: {
        optimizeDeps: {
            include: ["lodash.debounce", "direction"],
        },
        ssr: {
            noExternal: ["direction", "lodash"],
        },
    },
};
const productionConfig = {
    vite: {
        optimizeDeps: {
            include: ["lodash.debounce", "direction"],
        },
        ssr: {
            noExternal: ["direction", "lodash"],
        },
        resolve: {
            alias: {
                fs: "node:fs",
            },
        },
    },
};
// https://astro.build/config
export default defineConfig({
    site: baseURL,
    trailingSlash: "never", // Enforce consistent URLs without trailing slashes
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        mdx(),
        react(),
        markdoc(),
    ],
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    compressHTML: true,
    build: {
        inlineStylesheets: "always", // Inline all stylesheets to prevent render blocking
    },
    server: {
        port: parseInt(process.env.PORT || "4321"),
        host: "0.0.0.0",
    },
    image: {
        domains: ["localhost", "en.coffeestyle.info", "127.0.0.1", "10.4.4.13"],
    },

    markdown: {
        shikiConfig: {
            theme: "github-light",
            wrap: true,
        },
    },
    ...(isProduction ? productionConfig : defaultConfig),
});
