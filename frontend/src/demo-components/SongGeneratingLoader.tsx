import { Music, Heart, Zap, Moon, Sun, Headphones, Radio, Volume2 } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";
import { useEffect, useState } from "react";

interface SongGeneratingLoaderProps {
  isVisible: boolean;
  mood: string;
  genre: string;
}

export function SongGeneratingLoader({ isVisible, mood, genre }: SongGeneratingLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Get mood icon
  const getMoodIcon = (mood: string) => {
    const moodLower = mood.toLowerCase();
    if (moodLower.includes('chill') || moodLower.includes('calm')) return Moon;
    if (moodLower.includes('happy') || moodLower.includes('upbeat')) return Sun;
    if (moodLower.includes('love') || moodLower.includes('romantic')) return Heart;
    if (moodLower.includes('energy') || moodLower.includes('powerful')) return Zap;
    return Music;
  };

  // Get genre icon
  const getGenreIcon = (genre: string) => {
    const genreLower = genre.toLowerCase();
    if (genreLower.includes('electronic') || genreLower.includes('techno')) return Radio;
    if (genreLower.includes('classical') || genreLower.includes('orchestral')) return Volume2;
    if (genreLower.includes('pop') || genreLower.includes('rock')) return Headphones;
    return Music;
  };

  const MoodIcon = getMoodIcon(mood);
  const GenreIcon = getGenreIcon(genre);

  const steps = [
    { text: "Analyzing your mood...", icon: MoodIcon, color: "from-purple-500 to-pink-500" },
    { text: "Selecting genre elements...", icon: GenreIcon, color: "from-blue-500 to-cyan-500" },
    { text: "Generating your song...", icon: Music, color: "from-green-500 to-emerald-500" },
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 15;
      });
    }, 300);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible, steps.length]);

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];
  const CurrentIcon = currentStepData.icon;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg" />
      
      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 p-8">
        {/* Main icon with animated rings */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-white/20 animate-spin" 
               style={{ animationDuration: '3s' }} />
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-2 w-28 h-28 rounded-full border border-white/30 animate-pulse" />
          
          {/* Inner gradient background */}
          <div className={`absolute inset-4 w-24 h-24 rounded-full bg-gradient-to-r ${currentStepData.color} opacity-20 animate-pulse`} />
          
          {/* Center icon */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <CurrentIcon className="w-12 h-12 text-white animate-bounce" />
          </div>
        </div>

        {/* Step text */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">
            {currentStepData.text}
          </h2>
          <p className="text-white/70 text-lg">
            Creating the perfect {mood} {genre} experience
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 space-y-2">
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`absolute inset-0 bg-gradient-to-r ${currentStepData.color} rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>Generating...</span>
            <span>{Math.round(Math.min(progress, 100))}%</span>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r ${currentStepData.color} rounded-full opacity-40 animate-ping`}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Bottom loading spinner */}
        <div className="flex items-center space-x-3 text-white/80">
          <LoadingSpinner size="sm" />
          <span className="text-sm font-medium">Processing audio...</span>
        </div>
      </div>
    </div>
  );
}