export default function FadeIn({ targetId }) {
  const handleLoad = () => {
    window.removeEventListener('load', handleLoad);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const observer = new IntersectionObserver(() => {
        targetEl.style.transition = 'opacity 1.2s ease-in-out';
        targetEl.style.opacity = '1';
        observer.disconnect();
      });
      observer.observe(targetEl);
    }
  };
  if (document.readyState === 'complete') {
    handleLoad();
  } else {
    window.addEventListener('load', handleLoad);
  }
}
