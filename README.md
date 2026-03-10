# CoffeeStyle WebSite

A cleanly structured personal website project with integrated content management. This repository serves as a learning sandbox for validating SEO techniques and experimenting with modern web frameworks. Future iterations will explore AI integrations to enhance content and user experience.

This project is forked from [Apatero's repository: astro-seo-blog-template](https://github.com/Apatero-Org/astro-seo-blog-template).

I would like to express my sincere gratitude to the original authors for sharing their work. Their clean architecture and implementation taught me valuable lessons and gave me a significant head start on development. Building upon their foundation allowed me to reach my project milestones more efficiently.

It has since grown into an **independent project**, rebuilt and customized according to my personal vision: a learning sandbox for SEO experimentation with future AI integration plans.

## Theme

The implementation of the multi-theme feature is somewhat lacking. If you have a better solution, please let me know. 

### Default

```
THEME_NAME=default
```

<img width="1512" height="982" alt="image" src="https://github.com/user-attachments/assets/e494d26e-c915-4c7b-8c25-4ffbc22c2cbd" />

### AI

```
THEME_NAME=ai
```

<img width="1512" height="982" alt="image" src="https://github.com/user-attachments/assets/c84f28fb-0908-4b29-bbc2-8427cf95bf14" />

<img width="1512" height="982" alt="image" src="https://github.com/user-attachments/assets/1f57a997-2c22-44ba-a01d-eca1c1d881d2" />

<img width="2573" height="9711" alt="image" src="https://github.com/user-attachments/assets/38df86b1-1e1a-482d-93b1-62069a8f0f90" />

<img width="3024" height="2540" alt="image" src="https://github.com/user-attachments/assets/0ddc1de9-bde3-4a86-9198-07ddd71fefcc" />


## Built with Astro： SEO Blog Template

A modern, feature-rich, and SEO-optimized blog template built with [Astro](https://astro.build). Perfect for developers, writers, and content creators who want a fast, scalable, and easily customizable blogging platform with a built-in CMS.

### Why Choose This Template?

-   **Zero Configuration** - Works out of the box with sensible defaults
-   **Built-in CMS** - No external CMS needed, manage everything from the dashboard
-   **File-Based** - No database required, all content stored as files
-   **Production Ready** - Secure session management, ENV authentication, and security best practices
-   **100 Lighthouse Score** - Optimized for performance, SEO, accessibility, and best practices
-   **Fully Customizable** - Modern monochromatic design that's easy to brand

### Tech Stack

-   **Framework**: [Astro 5.x](https://astro.build)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com)
-   **Content**: MDX & Markdoc
-   **Deployment**: Node.js standalone server
-   **TypeScript**: Full TypeScript support

## Quick Start

1.  **Clone the repository**

    ```bash
    git clone https://github.com/DamonCote/astro-seo-blog
    cd astro-seo-blog
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up environment variables**

    Create a `.env` file in the root directory:

    ```env
    # Admin Authentication (Required for /admin access)
    ADMIN_EMAIL=damoncote7@gmail.com
    ADMIN_PASS=your-secure-password

    # Analytics (Optional)
    GA_MEASUREMENT_ID=G-XXXXXXXXXX

    # Theme (Optional, default: "default")
    THEME_NAME=default
    ```

4.  **Configure your site**

    Edit `public/data/settings/site-config.json` to customize your blog:

    ```json
    {
        "title": "Your Blog Title",
        "description": "Your blog description",
        "url": "https://yourdomain.com"
    }
    ```

5.  **Start development server**

    ```bash
    npm run dev
    ```

6.  **Access your blog**
    -   **Frontend**: `http://localhost:4321`
    -   **Admin Dashboard**: `http://localhost:4321/admin` (use credentials from `.env`)

## Admin Dashboard Access

The admin CMS is protected by secure session-based authentication:

1. Set `ADMIN_EMAIL` and `ADMIN_PASS` in your `.env` file
2. Navigate to `/admin` or `/admin/login`
3. Enter your email and password
4. Manage posts, media, authors, categories, tags, and settings

**Security Features:**

-   Cryptographically secure session tokens (32 bytes of randomness)
-   Session-based authentication with HTTP-only cookies
-   All admin routes protected with middleware
-   Automatic redirect to login for unauthenticated requests
-   File upload validation with size limits (10MB) and type restrictions

## Project Structure

```
/
├── public/
│   ├── data/
│   │   ├── posts/              # Blog posts in MDX format
│   │   │   ├── *.mdx          # English posts (default)
│   │   │   ├── de/            # German translations
│   │   │   ├── es/            # Spanish translations
│   │   │   ├── fr/            # French translations
│   │   │   ├── ja/            # Japanese translations
│   │   │   ├── ko/            # Korean translations
│   │   │   └── ...            # Other languages
│   │   ├── settings/           # Site configuration JSON
│   │   ├── authors/            # Author profiles
│   │   ├── categories/         # Category definitions
│   │   ├── tags/              # Tag definitions
│   │   └── i18n/              # UI translations (translations.json)
│   ├── blog-images/            # Blog post images
│   │   └── metadata/          # Image metadata (alt text, captions)
│   └── Favicon.png            # Site favicon
├── src/
│   ├── components/
│   │   ├── blog/              # Blog-specific components
│   │   ├── common/            # Shared components (Header, Footer)
│   │   ├── landing/           # Landing page sections
│   │   ├── search/            # Search functionality
│   │   └── seo/               # SEO components
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Main site layout
│   │   └── AdminLayout.astro  # Admin dashboard layout
│   ├── pages/
│   │   ├── admin/             # Admin CMS pages
│   │   ├── api/               # API endpoints
│   │   ├── blog/              # Blog pages (English)
│   │   ├── [lang]/            # Language-specific routes
│   │   ├── author/            # Author archive pages
│   │   ├── about.astro        # About page
│   │   └── index.astro        # Landing page
│   ├── lib/                   # Utility functions
│   │   ├── session.ts         # Session management
│   │   ├── posts.ts           # Post utilities
│   │   ├── utils.ts           # Common utilities
│   │   └── data.ts            # Data loading functions
│   ├── config/                # Configuration files
│   │   ├── languages.ts       # Language definitions
│   │   └── i18n.ts           # Internationalization
│   └── data/
│       └── site-config.ts     # Site configuration
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind CSS configuration
└── package.json
```

## Creating Blog Posts

### Option 1: Using the Admin Dashboard (Recommended)

1. Go to `/admin/posts`
2. Click "NEW POST"
3. Fill in post details (title, description, category, tags)
4. Write content using the markdown editor
5. Upload featured image
6. Save as draft or publish immediately

### Option 2: Manual File Creation

Create a new MDX file in `public/data/posts/`:

````mdx
---
title: "Your Post Title"
description: "A brief description of your post"
publishDate: 2025-01-15T10:00:00.000Z
updateDate: 2025-01-15T10:00:00.000Z
author: "your-author-id"
category: "technology"
tags: ["astro", "web-development"]
featured: false
draft: false
heroImage: "/blog-images/your-image.jpg"
heroImageAlt: "Description of your image"
seoTitle: "SEO-optimized title"
seoDescription: "SEO-optimized description"
ogImage: "/blog-images/your-image.jpg"
---

# Your Post Title

Your post content goes here using MDX/Markdown...

## Headings

### Subheadings

**Bold text** and _italic text_

-   Bullet points
-   More items

```javascript
// Code blocks with syntax highlighting
console.log("Hello World!");
```
````

### For Multilingual Posts

Create the same file structure in language subdirectories:

-   English: `public/data/posts/your-post.mdx`
-   German: `public/data/posts/de/your-post.mdx`
-   Spanish: `public/data/posts/es/your-post.mdx`

## Configuration

### Site Settings

Edit `public/data/settings/site-config.json`:

-   **Site Information**: Title, description, URL
-   **Social Links**: Twitter, GitHub, LinkedIn, Instagram, YouTube, Discord
-   **Blog CTA**: Configure call-to-action sections with stats
-   **Analytics**: Google Analytics ID

### UI Translations

Edit `public/data/i18n/translations.json` to customize UI text in all 12 supported languages. The file contains translations for:

-   Navigation elements
-   Blog page labels
-   CTA sections
-   Common UI text

### Astro Config

Edit `astro.config.mjs` for build and deployment settings:

-   Site URL
-   Trailing slash behavior
-   Server configuration
-   Image optimization

## Commands

| Command             | Action                               |
| :------------------ | :----------------------------------- |
| `npm install`       | Install dependencies                 |
| `npm run dev`       | Start dev server at `localhost:4321` |
| `npm run build`     | Build production site to `./dist/`   |
| `npm run preview`   | Preview production build locally     |
| `npm run start`     | Start production server              |
| `npm run astro ...` | Run Astro CLI commands               |

## Deployment

The production environment runs on Node.js with PM2. The journey from development to deployment was filled with challenges, including unsuccessful attempts to containerize with Docker. While the site is now live at [CoffeeStyle](https://en.coffeestyle.info), there are still areas needing refinement—deployment is not yet flexible enough, and content updates still require manual scripts.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

## Acknowledgments

A personal website project exploring SEO and future AI integration.

Originally forked from Apatero's repository, now independently developed according to personal vision. Production environment: Node.js + PM2. Live at en.coffeestyle.info.

**Special thanks to the original project authors. I'm still learning from their work, and that ongoing journey is what makes this project better every day.**
