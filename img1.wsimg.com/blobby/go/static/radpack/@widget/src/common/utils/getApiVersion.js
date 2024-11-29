const versionRegexes = {
  contactApi: /[?&]contactApiVersion=([^&]*)/
};

export default function getApiVersion(versionKey = 'contactApi') {
  if (typeof window === 'undefined') {
    return '';
  }
  const {
    location: { search = '' }
  } = window || {};
  const versionRegex = versionRegexes[versionKey];
  const match = versionRegex.exec(search);
  return match && match[1] ? `${match[1]}.` : '';
}
