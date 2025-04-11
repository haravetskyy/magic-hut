'use client';

import { useState, useEffect } from 'react';
import { getRedirectUrl } from '@/lib/get-redirect-url';

const useRedirectUrl = (defaultUrl: string = window.location.origin): string => {
  const [redirectUrl, setRedirectUrl] = useState<string>(defaultUrl);

  useEffect(() => {
    const urlFromCookie = getRedirectUrl();
    setRedirectUrl(urlFromCookie);
  }, [defaultUrl]);

  return redirectUrl;
};

export default useRedirectUrl;
