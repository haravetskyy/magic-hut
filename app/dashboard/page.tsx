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
    <div className="w-full h-full flex gap-2 justify-center items-center flex-col">
      <h1 className="font-bold text-2xl">Welcome!</h1>
      <SignOut />
    </div>
  );
};

export default DashboardPage;
