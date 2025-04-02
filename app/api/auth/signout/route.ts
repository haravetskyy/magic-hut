'use server';

import { authClient } from '@/lib/auth-client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await authClient.signOut();

    return NextResponse.json({ message: 'Signed out successfully' }, { status: 200 });
  } catch (error) {
    console.error('Sign out error: ', error);

    return NextResponse.json({ error: 'Sign out failed' }, { status: 500 });
  }
}
