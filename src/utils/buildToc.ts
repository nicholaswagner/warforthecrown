export type TocData = { level: number; text: string; id: string; children: TocData[] };

export const buildToc = (elements: TocData[]): TocData[] => {
    const root: TocData[] = [];
    const stack: TocData[] = [];

    return elements.reduce((acc, { level, ...rest }) => {
        const item: TocData = { ...rest, level, children: [] };
        while (stack.length && stack.at(-1)!.level >= level) {
            stack.pop();
        }
        (stack.length ? stack.at(-1)!.children : acc).push(item);
        stack.push(item);

        return acc;
    }, root);
};