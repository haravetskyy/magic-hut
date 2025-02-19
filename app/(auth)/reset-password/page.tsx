'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { authClient } from '@/lib/auth-client';
import { resetPasswordSchema, ResetPasswordValues } from '@/lib/models/password-recovery.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ResetPasswordContent = () => {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const token = searchParams.get('token') ?? undefined;

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    const { error } = await authClient.resetPassword({
      token,
      newPassword: data.password,
    });
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Password reset successful. Login to continue.',
      });
      router.push('/sign-in');
    }
  };

  if (error === 'invalid_token' || !token) {
    return (
      <Card className="w-full max-w-md mx-auto border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Invalid Reset Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-md text-center">
            This password reset link is invalid or has expired.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription className="text-md">
          Enter your new password in the field below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="font-bold w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const ResetPassword = () => {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
