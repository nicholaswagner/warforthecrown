import { useCallback, useEffect } from "react";

export const useKeyPress = (keys: string[], callback: () => void) => {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const keyCombination = [
                event.ctrlKey ? 'Control' : null,
                event.metaKey ? 'Meta' : null,
                event.shiftKey ? 'Shift' : null,
                event.altKey ? 'Alt' : null,
                event.key,
            ]
                .filter(Boolean)
                .join('+');

            if (keys.join('+') === keyCombination) {
                event.preventDefault();
                callback();
            }
        },
        [keys, callback],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
};

