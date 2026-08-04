document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.video-embed');

  videos.forEach((video) => {
    const tag = video.tagName.toLowerCase();

    if (tag === 'video') {
      const src = video.dataset.videoSrc;
      if (!src) return;

      const source = video.querySelector('source') || document.createElement('source');
      source.src = src;
      source.type = 'video/mp4';

      if (!video.querySelector('source')) {
        video.appendChild(source);
      }

      video.autoplay = true;
      video.controls = true;
      video.playsInline = true;
      video.loop = true;
      video.muted = video.classList.contains('floating-video') ? false : true;
      video.load();

      if (video.classList.contains('floating-video')) {
        video.volume = 0.8;
        video.play().catch(() => {
          // Alguns navegadores bloqueiam autoplay com áudio até a primeira interação.
        });
      }

      return;
    }

    if (tag === 'iframe') {
      const videoId = video.dataset.videoId;
      if (!videoId) return;

      video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0`;
    }
  });

  const floatingToggle = document.querySelector('.floating-video-toggle');
  const floatingVideo = document.querySelector('.floating-video');

  const updateFloatingToggle = () => {
    if (!floatingToggle || !floatingVideo) return;

    floatingToggle.textContent = floatingVideo.muted ? '🔊' : '🔉';
    floatingToggle.setAttribute('aria-label', floatingVideo.muted ? 'Ativar som' : 'Desativar som');
  };

  if (floatingToggle && floatingVideo) {
    floatingVideo.muted = false;
    floatingVideo.volume = 0.8;
    updateFloatingToggle();

    floatingToggle.addEventListener('click', () => {
      floatingVideo.muted = !floatingVideo.muted;
      updateFloatingToggle();
    });

    document.addEventListener('pointerdown', () => {
      floatingVideo.muted = false;
      floatingVideo.volume = 0.8;
      floatingVideo.play().catch(() => {});
      updateFloatingToggle();
    }, { once: true });
  }

  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
