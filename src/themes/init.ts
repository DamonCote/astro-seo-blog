
async function loadThemeLayout(themeName: string) {
    try {
        const layoutModule = await import(`../themes/${themeName}/layouts/Main.astro`);
        return layoutModule.default;
    } catch (error) {
        console.error(`Error loading theme layout for theme "${themeName}":`, error);
        throw new Error(`Failed to load theme layout for theme "${themeName}".`);
    }
}

async function loadThemeHome(themeName: string, channel: string = "Index") {
    try {
        const homeModule = await import(`../themes/${themeName}/${channel}/Index.astro`);
        return homeModule.default;
    } catch (error) {
        console.error(`Error loading theme layout for theme "${themeName}":`, error);
        throw new Error(`Failed to load theme layout for theme "${themeName}".`);
    }
}

const env = import.meta.env;

const THEME_NAME = env.THEME_NAME || "default";

const MainLayout = await loadThemeLayout(THEME_NAME);
const ThemeHome = await loadThemeHome(THEME_NAME);
const ThemeAbout = await loadThemeHome(THEME_NAME, "About");





export { MainLayout, ThemeHome, ThemeAbout };