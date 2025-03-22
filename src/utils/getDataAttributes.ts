export type DataAttribute = {
    key: string;
    value: string;
}
export type DataAttributes = DataAttribute[];

export const getDataAttributes = (props?: object) => {
    if (!props) return {};
    return Object.entries(props).reduce((acc, [key, value]) => {
        if (key.startsWith('data-'))
            acc[`${key}`] = value;
        return acc;
    }, {} as Record<string, string>);
};