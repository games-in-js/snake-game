export class AudioManager {
  eatSound: HTMLAudioElement;
  gameOverSound: HTMLAudioElement;
  backgroundMusic: HTMLAudioElement;

  constructor() {
    this.eatSound = new Audio("/sounds/eat.mp3");
    this.gameOverSound = new Audio("/sounds/hit.mp3");
    this.backgroundMusic = new Audio("/sounds/music.mp3");

    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.5;
  }

  playMusic() {
    this.backgroundMusic.currentTime = 0;
    this.backgroundMusic.play();
  }

  stopMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  playEat() {
    this.eatSound.currentTime = 0;
    this.eatSound.play();
  }

  playGameOver() {
    this.gameOverSound.currentTime = 0;
    this.gameOverSound.play();
    this.stopMusic();
  }
}
