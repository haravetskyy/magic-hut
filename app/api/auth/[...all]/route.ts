import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';
import arcjet, { protectSignup } from '@arcjet/next';
import { NextRequest, NextResponse } from 'next/server';

const aj = arcjet({
  key: process.env.ARCJET_KEY!,

  rules: [
    protectSignup({
      email: {
        mode: 'LIVE',

        block: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS'],
      },

      bots: {
        mode: 'LIVE',

        allow: [],
      },

      rateLimit: {
        mode: 'LIVE',

        interval: '10m',

        max: 500,
      },
    }),
  ],
});

const betterAuthHandler = toNextJsHandler(auth.handler);

const ajProtectedPost = async (req: NextRequest) => {
  const { email } = await req.clone().json();

  const decision = await aj.protect(req, { email });

  if (decision.isDenied()) {
    let message: string;
    if (decision.reason.isEmail()) {
      if (decision.reason.emailTypes.includes('INVALID')) {
        message = 'Invalid format of email.';
      } else if (decision.reason.emailTypes.includes('DISPOSABLE')) {
        message = 'Disposable emails are not allowed.';
      } else if (decision.reason.emailTypes.includes('NO_MX_RECORDS')) {
        message = 'Email does not have MX record.';
      } else {
        message = 'Invalid email.';
      }

      return NextResponse.json({ message, reason: decision.reason }, { status: 400 });
    } else if (decision.reason.isRateLimit()) {
      message = 'You have reached rate limit, try again in 10 minutes.';

      return NextResponse.json({ message, reason: decision.reason }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  } else {
    return betterAuthHandler.POST(req);
  }
};

export { ajProtectedPost as POST };

export const { GET } = betterAuthHandler;
