document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.video-embed');

  videos.forEach((video) => {
    const videoId = video.dataset.videoId;

    if (!videoId) return;

    video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&controls=0&modestbranding=1&playsinline=1`;
  });

  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
