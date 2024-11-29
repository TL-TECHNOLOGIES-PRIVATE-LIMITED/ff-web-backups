import { isRequired, combineValidators, composeValidators, matchesPattern } from 'revalidate';
import { EMAIL_REGEX } from '../../../common/constants/regex';

export const validate = combineValidators({
  nameFirst: isRequired({ message: 'firstNameValidationErrorMessage' }),
  nameLast: isRequired({ message: 'lastNameValidationErrorMessage' }),
  email: composeValidators(
    isRequired({ message: 'emailValidationErrorMessage' }),
    matchesPattern(EMAIL_REGEX)({ message: 'emailValidationErrorMessage' })
  )('email')
});
