import { useCallback, useEffect, useState } from "react";

export const useCopyToClipboard = (text: string) => {
    const [hasCopied, setHasCopied] = useState(false);
    const copy = useCallback(() => {
        navigator.clipboard.writeText(text);
        setHasCopied(true);
    }, [text]);
    useEffect(() => {
        if (hasCopied) {
            const id = setTimeout(() => {
                setHasCopied(false);
            }, 2000);
            return () => clearTimeout(id);
        }
    }, [hasCopied]);
    return {
        hasCopied,
        copy
    };
}