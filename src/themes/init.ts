
async function loadThemeLayout(themeName: string) {
    try {
        const layoutModule = await import(`../themes/${themeName}/layouts/Main.astro`);
        await import(`../themes/${themeName}/styles/master.scss`);
        return layoutModule.default;
    } catch (error) {
        console.error(`Error loading theme layout for theme "${themeName}":`, error);
        throw new Error(`Failed to load theme layout for theme "${themeName}".`);
    }
}
const env = import.meta.env;
const THEME_NAME = import.meta.env.THEME_NAME || "default";
const MainLayout = await loadThemeLayout(THEME_NAME);

export { MainLayout };