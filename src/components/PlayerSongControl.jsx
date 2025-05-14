import { useEffect, useState } from "react";
import { Slider } from "./Slider";

const formatTime = (time) => {
  if (time === 0) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const PlayerSongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  });

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
  };
  const duration = audio?.current?.duration ?? 0;

  return (
    <div className="w-full flex items-center gap-x-2 ">
      <span className="opacity-50">{formatTime(currentTime)}</span>
      <Slider
        defaultValue={[0]}
        max={audio?.current?.duration ?? 0}
        min={0}
        className="w-full"
        value={[currentTime]}
        onValueChange={(value) => {
          audio.current.currentTime = value;
        }}
      />
      <span className="opacity-50">
        {duration ? formatTime(duration) : null}
      </span>
    </div>
  );
};
