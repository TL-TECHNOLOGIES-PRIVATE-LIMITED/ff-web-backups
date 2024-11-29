const MAX_LEN_MOBILE = 20;

export default function FullWidthScaler({
  containerId,
  targetId,
  renderMode,
  maxSize,
  tabletBreakpoint
}) {
  let containerEl = document.getElementById(containerId);
  let targetEl = document.getElementById(targetId);
  let currentScale = 1;
  const isPublish = renderMode === 'PUBLISH';
  const ro = new ResizeObserver(resizeFont);

  function getScale() {
    if (!isPublish) {
      const scaler = containerEl.closest('.ux-scaled');
      if (scaler) {
        const matches = scaler.style?.transform?.match(/[0-9.]+/);
        if (matches && matches.length > 0) {
          currentScale = parseFloat(matches[0]) || 1;
        }
      }
    }
    return currentScale;
  }

  function resizeFont() {
    // In editor, the container and target elements can change due to react rerenders
    const container = isPublish ? containerEl : document.getElementById(containerId);
    const target = isPublish ? targetEl : document.getElementById(targetId);
    const containerOffsetWidth = container.offsetWidth;
    const containerWidth = container.getBoundingClientRect().width;

    if (containerOffsetWidth < tabletBreakpoint - 100 && target.innerText.length > MAX_LEN_MOBILE) {
      // Revert to default font size for long text on mobile
      target.style.fontSize = '';
      target.style.whiteSpace = 'inherit';
    } else {
      target.style.whiteSpace = 'nowrap';
      const targetWidth = target.scrollWidth || 1;
      const targetComputedStyle = window.getComputedStyle(target);
      const targetFontSize = parseFloat(targetComputedStyle.fontSize) || 1;
      const ratio = containerWidth / targetWidth;
      const scale = getScale();

      const newFontSize = Math.min(maxSize, Math.floor((targetFontSize * ratio) / scale));
      if (newFontSize !== targetFontSize) {
        target.style.fontSize = `${newFontSize}px`;
      }
    }

    if (containerEl !== container) {
      containerEl = container;
      ro.observe(containerEl);
    }
    if (targetEl !== target) {
      targetEl = target;
      ro.observe(targetEl);
    }
  }

  resizeFont();

  // Listen for container size changes and font loading events
  ro.observe(containerEl);
  ro.observe(targetEl);
  document.fonts.addEventListener('loadingdone', resizeFont);

  return () => {
    // Reset font size and remove listeners
    targetEl.style.fontSize = '';
    ro.disconnect();
    document.fonts.removeEventListener('loadingdone', resizeFont);
  };
}
