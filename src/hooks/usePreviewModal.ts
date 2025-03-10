import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { CDN_PREFIX } from "../AppConstants";
import { getAllFileMeta } from "../utils/getAllFiles";

export type PreviewModalProps = {
  content: string,
  type: 'image' | 'markdown' | 'url';
  x: number;
  y: number;
  setIsVisible: (isVisible: boolean) => void;
  hash?: string;
  link?: string;
  onClick?: () => void;
};

export function usePreviewModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [preview, setPreview] = useState<PreviewModalProps>({ setIsVisible, type: 'url', content: '#', x: 0, y: 0 });
  const fileMeta = getAllFileMeta();
  const navigate = useNavigate();
  const [target, setTarget] = useState<HTMLAnchorElement | HTMLButtonElement | null>(null);


  const handleMouseEnter = async (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (isVisible) return;
    const { type, hash, pathslug, label } = event.currentTarget.dataset;
    const { clientX, clientY } = event;

    setTarget(event.currentTarget);

    const link = (event.currentTarget as HTMLAnchorElement).href;

    if (!event.currentTarget.classList.contains('obsidian-link')) setPreview({ type: 'url', content: link, x: clientX, y: clientY, setIsVisible, link });
    else if (type?.match(/(jpg|jpeg|png|gif|webp|svg)$/i)) setPreview({ type: 'image', content: `![[${label}]]`, x: clientX, y: clientY, setIsVisible, hash: hash, link });
    else {
      const file = fileMeta.find((file) => file.pathSlug === pathslug);
      const response = await fetch(CDN_PREFIX + file?.path);
      const text = await response.text();
      setPreview({ type: "markdown", content: text, x: clientX, y: clientY, setIsVisible, hash: hash, link });
    }

    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleMouseClick = () => {
    //@ts-ignore
    const { type, hash, pathslug, } = target?.dataset;
    const hashParam = hash ? '#' + hash : '';
    if (type === 'url') return;
    if (type === 'md') navigate({ to: `/${pathslug}${hashParam}` });
    else if (type === 'image') navigate({ to: `/${pathslug}` });
    navigate({ to: `/${pathslug}${hash ? '#' + hash : ''}` });
  }

  return { preview, isVisible, setIsVisible, handleMouseEnter, handleMouseLeave, handleMouseClick };
}