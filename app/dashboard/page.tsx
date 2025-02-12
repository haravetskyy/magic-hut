import { auth } from '@/lib/auth';
import { redirect } from 'next/dist/server/api-utils';
import { headers } from 'next/headers';

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/');
  }

  const user = session?.user;

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <h2>You are in the system!</h2>
      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
    </div>
  );
};

export default DashboardPage;
