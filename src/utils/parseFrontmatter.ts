type ParsedFrontmatter<T> = {
    metadata: string;
} & {
    [K in keyof T]?: string;
};

export const parseFrontmatter = <T extends Record<string, string>>(
    markdown: string
): ParsedFrontmatter<T> => {
    // Match front matter (captures content between ---)
    const metaRegExp = /^---[\n\r]([\s\S]*?)^[\n\r]?---$/m;
    const match = metaRegExp.exec(markdown);

    if (!match) return { metadata: markdown };

    const [, yamlVariables] = match;

    // Ensure at least one key-value pair exists
    if (!/^[a-zA-Z_-]+:\s?.+/m.test(yamlVariables)) return { metadata: markdown };

    // Parse frontmatter into an object
    const frontmatter = Object.fromEntries(
        yamlVariables
            .trim()
            .split("\n")
            .map((line) => {
                const [key, ...valueParts] = line.split(":");
                return [key.trim(), valueParts.join(":").trim() || ""];
            })
    ) as Partial<T>;

    // Return parsed frontmatter and stripped markdown
    return {
        ...frontmatter,
        metadata: markdown.replace(match[0], "").trim(),
    };
};