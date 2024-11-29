import React from 'react';
import PropTypes from 'prop-types';
import { flatten } from 'lodash';
import { UX2 } from '@wsb/guac-widget-core';
import BadgeMask from './BadgeMask';

function Terms({ staticContent }) {
  const replacements = {
    '{privacyPolicy}': [
      staticContent.recaptchaPrivacyPolicy,
      staticContent.recaptchaPrivacyPolicyURL
    ],
    '{termsOfSerivce}': [
      staticContent.recaptchaTermsOfSerivce,
      staticContent.recaptchaTermsOfSerivceURL
    ]
  };
  const { recaptchaDisclosure = '' } = staticContent;
  const textSplitByReplacementWords = Object.keys(replacements).reduce(
    (array, replacement) => {
      const re = new RegExp(`(${replacement})`);
      return flatten(array.map(text => text.split(re)));
    },
    [recaptchaDisclosure]
  );

  return (
    <>
      <UX2.Element.Text>
        { textSplitByReplacementWords.map(value => {
          if (replacements[value]) {
            const [text, url] = replacements[value];
            return (
              <UX2.Element.Link key={ url } href={ url }>
                { text }
              </UX2.Element.Link>
            );
          }

          return <React.Fragment key={ value }>{ value }</React.Fragment>;
        }) }
      </UX2.Element.Text>
      <BadgeMask />
    </>
  );
}

Terms.propTypes = {
  staticContent: PropTypes.object.isRequired
};

export default Terms;
