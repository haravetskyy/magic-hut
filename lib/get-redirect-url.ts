const getRedirectUrl = (): string => {
  const redirectCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('magic-hut.redirectUrl='))
    ?.split('=')[1];

  const redirectUrl = redirectCookie ? decodeURIComponent(redirectCookie) : window.location.origin;

  return redirectUrl;
};

export { getRedirectUrl };
