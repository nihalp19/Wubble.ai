import { AuroraText } from "@/components/magicui/aurora-text";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import MagicCardDemo from "./demo-components/MagicCardDemo";
import { ShimmerButton } from "./components/magicui/shimmer-btn";
import { useSongStore } from "./store/useSongStore";
import { useEffect } from "react";
import { SongPlayerBar } from "./demo-components/SongPlayerBar";
import { SongGeneratingLoader } from "./demo-components/SongGeneratingLoader";
import { LoadingSpinner } from "./demo-components/LoadingSpinner";


function App() {


  const { moods, genres, setCurrentGenre, setCurrentMood, currentGenre, currentMood, songs, loading } = useSongStore()

  useEffect(() => {
    useSongStore.getState().fetchMoods();
    useSongStore.getState().fetchGenres();
  }, []);


  console.log("songs", songs);

  const genrateTrack = async () => {
    if (!currentMood || !currentGenre) {
      alert("Please select both mood and genre");
      return;
    }

    try {
      await useSongStore.getState().fetchSongs(currentMood, currentGenre);

      setTimeout(() => {
        const audio = document.querySelector("audio");
        if (audio) audio.play();
      }, 300);

      setCurrentMood("");
      setCurrentGenre("");
    } catch (error) {
      console.error("Error generating track:", error);
    }
  };

  if (moods.length === 0 || genres.length === 0) {
    return (
      <div className="w-full bg-black min-h-screen flex flex-col items-center justify-center pt-8 sm:pt-10 px-4">
        <LoadingSpinner />
        <AuroraText className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-2">
          Loading moods and genres...
        </AuroraText>
      </div>
    );
  }


  return (
    <div className="w-full bg-black min-h-screen flex flex-col items-center  pt-8 sm:pt-10 px-4">

      {loading && <SongGeneratingLoader isVisible={loading} mood={currentMood} genre={currentGenre} ></SongGeneratingLoader>}

      <FlickeringGrid />

      <LineShadowText
        className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold italic text-center"
        shadowColor={"white"}
      >
        Wubble
      </LineShadowText>

      <AuroraText className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mt-2">
        QuickTune
      </AuroraText>

      <SparklesText className="text-white text-xs sm:text-sm md:text-base lg:text-lg text-center pt-5">
        Create AI Powered Music in seconds. Choose your mood and genre, then let your
        <br className="hidden sm:block" />
        AI compose the perfect track for you
      </SparklesText>

      <h2 className="text-white text-xl font-bold mt-5">Choose Your Mood</h2>

      <div className="grid  grid-cols-2 sm:grid-cols-4 gap-4 mt-6 w-full max-w-2xl">
        {moods && moods.map((m) => (
          <div key={m} onClick={() => setCurrentMood(m)} className="cursor-pointer">
            <MagicCardDemo title={m} />
          </div>
        ))}
      </div>

      <h2 className="text-white text-xl font-bold mt-5">Choose Your Genre</h2>

      <div className="grid  grid-cols-2 sm:grid-cols-4 gap-4 mt-4 w-full max-w-2xl">
        {genres && genres.map((g) => (
          <div key={g} onClick={() => setCurrentGenre(g)} className="cursor-pointer">
            <MagicCardDemo title={g} />
          </div>
        ))}
      </div>

      {currentMood && currentGenre && (<>
        <ShimmerButton className="shadow-2xl mt-15 w-full max-w-xs h-12 sm:w-[200px] sm:h-[50px]" onClick={genrateTrack}>
          <span className="whitespace-pre-wrap font-bold text-center text-sm sm:text-base md:text-lg leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
            Generate
          </span>
        </ShimmerButton>
      </>)}

      {currentMood || currentGenre ? (<></>) : (<SongPlayerBar />)}
    </div>


  );
}

export default App;
