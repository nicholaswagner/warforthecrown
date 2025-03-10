export function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
): { debounced: (...args: Parameters<T>) => void; cancel: () => void } {
    let timeoutId: ReturnType<typeof setTimeout>;

    const debounced = (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };

    const cancel = () => clearTimeout(timeoutId);

    return { debounced, cancel };
}