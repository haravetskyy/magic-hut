'use client';

import GithubButton from '@/components/github-button';
import GoogleButton from '@/components/google-button';
import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { authClient } from '@/lib/auth-client';
import { getRedirectUrl } from '@/lib/get-redirect-url';
import { signInSchema, SignInValues } from '@/lib/models/auth.model';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCredentialSignIn = async (values: SignInValues) => {
    const redirectUrl = getRedirectUrl();

    const { email, password } = values;

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: redirectUrl,
      },
      {
        onRequest: () => {
          toast({
            title: 'Please, wait...',
          });
        },
        onSuccess: () => {
          toast({
            title: 'Success!',
          });
          form.reset();
        },
        onError: ctx => {
          toast({
            title: 'Something went wrong',
            description: ctx.error.message || 'Please, try again',
            variant: 'destructive',
          });
        },
      },
    );
  };

  return (
    <Card className="mx-auto w-full max-w-md border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription className="text-md">
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCredentialSignIn)}
            className="space-y-4"
            autoComplete="on">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@mail.com" {...field} autoComplete="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-green-900 font-bold hover:bg-green-900" type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <section className="flex flex-col items-center gap-2">
          <div className="mt-2 flex w-full flex-row items-center justify-center gap-2">
            <hr className="w-full border-t border-t-gray-200" />
            <p className="text-gray-500">or</p>
            <hr className="w-full border-t border-t-gray-200" />
          </div>

          <GithubButton />
          <GoogleButton />
        </section>
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account yet?{' '}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-muted-foreground">
          <Link href="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
