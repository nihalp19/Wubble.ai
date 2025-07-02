"use client";
import { NeonGradientCard } from "@/components/magicui/gradient-card";
import { useSongStore } from "@/store/useSongStore";

export default function MagicCardDemo({ title }: { title: string }) {
  const { currentGenre, currentMood } = useSongStore();

  const isSelected = currentGenre === title || currentMood === title;

  return (
    <div className="flex items-center justify-center w-full h-full">
      {isSelected ? (
        <NeonGradientCard
          className="flex items-center justify-center w-full h-[55px] text-base sm:text-xl text-center font-extrabold text-white transition-transform duration-300 transform hover:scale-105"
        >
          {title}
        </NeonGradientCard>
      ) : (
        <div
          className="w-full h-[55px] text-base sm:text-xl text-center font-semibold text-white transition-transform duration-300 transform hover:scale-105 flex items-center justify-center border border-white/30 rounded-xl"
        >
          {title}
        </div>
      )}
    </div>
  );
}
