'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from './ui/button';
import useRedirectUrl from '@/hooks/use-redirect-url';

const GithubButton = () => {
  const redirectUrl = useRedirectUrl();

  const handleGithubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: 'github',
      callbackURL: redirectUrl,
    });
  };

  return (
    <Button className="flex w-full flex-row font-bold" onClick={handleGithubSignIn}>
      <img src="/github-mark-white.svg" className="h-5 w-5" alt="" />
      <div className="flex grow justify-center">Sign in with GitHub</div>
    </Button>
  );
};

export default GithubButton;
