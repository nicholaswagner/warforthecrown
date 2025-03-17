import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { getFileByWebPath } from "../utils/getFileByLabelSlug";

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
  const navigate = useNavigate();
  const [target, setTarget] = useState<HTMLAnchorElement | HTMLButtonElement | null>(null);


  const handleMouseEnter = async (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (isVisible) return;
    const { ext, hashParams: hash, weburl, label } = event.currentTarget.dataset;

    const { clientX, clientY } = event;

    if (!weburl) return;
    setTarget(event.currentTarget);

    const link = (event.currentTarget as HTMLAnchorElement).href;

    if (!event.currentTarget.classList.contains('obsidian-link')) setPreview({ type: 'url', content: link, x: clientX, y: clientY, setIsVisible, link });
    else if (ext?.match(/(jpg|jpeg|png|gif|webp|svg)$/i)) setPreview({ type: 'image', content: `![[${label}]]`, x: clientX, y: clientY, setIsVisible, hash, link });
    else {
      const file = getFileByWebPath(weburl);
      const response = await fetch(import.meta.env.VITE_FILEPATH_PREFIX + file?.filepath);
      const content = await response.text();
      setPreview({ type: "markdown", content, x: clientX, y: clientY, setIsVisible, hash, link });
    }

    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleMouseClick = () => {
    //@ts-ignore
    const { type, hash, weburl, } = target?.dataset;
    const hashParam = hash ? '#' + hash : '';
    if (type === 'url') return;
    if (type === 'md') navigate({ to: `/${weburl}${hashParam}` });
    else if (type === 'image') navigate({ to: `/${weburl}` });
    navigate({ to: `/${weburl}${hash ? '#' + hash : ''}` });
    setIsVisible(false);
  }

  return { preview, isVisible, setIsVisible, handleMouseEnter, handleMouseLeave, handleMouseClick };
}