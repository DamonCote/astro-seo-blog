import { defineConfig } from "astro/config";
import { fileURLToPath, URL } from "node:url";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import node from "@astrojs/node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
                "~/": `${path.resolve(__dirname, "src")}/`,
            },
        },
    },
    security: {
        checkOrigin: false,
        actionBodySizeLimit: 10 * 1024 * 1024, // 10 MB
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
                "@": fileURLToPath(new URL("./src", import.meta.url)),
                "~/": `${path.resolve(__dirname, "src")}/`,
            },
        },
    },
    security: {
        checkOrigin: false,
        actionBodySizeLimit: 10 * 1024 * 1024, // 10 MB
    },
};
const configOptions = {
    site: baseURL,
    publicDir: "public",
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
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
        inlineStylesheets: "never", // always extract CSS to separate files for better caching and performance
    },
    server: {
        port: parseInt(process.env.PORT || "4321"),
        host: "0.0.0.0",
    },
    image: {
        domains: ["localhost", "en.coffeestyle.info"],
    },
    plugins: [
        nodePolyfills({
            include: ["path"],
        }),
    ],
    markdown: {
        shikiConfig: {
            theme: "github-light",
            wrap: true,
        },
    },
    ...(isProduction ? productionConfig : defaultConfig),
};
// https://astro.build/config
export default defineConfig(configOptions);
