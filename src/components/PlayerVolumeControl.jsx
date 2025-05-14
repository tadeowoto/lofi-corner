import { usePlayerStore } from "../store/playerStore";
import { Slider } from "./Slider";
import {
  VolumeFull,
  VolumeLow,
  VolumeMedium,
  VolumeSilenced,
} from "../icons/VolumeIcons";

export const PlayerVolumeControl = () => {
  const { volume, setVolume } = usePlayerStore((state) => state);

  return (
    <div className="w-full flex items-center gap-x-3">
      {volume === 0 ? (
        <VolumeSilenced />
      ) : volume < 33 ? (
        <VolumeLow />
      ) : volume < 66 ? (
        <VolumeMedium />
      ) : (
        <VolumeFull />
      )}
      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        className="w-full"
        value={[volume * 100]}
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;
          setVolume(volumeValue);
        }}
      />
    </div>
  );
};
