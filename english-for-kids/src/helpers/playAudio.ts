const playAudio = (src: string): void => {
    const audio = new Audio();
    audio.src = `assets/${src}`;
    audio.currentTime = 0;
    audio.play();
};

export { playAudio };
