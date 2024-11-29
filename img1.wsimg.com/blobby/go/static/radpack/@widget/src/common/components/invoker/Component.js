/* eslint-disable complexity */

import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { UX, UX2, constants } from '@wsb/guac-widget-core';
import Badge from '@wsb/guac-widget-shared/lib/components/Recaptcha/badge';
import trafficEvents from '@wsb/guac-widget-shared/lib/common/constants/traffic2';
import formIdentifiers from '@wsb/guac-widget-shared/lib/common/constants/form/formIdentifiers';

import MessageFlyout from '../MessageFlyout';
import ReamazeWidget from '../ReamazeWidget.js';
import getApiVersion from '../../utils/getApiVersion';
import * as keys from '../../../constants/widget/keys';
import dataAids from '../../../constants/dataAids';
import { EMAIL, CONVERSATIONS, REAMAZE } from '../../../constants/common/notificationTypes';

const {
  utils: { TCCLUtils }
} = UX2;

const DATA_AID_PREFIX = 'MESSAGING';
const ZERO_ID = '00000000-0000-0000-0000-000000000000';
const { MESSAGING_EMAIL, MESSAGING_CONVERSATIONS } = formIdentifiers;
const { Z_INDEX_COOKIE_BANNER, Z_INDEX_FULL_SCREEN_OVERLAY, Z_INDEX_STICKY_NAV } = constants.layers;
const { renderModes } = constants;

const emailFields = ({ keyName }) => keyName !== 'phone';

const MessageFormLazy = lazy(() => import('@wsb/guac-widget-shared/lib/components/Form'));

const loaderContainerStyles = {
  marginBottom: 'medium',
  display: 'block',
  textAlign: 'center',
  color: 'action'
};

function MessageInvoker(props) {
  const {
    id,
    section,
    forceShowFlyout,
    welcomeMessage,
    config,
    formFields,
    formSuccessMessage,
    emailOptInEnabled,
    emailOptInMessage,
    notificationPreference,
    recaptchaType,
    emailConfirmationMessage,
    locale,
    websiteId,
    accountId,
    domainName,
    staticContent,
    isReseller,
    businessName,
    reamazeBrandId,
    reamazePrompt,
    reamazeStarter1,
    reamazeStarter2,
    reamazeStarter3,
    reamazePromptEnabled,
    reamazeThemeColor,
    reamazePosition,
    reamazeConfirmationMessage,
    reamazeAvatarImage,
    renderMode,
    cookieBannerEnabled
  } = props;
  const didMountRef = useRef(false);
  const [showFlyout, setShowFlyout] = useState(forceShowFlyout);
  const [isMobile, setIsMobile] = useState(props.isMobile);
  const isPublishMode = renderMode === constants.renderModes.PUBLISH;
  const toggleFormVisibility = () => setShowFlyout(!showFlyout);

  useEffect(() => {
    const body = window.document?.body;
    if (body && isPublishMode) {
      if (isMobile && showFlyout) {
        body.classList.add('disable-scroll');
      } else {
        body.classList.remove('disable-scroll');
      }
    }
  }, [showFlyout, isMobile]);

  useEffect(() => {
    if (showFlyout !== forceShowFlyout) {
      setShowFlyout(forceShowFlyout);
    }
  }, [forceShowFlyout]);

  useEffect(() => {
    if (didMountRef.current) {
      setShowFlyout(true);
    } else {
      didMountRef.current = true;
    }
  }, [welcomeMessage, formSuccessMessage, emailOptInEnabled, emailOptInMessage]);

  const enabledFields =
    notificationPreference === EMAIL ? formFields.filter(emailFields) : formFields;
  const formIdentifier =
    notificationPreference === EMAIL ? MESSAGING_EMAIL : MESSAGING_CONVERSATIONS;

  const reamazeWrap = useRef(null);

  const handleMatchMedia = data => {
    const isMobileDevice = isPublishMode && data ? data.size === 'xs' : props.isMobile;
    setIsMobile(isMobileDevice);
  };

  return (
    <UX2.Element.Block
      category='neutral'
      section={ section }
      style={{
        position: 'fixed',
        right: 'medium',
        bottom: 'medium',
        zIndex: showFlyout ? Z_INDEX_FULL_SCREEN_OVERLAY : Z_INDEX_COOKIE_BANNER - 1,
        width: '65px',
        height: '65px',
        ['@md']: {
          zIndex: showFlyout ? Z_INDEX_STICKY_NAV + 1 : Z_INDEX_COOKIE_BANNER - 1
        }
      }}
    >
      <UX.MatchMedia onChange={ handleMatchMedia } />
      { renderMode !== renderModes.PREVIEW &&
        notificationPreference === REAMAZE &&
        reamazeBrandId && (
        <div ref={ reamazeWrap }>
          <ReamazeWidget
            position={ reamazePosition }
            prompt={ reamazePrompt }
            promptEnabled={ reamazePromptEnabled }
            starter1={ reamazeStarter1 }
            starter2={ reamazeStarter2 }
            starter3={ reamazeStarter3 }
            color={ reamazeThemeColor }
            reamazeBrandId={ reamazeBrandId }
            reamazeWrap={ reamazeWrap }
            reamazeJsSource={ config.reamazeJsSource }
            reamazeCookieJsSource={ config.reamazeCookieJsSource }
            confirmationMessage={ reamazeConfirmationMessage }
            avatar={ reamazeAvatarImage }
            forceShowFlyout={ forceShowFlyout }
            cookieBannerEnabled={ cookieBannerEnabled }
            renderMode={ renderMode }
          />
        </div>
      ) }

      { [EMAIL, CONVERSATIONS].includes(notificationPreference) && (
        <React.Fragment>
          { showFlyout ? (
            <MessageFlyout
              title={ businessName }
              message={ welcomeMessage }
              onClose={ toggleFormVisibility }
            >
              { typeof window !== 'undefined' ? (
                <Suspense
                  fallback={
                    <UX2.Element.Block style={ loaderContainerStyles }>
                      <UX2.Element.Loader size='medium' />
                    </UX2.Element.Block>
                  }
                >
                  <MessageFormLazy
                    locale={ locale }
                    websiteId={ websiteId }
                    accountId={ accountId }
                    domainName={ domainName }
                    staticContent={ staticContent }
                    emailConfirmationMessage={ emailConfirmationMessage }
                    emailOptInEnabled={ emailOptInEnabled }
                    emailOptInMessage={ emailOptInMessage }
                    formSuccessMessage={ formSuccessMessage }
                    formSubmitEndpoint={ config.formSubmitEndpoint }
                    formSubmitHost={ config.formSubmitHost.replace('{{SHA}}', getApiVersion()) }
                    formFields={ enabledFields }
                    formIdentifier={ formIdentifier }
                    recaptchaType={ recaptchaType }
                    recaptchaEnabled={ Boolean(recaptchaType) }
                    isReseller={ isReseller }
                    category='neutral'
                    pageId={ ZERO_ID }
                    widgetId={ id }
                    renderMode={ renderMode }
                    dataAidPrefix={ DATA_AID_PREFIX }
                  />
                </Suspense>
              ) : null }
            </MessageFlyout>
          ) : (
            <Badge />
          ) }

          <UX2.Element.Block
            data-aid={ dataAids.MESSAGING_FAB }
            data-field-id={ !isMobile && !forceShowFlyout ? keys.MESSAGING_ENABLED : null }
            data-edit-interactive='true'
            onClick={ toggleFormVisibility }
            data-traffic2={
              showFlyout
                ? trafficEvents.editor_preview.messaging_fab_close
                : trafficEvents.editor_preview.messaging_fab_open
            }
            data-tccl={ TCCLUtils.getTCCLString({
              eid: showFlyout ? 'ux2.messaging.fab.close' : 'ux2.messaging.fab.open',
              type: 'click'
            }) }
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: showFlyout ? '#555' : 'action',
              boxShadow: '0px 3px 18px rgba(0, 0, 0, 0.25)',
              transform: 'translateZ(0)'
            }}
          >
            <UX2.Element.Icon
              style={{ color: showFlyout ? '#fff' : 'action' }}
              icon={ showFlyout ? 'close' : 'chat' }
              size={ showFlyout ? 34 : 44 }
            />
          </UX2.Element.Block>
        </React.Fragment>
      ) }
    </UX2.Element.Block>
  );
}

MessageInvoker.propTypes = {
  forceShowFlyout: PropTypes.bool,
  businessName: PropTypes.string,
  reamazeBrandId: PropTypes.string,
  welcomeMessage: PropTypes.string,
  formSuccessMessage: PropTypes.string,
  emailOptInMessage: PropTypes.string,
  emailOptInEnabled: PropTypes.bool,
  section: PropTypes.string,
  domainName: PropTypes.string,
  cookieBannerEnabled: PropTypes.bool,
  config: PropTypes.shape({
    formSubmitEndpoint: PropTypes.string,
    formSubmitHost: PropTypes.string,
    reamazeJsSource: PropTypes.string,
    reamazeCookieJsSource: PropTypes.string
  }),
  formFields: PropTypes.array,
  accountId: PropTypes.string.isRequired,
  websiteId: PropTypes.string.isRequired,
  id: PropTypes.string,
  staticContent: PropTypes.object.isRequired,
  locale: PropTypes.string,
  emailConfirmationMessage: PropTypes.string,
  recaptchaType: PropTypes.string,
  isMobile: PropTypes.bool,
  notificationPreference: PropTypes.string,
  isReseller: PropTypes.bool,
  reamazePrompt: PropTypes.string,
  reamazePromptEnabled: PropTypes.bool,
  reamazeStarter1: PropTypes.string,
  reamazeStarter2: PropTypes.string,
  reamazeStarter3: PropTypes.string,
  reamazeThemeColor: PropTypes.string,
  reamazePosition: PropTypes.string,
  reamazeConfirmationMessage: PropTypes.string,
  reamazeAvatarImage: PropTypes.string,
  renderMode: PropTypes.string
};

export default MessageInvoker;
