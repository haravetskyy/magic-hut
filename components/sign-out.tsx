'use client';

import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { Button } from './ui/button';

const SignOut = () => {
  const handleSubmit = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          return redirect('/sign-in');
        },
      },
    });
  };

  return (
    <Button className="font-bold" onClick={handleSubmit}>
      Sign Out
    </Button>
  );
};

export default SignOut;
