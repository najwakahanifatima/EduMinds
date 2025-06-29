"use client";

import React, { useState } from "react";
import Image from "next/image";

type ItemType = "lesson" | "task";

export interface LearningItemCardProps {
    idx: number;
    type: string;
    title: string;
    completed?: boolean;

    onStart?: () => void;
    onReview?: () => void;
    onResult?: () => void; 
}

export default function LearningItemCard({
    idx,
    type,
    title,
    completed = false,
    onStart,
    onReview,
    onResult,
}: LearningItemCardProps) {
    const [open, setOpen] = useState(false);

    const iconSrc =
        type === "lesson" ? "/pelajaran.png" : "/tugas.png";

    /* label & handler utama */
    let primaryLabel = "";
    let primaryHandler: (() => void) | undefined;

    if (type === "lesson") {
        primaryLabel = completed ? "Pelajari Kembali" : "Pelajari";
        primaryHandler = completed ? onReview : onStart;
    } else {
        /* task */
        primaryLabel = completed ? "Lihat Hasil" : "Kerjakan";
        primaryHandler = completed ? onResult : onStart;
    }

    return (
        <article
        onClick={() => setOpen((s) => !s)}
        className={`
            cursor-pointer select-none
            rounded-2xl border-2 p-6 transition
            ${completed ? "border-[#67B28B] bg-[#B3EBCE]/60" : "border-[#3D3FA0] bg-[#B3EBCE]/60"}
            
        `}
        >
        {/* header */}
        <div className="flex items-start justify-between">
            <div className="flex gap-3">
            <Image src={iconSrc} alt="" width={32} height={32} />
            <div>
                <p className="text-xs font-semibold text-[#1E1E1E]/60">
                {type === "lesson" ? `Pelajaran ${idx}` : `Tugas ${idx}`}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900">
                {title}
                </h3>
            </div>
            </div>

            {completed && (
            <Image src="/done.png" alt="done" width={24} height={24} />
            )}
        </div>

        {open && (
            <button
            onClick={(e) => {
                e.stopPropagation();
                primaryHandler?.();
            }}
            disabled={!primaryHandler}
            className="
                mt-6 block w-full rounded-lg
                bg-[#5254A8] py-2 text-center text-sm font-semibold text-white
                hover:bg-indigo-800/90 disabled:opacity-40"
            >
            {primaryLabel}
            </button>
        )}
        </article>
    );
}

// todo: make the non clicked be more transparent

