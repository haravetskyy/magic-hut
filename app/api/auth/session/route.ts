'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (session !== null) return NextResponse.json({ session }, { status: 200 });

    return NextResponse.json({ status: 500 });
  } catch (error) {
    console.error('Get session error: ', error);

    return NextResponse.json({ error: 'Get session failed' }, { status: 500 });
  }
}
