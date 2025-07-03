import { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, Clock, History, Heart } from "lucide-react";
import { useSongStore } from "@/store/useSongStore";

export function SongPlayerBar() {
  // Get the current song from your Zustand store
  const { getCurrentSong, toggleLike, addToRecentSongs, recentSongs, setCurrentSongIndex } = useSongStore();
  const currentSong = getCurrentSong();

  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showRecentSongs, setShowRecentSongs] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play/Pause logic
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      // Add to recent when playing starts
      if (currentSong) {
        addToRecentSongs(currentSong);
      }
    }
    setIsPlaying((prev) => !prev);
  };

  // Handle like toggle
  const handleLikeToggle = () => {
    if (currentSong) {
      toggleLike(currentSong.id);
    }
  };

  // Handle recent songs toggle
  const handleRecentToggle = () => {
    setShowRecentSongs(!showRecentSongs);
  };

  // Handle recent song selection
  const handleRecentSongSelect = (song: any) => {
    const { songs } = useSongStore.getState();
    const songIndex = songs.findIndex(s => s.id === song.id);
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex);
    }
    setShowRecentSongs(false);
  };

  // Update timer and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
    };
  }, []);

  // Reset timer and playing state when song changes
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }, [currentSong?.url]);

  // Format time (mm:ss)
  const formatTime = (sec: number) => {
    if (!sec || isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  // Calculate progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 z-50 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <audio
          ref={audioRef}
          src={currentSong.url}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Recent Songs Dropdown */}
        {showRecentSongs && recentSongs.length > 0 && (
          <div className="mb-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-3">
              <h4 className="text-white font-semibold text-sm mb-2">Recent Songs</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {recentSongs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => handleRecentSongSelect(song)}
                    className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="text-white text-sm font-medium truncate">{song.title}</div>
                    <div className="text-white/70 text-xs truncate">{song.artist}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Main Player Container - Slimmed down */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          {/* Progress Bar Background */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-white/60 to-white/40 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="p-2 md:p-3">
            {/* Mobile Layout - Compact */}
            <div className="block md:hidden">
              <div className="flex items-center justify-between">
                {/* Song Info - Compact */}
                <div className="flex-1 min-w-0 pr-3">
                  <h3 className="font-semibold text-white text-sm truncate leading-tight">
                    {currentSong.title}
                  </h3>
                  <p className="text-xs text-white/70 truncate">
                    {currentSong.artist} • {currentSong.mood}
                  </p>
                </div>
                
                {/* Controls Row - Compact */}
                <div className="flex items-center gap-2">
                  {/* Timer */}
                  <div className="flex items-center gap-1 text-white/80 text-xs font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(currentTime)}</span>
                  </div>
                  
                  {/* Play Button */}
                  <button
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25 active:scale-95 transition-all duration-200 flex items-center justify-center"
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    type="button"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    )}
                  </button>
                  
                  {/* Secondary Controls */}
                  <button
                    className={`w-8 h-8 rounded-full border border-white/15 transition-all duration-200 flex items-center justify-center ${
                      currentSong.isLiked 
                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' 
                        : 'bg-white/10 hover:bg-white/20 text-white/90'
                    }`}
                    aria-label="Like Song"
                    type="button"
                    onClick={handleLikeToggle}
                  >
                    <Heart className={`w-3 h-3 ${currentSong.isLiked ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200 flex items-center justify-center"
                    aria-label="Recent Songs"
                    type="button"
                    onClick={handleRecentToggle}
                  >
                    <History className="w-3 h-3 text-white/90" />
                  </button>
                  
                  <a
                    href={currentSong.url}
                    download={currentSong.title}
                    aria-label="Download"
                  >
                    <button
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200 flex items-center justify-center"
                      type="button"
                    >
                      <Download className="w-3 h-3 text-white/90" />
                    </button>
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Compact */}
            <div className="hidden md:flex items-center justify-between">
              {/* Song Info */}
              <div className="flex-1 min-w-0 pr-6">
                <h3 className="font-semibold text-white text-base mb-0.5 truncate leading-tight">
                  {currentSong.title}
                </h3>
                <p className="text-sm text-white/70 truncate">
                  {currentSong.artist} • {currentSong.mood} • {currentSong.genre}
                </p>
              </div>

              {/* Center Controls */}
              <div className="flex items-center gap-4">
                {/* Timer */}
                <div className="flex items-center gap-1.5 text-white/80 font-mono text-sm">
                  <Clock className="w-4 h-4" />
                  <span>
                    {formatTime(currentTime)} / {formatTime(duration || currentSong.duration)}
                  </span>
                </div>

                {/* Main Play Button */}
                <button
                  className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25 active:scale-95 transition-all duration-200 flex items-center justify-center group shadow-lg"
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  type="button"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5 group-hover:scale-110 transition-transform" />
                  )}
                </button>

                {/* Secondary Controls */}
                <div className="flex items-center gap-2">
                  <button
                    className={`w-9 h-9 rounded-full border border-white/15 transition-all duration-200 flex items-center justify-center group ${
                      currentSong.isLiked 
                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' 
                        : 'bg-white/10 hover:bg-white/20 text-white/90'
                    }`}
                    aria-label="Like Song"
                    type="button"
                    onClick={handleLikeToggle}
                  >
                    <Heart className={`w-4 h-4 group-hover:scale-110 transition-transform ${currentSong.isLiked ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200 flex items-center justify-center group"
                    aria-label="Recent Songs"
                    type="button"
                    onClick={handleRecentToggle}
                  >
                    <History className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform" />
                  </button>
                  
                  <a
                    href={currentSong.url}
                    download={currentSong.title}
                    aria-label="Download"
                  >
                    <button
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200 flex items-center justify-center group"
                      type="button"
                    >
                      <Download className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform" />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}