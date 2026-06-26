document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('playButton');
  const overlay = document.getElementById('videoOverlay');
  const video = document.getElementById('introVideo');

  if (!button || !overlay || !video) {
    return;
  }

  const hideOverlay = () => {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
  };

  const enterFullscreen = () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  button.addEventListener('click', async () => {
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    video.currentTime = 0;

    try {
      await video.play();
      enterFullscreen();
    } catch (error) {
      console.error('Video playback failed:', error);
    }
  });

  video.addEventListener('ended', hideOverlay);

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      video.pause();
      hideOverlay();
    }
  });
});
