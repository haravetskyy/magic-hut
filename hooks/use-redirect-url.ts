'use client';

import { useState, useEffect } from 'react';

const useRedirectUrl = (defaultUrl: string = 'http://localhost:10000/'): string => {
  const [redirectUrl, setRedirectUrl] = useState<string>(defaultUrl);

  useEffect(() => {
    const redirectCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('magic-hut.redirectUrl='))
      ?.split('=')[1];
    setRedirectUrl(redirectCookie ? decodeURIComponent(redirectCookie) : defaultUrl);
  }, [defaultUrl]);

  return redirectUrl;
};

export default useRedirectUrl;
