const EMAIL_REGEX =
  /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const queryStringRegex = function (key) {
  return (
    '^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$'
  );
};

export { queryStringRegex, EMAIL_REGEX };
