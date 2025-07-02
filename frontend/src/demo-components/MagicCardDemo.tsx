"use client";
import { NeonGradientCard } from "@/components/magicui/gradient-card";

export default function MagicCardDemo({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <NeonGradientCard
        className="w-full h-[70px] text-base sm:text-xl text-center font-extrabold text-white transition-transform duration-300 transform hover:scale-105 flex items-center justify-center"
      >
        {title}
      </NeonGradientCard>
    </div>
  );
}
