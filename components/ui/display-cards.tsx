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
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-5 text-primary" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-primary",
  titleClassName = "text-primary",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-block rounded-full bg-primary/10 p-2">
          {React.cloneElement(icon as React.ReactElement, { className: `size-5 ${iconClassName}` })}
        </span>
        <h3 className={cn("text-lg font-bold", titleClassName)}>{title}</h3>
      </div>
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      {date && <p className="text-sm text-gray-400">{date}</p>}
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
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
    <div className="grid grid-cols-2 gap-4 md:gap-6 w-full">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
