"use client";

import { useEffect, useRef } from "react";

interface IntersectionCheckProps {
  onEnter: () => void;
  onLeave?: () => void;
}

export const IntersectionCheck = ({ onEnter, onLeave }: IntersectionCheckProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          onEnter();
          obs.unobserve(entry.target);
        } else {
          if (onLeave) {
            onLeave();
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [onEnter, onLeave]);

  return <div ref={ref} style={{ height: 1 }} />;
};
