"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from "react";
import Button from './Button';

interface JobCardProps {
  imageUrl: string | null;
  company: string;
  title: string;
  location: string;
  time: string;
  salary: string;
  path: string;
}

export default function JobCard({ imageUrl, company, title, location, time, salary, path }: JobCardProps) {
  return (
    <Link href={path} className="flex w-48 h-64 flex-col rounded-lg bg-[#5254A8] p-6 text-white transition-transform hover:-translate-y-1 md:w-52 md:h-72 xl:w-64 xl:h-80 border border-[#1E1E1E]">
     
      <div className="flex items-center mb-8">
        <div className="relative h-12 w-12 flex-shrink-0 rounded-full bg-white">
          <Image
            src={imageUrl || '/job.png'}
            alt={`${company} logo`}
            fill
            className="rounded-full object-contain p-1"
          />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-200">{company}</p>
          <h3 className="font-semibold text-[#FFE16B] text-base leading-tight">{title}</h3>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <img src="/location.png" alt="location icon" className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/time.png" alt="time icon" className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/money.png" alt="money icon" className="h-4 w-4" />
            <span>Mulai dari {salary}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button bgColor="#B3EBCE" width="60%" fontSize="text-sm">
          Lamar
        </Button>
      </div>
    </Link>
  );
}