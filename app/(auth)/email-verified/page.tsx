import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default async function EmailVerifiedPage() {
  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Email Verified!</CardTitle>
        <CardDescription className="text-md text-center">
          Your email has been successfully verified. Click the button below to
          finish account creation.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Button className="py-6 rounded-xl  font-bold w-1/2">
          <Link href="/dashboard">Go home</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
