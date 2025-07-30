"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);

  return (
    <div className="flex gap-8">
      <div className="flex-1 max-w-md">
        <div className="w-full h-full flex flex-col items-start justify-center">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              className="py-3 cursor-pointer transition-all duration-200"
              onClick={() => setActiveCard(index)}
            >
              <motion.h3
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.5,
                }}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.title}
              </motion.h3>
            </div>
          ))}
        </div>
      </div>
      <div
        className={cn(
          "flex-1 min-h-[300px] justify-center items-center",
          contentClassName
        )}
      >
        <div className="h-full w-full flex items-center justify-center">
          {content[activeCard].content ?? null}
        </div>
      </div>
    </div>
  );
};
