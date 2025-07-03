import { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, Clock, History, Heart } from "lucide-react";
import { useSongStore } from "@/store/useSongStore";
import { AnimatePresence, motion } from "framer-motion";

export function SongPlayerBar() {
  const {
    getCurrentSong,
    toggleLike,
    likedSongs,
    addToRecentSongs,
    recentSongs,
    setCurrentSongIndex,
  } = useSongStore();

  const currentSong = getCurrentSong();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showRecentSongs, setShowRecentSongs] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoHideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isLiked = currentSong ? likedSongs.some((s) => s.id === currentSong.id) : false;

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
      if (currentSong) addToRecentSongs(currentSong);
    }
  };

  const handleLikeToggle = () => {
    if (currentSong) toggleLike(currentSong.id);
  };

  const handleRecentToggle = () => {
    setShowRecentSongs(true);
    if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    autoHideTimerRef.current = setTimeout(() => {
      setShowRecentSongs(false);
    }, 3000);
  };

  const handleRecentSongSelect = (song: any) => {
    const { songs } = useSongStore.getState();
    const index = songs.findIndex((s) => s.id === song.id);
    if (index !== -1) setCurrentSongIndex(index);
    setShowRecentSongs(false);
  };


  function getDownloadableUrl(url: string, filename?: string) {
    const base = url.split("/upload/");
    if (base.length !== 2) return url;

    const safeFilename = encodeURIComponent(
      (filename || "track").replace(/\s+/g, "_")
    );

    return `${base[0]}/upload/fl_attachment:${safeFilename}/${base[1]}`;
  }


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    setCurrentTime(0);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      // Try autoplay in useEffect (browser sometimes blocks autoplay in initial load)
      setTimeout(() => {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked
            setIsPlaying(false);
          });
        }
      }, 300);
    }
  }, [currentSong?.url]);

  const formatTime = (sec: number) => {
    if (!sec || isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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

        <AnimatePresence>
          {showRecentSongs && recentSongs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-3">
                <h4 className="text-white font-semibold text-sm mb-2">Recent Songs</h4>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {recentSongs.map((song) => (
                    <button
                      key={song.id}
                      onClick={() => handleRecentSongSelect(song)}
                      className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="text-white text-sm font-medium truncate">
                        {song.title}
                      </div>
                      <div className="text-white/70 text-xs truncate">
                        {song.artist}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-white/60 to-white/40 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-2 md:p-3 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex-1 min-w-0 pr-3">
              <h3 className="font-semibold text-white text-sm truncate">
                {currentSong.title}
              </h3>
              <p className="text-xs text-white/70 truncate">
                {currentSong.artist} • {currentSong.mood}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-white/80 text-xs font-mono">
                <Clock className="w-3 h-3" />
                <span>{formatTime(currentTime)}</span>
              </div>

              <button
                className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25 active:scale-95 transition-all duration-200 flex items-center justify-center"
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white ml-0.5" />
                )}
              </button>

              <button
                onClick={handleLikeToggle}
                className={`w-8 h-8 rounded-full border border-white/15 transition-all duration-200 flex items-center justify-center ${isLiked
                  ? "bg-red-500/20 hover:bg-red-500/30 text-red-400"
                  : "bg-white/10 hover:bg-white/20 text-white/90"
                  }`}
              >
                <Heart
                  className={`w-3 h-3 ${isLiked ? "fill-current text-red-400" : ""}`}
                />
              </button>

              <button
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200 flex items-center justify-center"
                onClick={handleRecentToggle}
              >
                <History className="w-3 h-3 text-white/90" />
              </button>

              <a
                href={currentSong.download}
                download={currentSong.title + ".mp3"}
                onClick={(e) => e.stopPropagation()} // ✅ Prevent propagation
              >
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200 flex items-center justify-center"
                >
                  <Download className="w-3 h-3 text-white/90" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
