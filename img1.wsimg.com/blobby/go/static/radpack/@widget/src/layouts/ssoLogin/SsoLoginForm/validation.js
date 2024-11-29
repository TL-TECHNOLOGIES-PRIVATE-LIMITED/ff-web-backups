import { EMAIL_REGEX } from '../../../common/constants/regex';
import { matchesPattern, combineValidators, composeValidators, isRequired } from 'revalidate';

export const password = isRequired({ message: 'passwordCannotBeBlank' });
const emailRequired = isRequired({ message: 'emailValidationErrorMessage' });
const emailFormat = matchesPattern(EMAIL_REGEX)({ message: 'emailValidationErrorMessage' });

export const email = composeValidators(emailRequired, emailFormat)('email');

export const validate = combineValidators({
  password,
  email
});

export const validateRequestReset = combineValidators({
  email
});
