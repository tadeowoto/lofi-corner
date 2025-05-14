import Play from "../icons/Play";
import Pause from "../icons/Pause";
import { usePlayerStore } from "../store/playerStore";

export const CardPlayButton = ({ id, size = "sm" }) => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);
  console.log("llamada al boton ", id);
  const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist-json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({
          playlist,
          song: songs[0],
          songs,
        });
      });
  };

  return (
    <button
      onClick={handleClick}
      className={`w-10 h-10 ${
        size === "lg" ? "w-12 h-12" : ""
      } flex items-center justify-center rounded-full text-white p-2 bg-violet-900 hover:bg-violet-800 transition-all hover:cursor-pointer text-center`}
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
};
