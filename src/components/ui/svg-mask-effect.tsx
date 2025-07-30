"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 5,
  revealSize = 200,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<any>({ x: null, y: null });
  const containerRef = useRef<any>(null);
  const updateMousePosition = (e: any) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    containerRef.current.addEventListener("mousemove", updateMousePosition);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mousemove",
          updateMousePosition
        );
      }
    };
  }, []);
  let maskSize = isHovered ? revealSize : size;

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", className)}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Base layer - original text */}
      <div className="text-4xl text-neutral-8 dark:text-neutral-dark-8 tracking-tighter text-balance font-semibold">
        {children}
      </div>

      {/* Reveal layer - shows reveal text and hides original text in the masked area */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        animate={{
          clipPath: `circle(${maskSize}px at ${mousePosition.x}px ${mousePosition.y}px)`,
        }}
        transition={{
          clipPath: { duration: 0.3, ease: "easeInOut" },
        }}
      >
        <div className="flex items-center justify-center w-full h-full text-4xl text-neutral-8 dark:text-neutral-dark-8 tracking-tighter text-balance font-semibold bg-background">
          {revealText}
        </div>
      </motion.div>
    </div>
  );
};
