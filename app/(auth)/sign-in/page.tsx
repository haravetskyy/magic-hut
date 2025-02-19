'use client';

import GithubButton from '@/components/github-button';
import GoogleButton from '@/components/google-button';
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
import { signInSchema, SignInValues } from '@/lib/models/auth.model';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleCredentialSignIn = async (values: SignInValues) => {
    const { email, password } = values;
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: '/dashboard',
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
            description: ctx.error.message,
            variant: 'destructive',
          });
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription className="text-md">
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCredentialSignIn)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@mail.com" {...field} />
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
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-green-900 hover:bg-green-900 font-bold w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <section className="flex flex-col items-center gap-2">
          <div className="flex flex-row gap-2 items-center justify-center w-full mt-2">
            <hr className="w-full border-t border-t-gray-200" />
            <p className="text-gray-500">or</p>
            <hr className="w-full  border-t border-t-gray-200" />
          </div>

          <GithubButton />
          <GoogleButton />
        </section>
      </CardContent>
      <CardFooter className="flex justify-center flex-col">
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
