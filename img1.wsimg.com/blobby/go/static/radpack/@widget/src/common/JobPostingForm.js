import React from 'react';
import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';
import InnerForm from '@wsb/guac-widget-shared/lib/components/Form';

import DataAid from '../constants/data-aids';
import EditableFields from '../constants/editableFields';
import routes from '../constants/routes';

const JobPostingForm = ({
  category,
  section,
  formTitle,
  containerStyle,
  titleStyle,
  fullWidth,
  useColumnLayout,
  ...props
}) => {
  return (
    <UX2.Element.Block
      category={ category }
      section={ section }
      data-aid={ DataAid.JOB_POSTING_FORM_CONTAINER_REND }
      style={{ ...containerStyle }}
    >
      <InnerForm
        useCloseButton={ false }
        title={
          <UX2.Element.Heading.Minor
            style={{ marginBottom: 'medium', ...titleStyle }}
            data-aid={ DataAid.JOB_POSTING_FORM_TITLE_REND }
            data-route={ EditableFields.FORM_TITLE }
            data-field-route={ routes.FORM_PIVOT }
            children={ formTitle }
          />
        }
        fullWidth={ fullWidth }
        dataAidPrefix='JOB_POSTING'
        formIdentifier='JOB_POSTING'
        useColumnLayout={ useColumnLayout }
        category={ category }
        { ...props }
      />
    </UX2.Element.Block>
  );
};

JobPostingForm.propTypes = {
  formTitle: PropTypes.string,
  category: PropTypes.string,
  section: PropTypes.string,
  containerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  fullWidth: PropTypes.bool,
  ...InnerForm.propTypes
};

export default JobPostingForm;
