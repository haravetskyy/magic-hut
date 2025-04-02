'use server';

import { authClient } from '@/lib/auth-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await authClient.getSession();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Get session error: ', error);

    return NextResponse.json({ error: 'Get session failed' }, { status: 500 });
  }
}
