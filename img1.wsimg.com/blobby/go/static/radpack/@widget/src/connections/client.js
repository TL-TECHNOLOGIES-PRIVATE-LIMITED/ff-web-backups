import widgetFetch from '../common/helpers/widget-fetch';

function getContact(options) {
  return widgetFetch('v2/crm/contacts/self', options);
}

function getSettings(options) {
  return widgetFetch('v2/crm/contacts/settings', options);
}

function sendMembershipEmail(options, data) {
  return widgetFetch('v2/crm/contacts/sendMemberEmail', {
    ...options,
    method: 'POST',
    data
  });
}

function batchCreateActivities(options, data) {
  return widgetFetch('v2/crm/contacts/activities', {
    ...options,
    method: 'POST',
    data
  });
}

function requestPasswordReset(options, data) {
  return widgetFetch('v2/crm/contacts/requestPasswordReset', {
    ...options,
    method: 'POST',
    data
  });
}

export default function createClient(baseOptions) {
  return {
    getContact: getContact.bind(null, baseOptions),
    getSettings: getSettings.bind(null, baseOptions),
    batchCreateActivities: batchCreateActivities.bind(null, baseOptions),
    requestPasswordReset: requestPasswordReset.bind(null, baseOptions),
    sendMembershipEmail: sendMembershipEmail.bind(null, baseOptions)
  };
}
