import useSound from 'use-sound';

import { rightAnswerSound, wrongAnswerSound, victorySound, loseSound } from '../consts/assetsPaths';

const useGameSounds = (volumeLevel: number, isVolumeOn: boolean) => {
  const [playRightAnswerSound] = useSound(rightAnswerSound, {
    volume: volumeLevel,
    soundEnabled: isVolumeOn,
  });

  const [playWrongAnswerSound] = useSound(wrongAnswerSound, {
    volume: volumeLevel,
    soundEnabled: isVolumeOn,
  });

  const [playVictorySound] = useSound(victorySound, {
    volume: volumeLevel,
    soundEnabled: isVolumeOn,
  });

  const [playLoseSound] = useSound(loseSound, {
    volume: volumeLevel,
    soundEnabled: isVolumeOn,
  });

  return { playRightAnswerSound, playWrongAnswerSound, playVictorySound, playLoseSound };
};

export { useGameSounds };
