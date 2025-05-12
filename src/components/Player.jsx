import { useEffect, useRef, useState } from "react";
import Pause from "../icons/Pause";
import Play from "../icons/Play";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.src = "music/1/01.mp3";
  }, []);

  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="backdrop-blur-md bg-white/10 border-t border-white/20">
        <div className="h-16  flex justify-between w-full px-4 z-50">
          <div>current song</div>
          <div className="grid place-items-center gap-4 flex-1">
            <div className="flex justify-center">
              <button
                className="bg-white rounded-full p-2"
                onClick={handleClick}
              >
                {isPlaying ? <Pause /> : <Play />}
              </button>
            </div>
          </div>
          <div className="grid place-content-center">volume</div>
          <audio ref={audioRef}></audio>
        </div>
      </div>
    </div>
  );
};

export default Player;
