'use client';

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
import { signUpSchema, SignUpValues } from '@/lib/models/auth.model';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (values: SignUpValues) => {
    const { email, password, firstName, lastName } = values;
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name: `${firstName} ${lastName}`,
        callbackURL: '/sign-in',
      },
      {
        onRequest: () => {
          toast({
            title: 'Please, wait...',
          });
        },
        onSuccess: () => {
          toast({}).dismiss();
          form.reset();
          sessionStorage.setItem('pendingEmail', email);
          return redirect(`/verify-email`);
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
  };

  return (
    <Card className="mx-auto w-full max-w-md border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription className="text-md">Create your account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete="on"
            id="signup-form">
            <section className="name flex flex-col justify-between gap-2 md:flex-row">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel htmlFor="firstName">First name</FormLabel>
                    <FormControl>
                      <Input
                        id="firstName"
                        placeholder="John"
                        autoComplete="given-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel htmlFor="lastName">Last name</FormLabel>
                    <FormControl>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        autoComplete="family-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.com"
                      autoComplete="email"
                      {...field}
                    />
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
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-blue-900 font-bold hover:bg-blue-900" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Have an account already?{' '}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
