"use client";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Props {
  text: string;
}
export default function TTSButton({ text }: Props) {
  const speak = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = "id-ID";
    synth.speak(ut);
  };

  return (
    <button
      onClick={speak}
      className="flex items-center gap-1 rounded-md bg-[#B3EBCE] px-5 py-1.5
                 text-sm font-semibold text-gray-900 hover:scale-105 border border-[#1E1E1E]"
    >
      Baca Keras <SpeakerWaveIcon className="h-3 w-3" />
    </button>
  );
}
