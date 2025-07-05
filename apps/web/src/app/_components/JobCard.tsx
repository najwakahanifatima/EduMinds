/* app/_components/JobCard.tsx */
"use client";
import React from "react";

interface JobCardProps {
  company: string;
  title: string;
  location: string;
  time: string;
  salary: string;
  path: string;
}

export default function JobCard({ company, title, location, time, salary, path }: JobCardProps) {
  return (
    <article className="flex w-48 h-64 md:w-52 md:h-72 xl:w-64 xl:h-80 flex-col rounded-lg bg-[#5254A8] p-4 text-white">
      {/* avatar placeholder */}
      <div className="flex items-center"> 
        <div className="h-10 w-10 rounded-full bg-[#FAFAF6BF]/75" />
        <div className="ml-4">
          <p className="mt-4 text-xs">{company}</p>
          <h3 className="text-[#FFE16B] font-semibold leading-tight">{title}</h3>
        </div>
      </div>

      <div className="mt-auto space-y-1 text-xs">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <img src="/location.png" alt="location icon" className="h-3 w-3" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <img src="/time.png" alt="time icon" className="h-3 w-3" />
            {time}
          </div>
          <div className="flex items-center gap-1">
            <img src="/money.png" alt="money icon" className="h-3 w-3" />
            <p>Mulai dari {salary}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-auto justify-items-center items-center">
        <button
          onClick={() => alert(`Lamaran untuk ${title}`)}
          className="mt-auto rounded-md bg-[#B3EBCE] py-1 text-center text-xs font-semibold text-gray-900 hover:bg-emerald-300/50 w-36">
          Lamar
        </button>
      </div>
    </article>
  );
}
