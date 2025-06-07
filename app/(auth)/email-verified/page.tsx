'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { getRedirectUrl } from '@/lib/get-redirect-url';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const EmailVerified = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const redirectUrl = getRedirectUrl();

  useEffect(() => {
    const checkEmailVerification = async () => {
      const { data: session } = await authClient.getSession({
        query: { disableCookieCache: true },
      });

      if (!session?.user?.emailVerified) {
        sessionStorage.removeItem('pendingEmail');
        router.replace('/verify-email');
      }
    };

    checkEmailVerification();
  }, []);

  if (error) {
    return (
      <Card className="mx-auto w-full max-w-md border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">
            Invalid Email Verification Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-md text-center">
            This email verification link is invalid or has expired.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Email Verified!</CardTitle>
        <CardDescription className="text-md text-center">
          Your email has been successfully verified. Click the button below to finish account
          creation.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Button className="w-1/2 rounded-xl py-6 font-bold">
          <Link href={redirectUrl}>Go home</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmailVerified;
