import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../config/languages';

export interface AIAgentData {
    title: string;
    description: string;
    url: string;
    publishDate: Date;
    updateDate?: Date;
    author: string;
    featured: boolean;
    draft: boolean;
    heroImage?: string;
    heroImageAlt?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    noindex?: boolean;
    nofollow?: boolean;
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
}

export interface AIAgent {
    id: string;
    slug: string;
    body: string;
    collection: string;
    language: string;
    data: AIAgentData;
}

/**
 * Parse frontmatter data into AIAgentData structure
 */
function parseFrontmatter(data: Record<string, unknown>): AIAgentData {
    return {
        title: String(data.title || ''),
        description: String(data.description || ''),
        url: String(data.url || ''),
        publishDate: new Date(data.publishDate as string || Date.now()),
        updateDate: data.updateDate ? new Date(data.updateDate as string) : undefined,
        author: String(data.author || 'default'),
        featured: Boolean(data.featured),
        draft: Boolean(data.draft),
        heroImage: data.heroImage as string | undefined,
        heroImageAlt: data.heroImageAlt as string | undefined,
        seoTitle: data.seoTitle as string | undefined,
        seoDescription: data.seoDescription as string | undefined,
        seoKeywords: data.seoKeywords as string | undefined,
        noindex: data.noindex as boolean | undefined,
        nofollow: data.nofollow as boolean | undefined,
        canonicalUrl: data.canonicalUrl as string | undefined,
        ogTitle: data.ogTitle as string | undefined,
        ogDescription: data.ogDescription as string | undefined,
        ogImage: data.ogImage as string | undefined,
    };
}

/**
 * Create an AIAgent object from parsed content
 */
function createAIAgent(slug: string, body: string, data: Record<string, unknown>, language: string): AIAgent {
    return {
        id: slug,
        slug,
        body,
        collection: 'agents',
        language,
        data: parseFrontmatter(data),
    };
}

/**
 * Gets all AI agents from both the new location (public/data/agents)
 * and the old location (src/content/agents) for backward compatibility
 * Supports multiple languages with structure: agents/[lang]/slug.mdx
 */
export async function getAllAIAgents(language: string = DEFAULT_LANGUAGE): Promise<AIAgent[]> {
    const agents: AIAgent[] = [];

    // 1. Read from new location: public/data/agents/
    const agentsDir = path.join(process.cwd(), 'public', 'data', 'agents');
    try {
        await fs.access(agentsDir);

        // For English (default), read from root agents directory
        if (language === DEFAULT_LANGUAGE) {
            const files = await fs.readdir(agentsDir);
            const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

            for (const file of mdxFiles) {
                const filePath = path.join(agentsDir, file);
                const stats = await fs.stat(filePath);

                // Skip if it's a directory
                if (stats.isDirectory()) continue;

                const content = await fs.readFile(filePath, 'utf-8');
                const { data, content: body } = matter(content);
                const slug = file.replace(/\.(mdx|md)$/, '');

                agents.push(createAIAgent(slug, body, data, DEFAULT_LANGUAGE));
            }
        } else {
            // For other languages, read from language subdirectory
            const langDir = path.join(agentsDir, language);
            try {
                await fs.access(langDir);
                const files = await fs.readdir(langDir);
                const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

                for (const file of mdxFiles) {
                    const filePath = path.join(langDir, file);
                    const content = await fs.readFile(filePath, 'utf-8');
                    const { data, content: body } = matter(content);
                    const slug = file.replace(/\.(mdx|md)$/, '');

                    agents.push(createAIAgent(slug, body, data, language));
                }
            } catch (error) {
                // Language directory doesn't exist, that's ok
            }
        }
    } catch (error) {
        // Directory doesn't exist yet, that's ok
    }

    // 2. Also read from old location for backward compatibility (English only)
    if (language === DEFAULT_LANGUAGE) {
        const oldPostsDir = path.join(process.cwd(), 'src', 'content', 'agents');
        try {
            await fs.access(oldPostsDir);
            const files = await fs.readdir(oldPostsDir);
            const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

            for (const file of mdxFiles) {
                const slug = file.replace(/\.(mdx|md)$/, '');

                // Skip if we already have this agent from the new location
                if (agents.find(a => a.slug === slug)) {
                    continue;
                }

                const filePath = path.join(oldPostsDir, file);
                const content = await fs.readFile(filePath, 'utf-8');
                const { data, content: body } = matter(content);

                agents.push(createAIAgent(slug, body, data, DEFAULT_LANGUAGE));
            }
        } catch (error) {
            // Old directory doesn't exist or has issues, that's ok
        }
    }
    return agents;
}

/**
 * Gets all published (non-draft) AI agents for a specific language
 */
export async function getPublishedAIAgents(language: string = DEFAULT_LANGUAGE): Promise<AIAgent[]> {
    const allAgents = await getAllAIAgents(language);
    return allAgents.filter(agent => !agent.data.draft);
}

/**
 * Gets a single AI agent by slug and language
 */
export async function getAIAgent(slug: string, language: string = DEFAULT_LANGUAGE): Promise<AIAgent | null> {
    const agentsDir = path.join(process.cwd(), 'public', 'data', 'agents');
    // Determine file path based on language
    let filePath: string;
    if (language === DEFAULT_LANGUAGE) {
        // English agents are in root agents directory
        filePath = path.join(agentsDir, `${slug}.mdx`);
    } else {
        // Other languages are in subdirectories
        filePath = path.join(agentsDir, language, `${slug}.mdx`);
    }

    // Try to read the agent
    try {
        await fs.access(filePath);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: body } = matter(content);

        return createAIAgent(slug, body, data, language);
    } catch (error) {
        // File doesn't exist in new location
    }

    // Try the old location for English only (backward compatibility)
    if (language === DEFAULT_LANGUAGE) {
        const oldFilePath = path.join(process.cwd(), 'src', 'content', 'agents', `${slug}.mdx`);
        try {
            await fs.access(oldFilePath);
            const content = await fs.readFile(oldFilePath, 'utf-8');
            const { data, content: body } = matter(content);

            return createAIAgent(slug, body, data, DEFAULT_LANGUAGE);
        } catch (error) {
            // Agent not found
        }
    }

    return null;
}

/**
 * Get all available languages for a specific agent slug
 */
export async function getAvailableLanguagesForAgent(slug: string): Promise<string[]> {
    const availableLanguages: string[] = [];
    const agentsDir = path.join(process.cwd(), 'public', 'data', 'agents');

    // Check each supported language
    for (const lang of SUPPORTED_LANGUAGES) {
        // Check for both .mdx and .md extensions
        for (const ext of ['.mdx', '.md']) {
            let filePath: string;
            if (lang === DEFAULT_LANGUAGE) {
                filePath = path.join(agentsDir, `${slug}${ext}`);
            } else {
                filePath = path.join(agentsDir, lang, `${slug}${ext}`);
            }

            try {
                await fs.access(filePath);
                availableLanguages.push(lang);
                break; // Found the file, no need to check other extensions
            } catch (error) {
                // File doesn't exist with this extension
            }
        }
    }

    return availableLanguages;
}