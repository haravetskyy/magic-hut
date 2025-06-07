import SignOut from '@/components/sign-out';
import { auth } from '@/lib/auth';
import { redirect } from 'next/dist/client/components/redirect';
import { headers } from 'next/headers';

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/sign-in');
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold">Welcome!</h1>
      <SignOut />
    </div>
  );
};

export default DashboardPage;
