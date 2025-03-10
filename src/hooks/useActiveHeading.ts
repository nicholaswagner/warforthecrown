import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

/**
 * Gets the visible bounding rectangle of an element.
 * If the element has no height, it finds the parent's bounding rect.
 */
function getVisibleBoundingClientRect(element: HTMLElement | null): DOMRect {
    if (!element) return new DOMRect(); // Avoid null references
    const rect = element.getBoundingClientRect();
    if (rect.top === rect.bottom) {
        return getVisibleBoundingClientRect(element.parentNode as HTMLElement);
    }
    return rect;
}

/**
 * Determines if an element is in the top half of the viewport.
 */
function isInViewportTopHalf(boundingRect: DOMRect) {
    return boundingRect.top > 0 && boundingRect.bottom < window.innerHeight / 2;
}

/**
 * Determines the currently active heading based on scroll position.
 */
function getActiveAnchor(anchors: HTMLElement[]): Element | null {
    if (!anchors.length) return null;

    const nextVisibleAnchor = anchors.find((anchor) => {
        const boundingRect = getVisibleBoundingClientRect(anchor);
        return boundingRect.top >= 0;
    });

    if (nextVisibleAnchor) {
        const boundingRect = getVisibleBoundingClientRect(nextVisibleAnchor);
        if (isInViewportTopHalf(boundingRect)) {
            return nextVisibleAnchor;
        }
        return anchors[anchors.indexOf(nextVisibleAnchor) - 1] ?? null;
    }

    return anchors[anchors.length - 1] ?? null;
}

/**
 * Finds all headings (h1-h6) inside the document.
 */
function getAnchors(): HTMLElement[] {
    return Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).filter((node): node is HTMLElement => node.closest(".toc_exclude") === null);
}

/**
 * Hook that dynamically tracks the currently active heading and updates the TOC.
 */
export default function useActiveHeading() {
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
            const anchors = getAnchors();
            const activeAnchor = getActiveAnchor(anchors);
            setActiveId(activeAnchor?.id ?? null);
        };

        // Delay execution to ensure elements exist
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

            const anchors = getAnchors();
            anchors.forEach((anchor) => observer.observe(anchor));
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
        }, 100); // Small delay to ensure elements are rendered

        return () => clearTimeout(timeout);
    }, [prevPath, routerState.location.pathname]);

    return activeId ?? null;
}