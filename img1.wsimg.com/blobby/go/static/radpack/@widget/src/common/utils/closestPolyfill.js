/* eslint-disable */
// IE does not support closest() natively
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

export default function closestPolyfill() {
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (selector) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(selector),
        currentIndex,
        el = this;
      do {
        currentIndex = matches.length;
        while (--currentIndex >= 0 && matches.item(currentIndex) !== el) {}
      } while (currentIndex < 0 && (el = el.parentElement));
      return el;
    };
  }
}
