import { parseFrontmatter } from "./parseFrontmatter";

export type Frontmatter = Record<string, string>;
export type MarkdownResponse = { frontmatter: Frontmatter, data: string };

export const fetchPostById = async (postId: string) => (
    await fetch(`/posts/${postId}.md`)
        .then((res) => res.text())
        .then((result) => {
            const { date, title } = parseFrontmatter<Frontmatter>(result);
            return { frontmatter: { date, title }, data: result };
        })
        .catch((error) => {
            console.error('Error:', error);
        })
);