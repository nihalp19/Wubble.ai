import { AuroraText } from "@/components/magicui/aurora-text";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import MagicCardDemo from "./demo-components/MagicCardDemo";
import { ShimmerButton } from "./components/magicui/shimmer-btn";

const mood = ["Happy", "Sad", "Energetic", "Chill"];
const genre = ["Pop", "Lofi", "Cinematic", "EDM"];

function App() {
  return (
    <div className="w-full bg-black min-h-screen flex flex-col items-center justify-center pt-8 sm:pt-10 px-4">
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



        <div className="grid  grid-cols-2 sm:grid-cols-4 gap-4 mt-6 w-full max-w-2xl">
          {mood.map((m) => (
            <MagicCardDemo key={m} title={m} />
          ))}
        </div>

        {/* Genre Cards */}
        <div className="grid  grid-cols-2 sm:grid-cols-4 gap-4 mt-4 w-full max-w-2xl">
          {genre.map((g) => (
            <MagicCardDemo key={g} title={g} />
          ))}
        </div>


      {/* Generate Button */}
      <ShimmerButton className="shadow-2xl mt-16 w-full max-w-xs h-12 sm:w-[200px] sm:h-[50px]">
        <span className="whitespace-pre-wrap font-bold text-center text-sm sm:text-base md:text-lg leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
          Generate
        </span>
      </ShimmerButton>
    </div>
  );
}

export default App;
