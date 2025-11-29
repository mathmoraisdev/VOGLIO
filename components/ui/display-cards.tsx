"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  isVisible?: boolean;
  animationDelay?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-5 text-primary" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-primary",
  titleClassName = "text-primary",
  isVisible = true,
  animationDelay = "0s",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-xl border-2 border-gray-200 bg-white p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow scroll-animate-card",
        isVisible ? "is-visible" : "",
        className
      )}
      style={{ animationDelay }}
    >
      <div className="flex items-center gap-3 mb-3 min-h-[50px]">
        <span className="inline-block rounded-full bg-primary/10 p-2 flex-shrink-0">
          {React.cloneElement(icon as React.ReactElement, { className: `size-5 ${iconClassName}` })}
        </span>
        <h3 className={cn("text-base md:text-lg font-bold leading-tight", titleClassName)}>{title}</h3>
      </div>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-grow">{description}</p>
      {date && <p className="text-sm text-gray-400 mt-3">{date}</p>}
    </div>
  );
}

interface DisplayCardsProps {
  cards?: Omit<DisplayCardProps, 'isVisible' | 'animationDelay'>[];
  isVisible?: boolean;
  baseDelay?: number;
  staggerDelay?: number;
  className?: string;
}

export default function DisplayCards({ 
  cards, 
  isVisible = true, 
  baseDelay = 0.4, 
  staggerDelay = 0.4,
  className 
}: DisplayCardsProps) {
  const defaultCards = [
    {
      icon: <Sparkles className="size-5 text-primary" />,
      title: "Featured",
      description: "Discover amazing content",
      date: "Just now",
    },
    {
      icon: <Sparkles className="size-5 text-primary" />,
      title: "Popular",
      description: "Trending this week",
      date: "2 days ago",
    },
    {
      icon: <Sparkles className="size-5 text-primary" />,
      title: "New",
      description: "Latest updates and features",
      date: "Today",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 w-full items-stretch", className)}>
      {displayCards.map((cardProps, index) => (
        <DisplayCard 
          key={index} 
          {...cardProps} 
          isVisible={isVisible}
          animationDelay={`${baseDelay + index * staggerDelay}s`}
        />
      ))}
    </div>
  );
}
