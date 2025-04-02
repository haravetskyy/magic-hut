'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await auth.api.signOut({ headers: await headers() });

    return NextResponse.json({ message: 'Signed out successfully' }, { status: 200 });
  } catch (error) {
    console.error('Sign out error: ', error);

    return NextResponse.json({ error: 'Sign out failed' }, { status: 500 });
  }
}
