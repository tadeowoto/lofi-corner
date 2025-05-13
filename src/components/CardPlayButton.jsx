import Play from "../icons/Play";
import Pause from "../icons/Pause";
import { usePlayerStore } from "../store/playerStore";

export const CardPlayButton = ({ id }) => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

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
        console.log({ playlist, songs });
      });
  };

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 flex items-center justify-center rounded-full p-2 bg-green-500 text-black text-center"
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
};
