'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const VerifyEmail = () => {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      const { data: session } = await authClient.getSession({
        query: { disableCookieCache: true },
      });

      if (session?.user?.emailVerified) {
        router.replace('/dashboard');
      }
    };

    const storedEmail = sessionStorage.getItem('pendingEmail');

    if (!storedEmail) {
      router.replace('/sign-up');
    } else {
      setEmail(storedEmail);
      checkVerificationStatus();
    }
  }, []);

  const handleResendEmail = async () => {
    if (email) {
      await authClient.sendVerificationEmail(
        {
          email,
          callbackURL: '/',
        },
        {
          onSuccess: () => {
            toast({
              title: 'Success!',
              description: 'Please, check you email again.',
            });
          },
          onRequest: () => {
            toast({
              title: 'Please, wait...',
            });
          },
          onError: ctx => {
            toast({
              title: 'Something went wrong',
              description: ctx.error.message ?? 'Please, try again later',
              variant: 'destructive',
            });
          },
        },
      );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Please, verify your email</CardTitle>
        <CardDescription className="text-md text-center">
          We just sent an email to <strong className="text-bold">{email}</strong>. Click the link in
          the email to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Button onClick={handleResendEmail} className="text-md w-1/2 rounded-xl py-6 font-bold">
          Resend email
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyEmail;
