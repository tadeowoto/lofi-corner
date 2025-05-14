import { useEffect, useRef } from "react";
import Pause from "../icons/Pause";
import Play from "../icons/Play";
import { usePlayerStore } from "../store/playerStore";
import { PlayerVolumeControl } from "./PlayerVolumeControl";
import { PlayerSongControl } from "./PlayerSongControl";

const Player = () => {
  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]); // esto es para que cuando se cambie el estado de isPlaying se active el audio

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]); // esto es para que cuando se cambie el estado de volume se active el audio

  useEffect(() => {
    const { song, playlist } = currentMusic;
    if (song) {
      const src = `music/${playlist.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentMusic]); // esto es para que cuando se cambie el estado de currentMusic se active el audio

  const handleClick = () => {
    if (!isPlaying && !currentMusic.song) {
      alert("Por favor, selecione una cancion :)");
      return;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="backdrop-blur-md bg-zinc-900 border-t border-white/20">
      <div className="h-22 p-1  flex justify-between w-full px-4 z-50">
        {currentMusic.song ? (
          <div className="flex items-center gap-5 p-2 max-w-90">
            <picture className="w-12 h-12">
              <img
                src={currentMusic.song?.image}
                alt={`imagen del album de ${currentMusic.song?.album}`}
                className="w-full h-full object-cover"
              />
            </picture>
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">
                {currentMusic.song?.title}
              </h2>
              <p className="text-sm text-zinc-400">
                {currentMusic.song?.album}
              </p>
            </div>
          </div>
        ) : null}
        <div className="grid place-items-center gap-4 flex-1">
          <div className="w-[600px] flex justify-center flex-col items-center ">
            <button
              className="bg-white rounded-full p-2 text-black"
              onClick={handleClick}
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <PlayerSongControl audio={audioRef} client:visible />
          </div>
        </div>
        <div className="w-[200px] flex justify-center">
          <PlayerVolumeControl client:visible />
        </div>
        <audio ref={audioRef}></audio>
      </div>
    </div>
  );
};

export default Player;
