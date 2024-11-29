import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { constants } from '@wsb/guac-widget-core';

const { renderModes } = constants;

const REAMAZE_JS_CONTAINER_ID = 'reamazejs-container';

function ReamazeWidget(props) {
  const {
    position,
    prompt,
    promptEnabled,
    starter1,
    starter2,
    starter3,
    color,
    reamazeBrandId,
    reamazeWrap,
    reamazeJsSource,
    reamazeCookieJsSource,
    cookieBannerEnabled,
    confirmationMessage,
    avatar,
    forceShowFlyout,
    renderMode
  } = props;

  const [firstRenderGreeting, setFirstRenderGreeting] = useState(true);
  const [firstRenderConfirmation, setFirstRenderConfirmation] = useState(true);

  const getReamazeJs = doc => {
    const reamazejs = doc.createElement('script');
    reamazejs.src =
      renderMode !== renderModes.EDIT && cookieBannerEnabled
        ? reamazeCookieJsSource
        : reamazeJsSource;
    reamazejs.async = true;
    reamazejs.type = 'text/javascript';
    return reamazejs;
  };

  const buildCueObject = (text, starter1, starter2, starter3) => {
    return {
      mode: 'notification',
      delay: renderMode === renderModes.EDIT ? 0 : 10,
      text,
      primary: starter1 || null,
      primary2: starter2 || null,
      primary3: starter3 || null
    };
  };

  const getSupportObject = () => {
    return {
      account: reamazeBrandId,
      openPopup: forceShowFlyout,
      ui: {
        contactMode: 'default',
        enableKb: 'false',
        styles: {
          widgetColor: color
        },
        widget: {
          icon: 'webChat',
          label:
            (promptEnabled || starter1 || starter2 || starter3) && renderMode !== renderModes.EDIT
              ? buildCueObject(prompt, starter1, starter2, starter3)
              : false,
          position: position
        },
        shoutboxFacesMode: 'custom',
        overrides: {
          confirmationMessage: confirmationMessage
        }
      },
      user: {
        authpath: `/m/api/reamaze/v2/customers/auth?brand=${reamazeBrandId}`
      },
      _preview: forceShowFlyout
    };
  };

  const mutationObserverCallback = (mutationList, observer) => {
    mutationList.forEach(mutation => {
      const node = mutation.addedNodes[0];

      if (node?.id === REAMAZE_JS_CONTAINER_ID) {
        if (renderMode === renderModes.EDIT && reamazeWrap?.current) {
          // in editor, move the widget to appear inside the frame
          reamazeWrap.current.append(node);
          observer.disconnect();
          return;
        }
      }
    });
  };

  useEffect(() => {
    if (renderMode === renderModes.EDIT) {
      const existingReamazeContainer = document.getElementById(REAMAZE_JS_CONTAINER_ID);
      if (typeof window.reamaze !== 'undefined' && existingReamazeContainer) {
        // When the user switches between edit and preview rendering mode, the reamaze object is already available.
        reamazeWrap.current.append(existingReamazeContainer);
      } else {
        const observer = new MutationObserver(mutationObserverCallback);
        const observerOptions = { childList: true };
        observer.observe(document.body, observerOptions);
      }
    }

    const reamazejs = getReamazeJs(document);
    document.body.appendChild(reamazejs);
    window._support = getSupportObject();

    return () => {
      if (typeof window.reamaze !== 'undefined' && renderMode === renderModes.EDIT) {
        window._support.ui.widget = false;
        window._support.openPopup = false;
        window._support._preview = false;
        window.reamaze.reload();
      }

      const rmz = document.querySelector(`script[src='${reamazeJsSource}']`);
      if (rmz) rmz.remove();

      const reamazeContainer = document.getElementById(REAMAZE_JS_CONTAINER_ID);
      if (reamazeContainer) reamazeContainer.remove();
    };
  }, []);

  useEffect(() => {
    if (renderMode !== renderModes.EDIT) return;

    window._support.ui.widget.position = position;
    window._support.ui.styles = { widgetColor: color };
    window._support.ui.shoutboxFacesMode = 'custom';
    window._support.openPopup = forceShowFlyout;
    window._support._preview = forceShowFlyout;
    window._support._route = null;

    // We want to hide the label when in EDIT mode so it
    // doesn't block any content on the preview portion
    window._support.ui.widget.label = false;

    if (typeof window.reamaze !== 'undefined') {
      window.reamaze.reload();
    }
  }, [position, color, avatar, forceShowFlyout]);

  useEffect(() => {
    if (renderMode !== renderModes.EDIT) return;

    if (firstRenderGreeting) {
      setFirstRenderGreeting(false);
      return;
    }

    if (promptEnabled && forceShowFlyout) {
      window._support.ui.widget.label = buildCueObject(prompt, starter1, starter2, starter3);
    } else {
      window._support.ui.widget.label = false;
    }

    window._support.openPopup = false;

    if (typeof window.reamaze !== 'undefined') {
      window.reamaze.reload();
    }
  }, [prompt, promptEnabled, starter1, starter2, starter3]);

  useEffect(() => {
    if (renderMode !== renderModes.EDIT) return;

    if (firstRenderConfirmation) {
      setFirstRenderConfirmation(false);
      return;
    }

    window._support._route = 'conversations:show';
    window._support._routeParams = { slug: '*mock_confirm_convo*' };
    window._support.ui.overrides.confirmationMessage = confirmationMessage;
    window._support.openPopup = forceShowFlyout;
    window._support._preview = forceShowFlyout;

    if (typeof window.reamaze !== 'undefined') {
      window.reamaze.reload();
    }
  }, [confirmationMessage]);
  return <div></div>;
}

ReamazeWidget.propTypes = {
  position: PropTypes.string,
  prompt: PropTypes.string,
  promptEnabled: PropTypes.bool,
  starter1: PropTypes.string,
  starter2: PropTypes.string,
  starter3: PropTypes.string,
  color: PropTypes.string,
  reamazeBrandId: PropTypes.string,
  reamazeJsSource: PropTypes.string,
  reamazeCookieJsSource: PropTypes.string,
  reamazeWrap: PropTypes.node,
  confirmationMessage: PropTypes.string,
  avatar: PropTypes.string,
  forceShowFlyout: PropTypes.bool,
  renderMode: PropTypes.string,
  cookieBannerEnabled: PropTypes.bool
};

export default ReamazeWidget;
