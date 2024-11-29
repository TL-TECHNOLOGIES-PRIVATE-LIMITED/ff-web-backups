import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import { Translate } from '@wsb/vnext-widget-content-translate';
import { string, object } from 'prop-types';
import CenteredNotice from '../../../common/CenteredNotice';
import CheckMailIcon from '../../../common/icons/CheckMail';
import dataAids from '../../../common/dataAids';

const Success = ({ staticContent, email }) => {
  const { Text } = UX2.Element;
  const interpolate = Translate(staticContent);
  const { checkYourEmail } = staticContent;

  return (
    <CenteredNotice
      icon={ <CheckMailIcon /> }
      heading={ checkYourEmail }
      body={
        <Text data-aid={ dataAids.CREATE_ACCOUNT_DESCRIPTION_REND }>
          { interpolate('createAccountSuccessful', { email }) }
        </Text>
      }
    />
  );
};

Success.propTypes = {
  staticContent: object,
  email: string
};

export default Success;
