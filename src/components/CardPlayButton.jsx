import Play from "../icons/Play";
import Pause from "../icons/Pause";
import { usePlayerStore } from "../store/playerStore";

export const CardPlayButton = ({ id }) => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const handleClick = (e) => {
    e.preventDefault(); // Previene la navegación
    e.stopPropagation(); // Evita que el evento se propague al anchor
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 flex items-center justify-center rounded-full p-2 bg-green-500 text-black text-center"
    >
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
};
