"use client";

import React from "react";

export interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <video
      src={src}
      controls
      className="h-120 w-full rounded-xl border-2 border-gray-400 bg-black"
    />
  );
}