import Play from "../icons/Play";
import Pause from "../icons/Pause";
import { usePlayerStore } from "../store/playerStore";
import { playlists } from "../lib/data";

export const CardPlayButton = ({ id }) => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    setCurrentMusic({
      playlist: {
        id,
      },
    });
  };

  const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id;

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 flex items-center justify-center rounded-full p-2 bg-green-500 text-black text-center"
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
};
