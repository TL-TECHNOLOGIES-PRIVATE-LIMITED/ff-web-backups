import { hasError } from 'revalidate/assertions';
import PropTypes from 'prop-types';

export const addError = (field, error) => state => ({
  ...state,
  hasErrors: true,
  errors: {
    ...state.errors,
    [field]: error
  }
});

export const clearErrors = state => ({
  ...state,
  hasErrors: false,
  errors: {}
});

export const errorFor = field => state => state.errors && state.errors[field];

export const WithError = ({ field, state, children }) =>
  state.errors && state.errors[field] ? children(state.errors[field]) : null;

export function validateWithChanges(validator, changes = {}) {
  return state => {
    const newState = {
      ...state,
      ...changes
    };

    const result = validator(newState);
    const hasErrors = hasError(result);

    return {
      ...newState,
      hasErrors,
      errors: result
    };
  };
}

WithError.propTypes = {
  field: PropTypes.string,
  state: PropTypes.object,
  children: PropTypes.func
};
