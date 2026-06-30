"use client";

import { useState, useCallback } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  date: string;
}

export function ShareButton({ date }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const url = `https://abhishekgusain.vercel.app/logs/${date}`;

    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [date]);

  return (
    <button
      onClick={handleShare}
      className={`inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap border border-[var(--field-ink)] bg-[var(--field-panel)] px-4 text-sm font-bold shadow-[4px_4px_0_rgba(27,27,23,0.08)] transition-all hover:-translate-y-0.5 ${
        isCopied
          ? "text-[var(--field-forest)]"
          : "text-[var(--field-ink)] hover:text-[var(--field-rust)]"
      }`}
    >
      {isCopied ? (
        <Check className="w-4 h-4" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      {isCopied ? "Copied!" : "Share"}
    </button>
  );
}
