import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const getVisibleBoundingClientRect = (element: HTMLElement | null): DOMRect => {
    if (!element) return new DOMRect(); // Avoid null references
    const rect = element.getBoundingClientRect();
    if (rect.top === rect.bottom) {
        return getVisibleBoundingClientRect(element.parentNode as HTMLElement);
    }
    return rect;
}

const isInTopHalf = (boundingRect: DOMRect) => boundingRect.top > 0 && boundingRect.bottom < window.innerHeight / 2;

const getActiveHeader = (headers: HTMLElement[]): Element | null => {
    if (!headers.length) return null;

    const nextVisibleHeader = headers.find((anchor) => {
        const boundingRect = getVisibleBoundingClientRect(anchor);
        return boundingRect.top >= 0;
    });

    if (nextVisibleHeader) {
        const boundingRect = getVisibleBoundingClientRect(nextVisibleHeader);

        if (isInTopHalf(boundingRect))
            return nextVisibleHeader;

        return headers[headers.indexOf(nextVisibleHeader) - 1] ?? null;
    }

    return headers[headers.length - 1] ?? null;
}


const getHeaders = (): HTMLElement[] =>
    Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
        .filter((node): node is HTMLElement => node.closest(".toc_exclude") === null);


const useActiveHeading = () => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const lastActiveLinkRef = useRef<HTMLAnchorElement | null>(null);
    const [prevPath, setPrevPath] = useState<string | null>(null);
    const routerState = useRouterState();

    useEffect(() => {
        if (prevPath !== routerState.location.pathname) {
            lastActiveLinkRef.current = null;
            setActiveId(null);
            setPrevPath(routerState.location.pathname);
        }

        const updateActiveTOC = () => {
            const headers = getHeaders();
            const activeAnchor = getActiveHeader(headers);
            setActiveId(activeAnchor?.id ?? null);
        };

        const timeout = setTimeout(() => {
            updateActiveTOC();

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            updateActiveTOC();
                        }
                    });
                },
                { rootMargin: "0px 0px -50% 0px", threshold: [0.1, 0.5, 1] }
            );

            const headers = getHeaders();
            headers.forEach((header) => observer.observe(header));
            document.addEventListener("scroll", () => {
                // Use requestAnimationFrame for better performance
                requestAnimationFrame(updateActiveTOC);
            });
            document.addEventListener("resize", updateActiveTOC);

            return () => {
                setActiveId(null);
                lastActiveLinkRef.current = null;
                observer.disconnect();
                document.removeEventListener("scroll", updateActiveTOC);
                document.removeEventListener("resize", updateActiveTOC);
            };
        }, 550); // Small delay to ensure elements are rendered

        return () => clearTimeout(timeout);
    }, [prevPath, routerState.location.pathname]);

    return { activeId: activeId ?? null, setActiveId };
}

export default useActiveHeading;