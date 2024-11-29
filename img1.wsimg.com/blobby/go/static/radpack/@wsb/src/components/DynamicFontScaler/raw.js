function DynamicFontScaler({ containerId, targetId, fontSizes, maxLines, prioritizeDefault }) {
  if (typeof document === 'undefined') return;
  let prevWindowWidth;
  const container = document.getElementById(containerId);
  const target = document.getElementById(targetId);

  function fits(scaler) {
    return getContentWidth(scaler) <= container.clientWidth && getNumLines(scaler) <= maxLines;
  }

  function fontSizeValue(scaler) {
    return parseInt(getComputedPropertyValue(scaler, 'font-size') || 0, 10);
  }

  function getScalerWithSmallestFont(scalerElements) {
    return scalerElements.sort((first, second) => {
      return fontSizeValue(first) - fontSizeValue(second);
    })[0];
  }

  function getBestFit(scalerElements) {
    if (scalerElements.length === 1) return scalerElements[0];
    const fitsList =  scalerElements.filter(fits);
    if (fitsList.length === 1) return fitsList[0];
    if (!fitsList.length) return getScalerWithSmallestFont(scalerElements);

    // all scalers fit, so return the largest one in font-size pixels
    const orderedList = fitsList.sort((first, second) => {
      return fontSizeValue(second) - fontSizeValue(first);
    });

    return orderedList[0];
  }

  function calculateBestFit() {
    if (!container || !target || prevWindowWidth === window.innerWidth) return;

    // Don't apply dynamic font scaling to elements that have been manually sized by the C1
    if (target.hasAttribute('data-font-scaled')) {
      reset();
      return;
    }

    prevWindowWidth = window.innerWidth; // Keep track of the window width, as we don't care about height changes

    const scalerElements = getScalers();

    if (container.clientWidth && scalerElements.length) {
      const prevContainerWidth = container.style.width || '';
      container.style.width = '100%';

      initScalers(scalerElements);
      const bestFit = getBestFit(scalerElements);
      hideScalers(scalerElements);

      container.style.width = prevContainerWidth;
      const bestFitPx = getComputedPropertyValue(bestFit, 'font-size');
      const lastSize = target.getAttribute('data-last-size');
      if (bestFitPx && bestFitPx !== lastSize) {
        if (prioritizeDefault) {
          const currentSizePx = getComputedPropertyValue(target, 'font-size');
          // The current default size fits, so just keep that
          if (parseInt(bestFitPx, 10) >= parseInt(currentSizePx, 10)) return;
        }

        target.setAttribute('data-last-size', bestFitPx);
        let styleElement = document.querySelector(`#${targetId}-style`);
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = `${targetId}-style`;

          document.head.appendChild(styleElement);
        }

        styleElement.textContent = `#${target.id} { font-size: ${bestFitPx} !important; }`;
      }
    }
  }

  function reset() {
    target && target.removeAttribute('data-last-size');
    const styleElement = document.querySelector(`#${targetId}-style`);
    styleElement && styleElement.parentNode.removeChild(styleElement);
  }

  function getScalers() {
    return Array.prototype.slice
      .call(container.querySelectorAll(`[data-scaler-id="scaler-${containerId}"]`))
      .sort(
        (first, second) =>
          fontSizes.indexOf(first.getAttribute('data-size')) -
          fontSizes.indexOf(second.getAttribute('data-size'))
      );
  }

  function getContentWidth(el) {
    const paddingLeft = parseInt(getComputedPropertyValue(el, 'padding-left') || 0, 10);
    const paddingRight = parseInt(getComputedPropertyValue(el, 'padding-right') || 0, 10);
    return el.scrollWidth + paddingLeft + paddingRight;
  }

  function getComputedPropertyValue(el, property) {
    return document.defaultView.getComputedStyle(el).getPropertyValue(property);
  }

  function getNumLines(el) {
    const containerHeight = el.offsetHeight;
    const lineHeight = parseInt(getComputedPropertyValue(el, 'line-height'), 10) || 1;
    return Math.floor(containerHeight / lineHeight);
  }

  function initScalers(elements) {
    elements.forEach(el => {
      el.style.display = 'inline-block';
      el.style.maxWidth = `${container.clientWidth}px`;
    });
  }

  function hideScalers(elements) {
    elements.forEach(el => {
      el.style.display = 'none';
      el.style.maxWidth = '';
    });
  }

  calculateBestFit();

  window.addEventListener('resize', calculateBestFit);

  return () => {
    reset();
    window.removeEventListener('resize', calculateBestFit);
  };
}

export default DynamicFontScaler;
