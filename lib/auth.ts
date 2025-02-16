import sendEmail from '@/actions/email';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { openAPI } from 'better-auth/plugins';
import prisma from './prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        text: `Click the link to reset your password: ${url}`,
        html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Password Reset</title>
                  <style>
                    body, table, td, a {
                      font-family: Arial, sans-serif;
                    }

                    .container {
                      background-color: #ffffff;
                      color: #333333;
                    }

                    .button {
                      display: inline-block;
                      font-size: 16px;
                      color: #ffffff !important;
                      text-decoration: none;
                      background-color: #000000;
                      padding: 14px 24px;
                      border-radius: 10px;
                      border: 2px solid #000000;
                      font-weight: bold;
                    }

                    @media (prefers-color-scheme: dark) {
                      body {
                        background-color: #121212 !important;
                        color: #ffffff !important; 
                      }
                      .container {
                        background: #1e1e1e !important;
                        color: #ffffff !important; 
                      }
                      h1, p {
                        color: #ffffff !important; 
                      }
                      .button {
                        background-color: #ffffff !important;
                        color: #000000 !important; 
                        border: 2px solid #ffffff !important;
                      }
                    }

                    @media screen and (max-width: 600px) {
                      .container {
                        width: 100% !important;
                        padding: 10px !important;
                      }
                      .button {
                        padding: 12px 18px !important;
                        font-size: 14px !important;
                      }
                    }
                  </style>
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td align="center" style="padding: 20px 0">
                        <table role="presentation" width="90%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="background: #ffffff; padding: 20px; border-radius: 10px;" class="container">
                          <tr>
                            <td align="center">
                              <h1 style="margin: 0 0 10px 0; font-size: 24px; color: #333" class="text">Hello, ${user.name}</h1>
                              <p style="margin: 0 0 20px 0; font-size: 16px; color: #555" class="text">
                                To reset your password, please click the button below.
                              </p>
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 20px 0">
                                <tr>
                                  <td align="center">
                                    <a href="${url}" target="_blank" class="button">
                                      Reset Password
                                    </a>
                                  </td>
                                </tr>
                              </table>
                              <p style="font-size: 14px; color: #777" class="text">
                                If you didn’t request this, you can safely ignore this email.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
              </html>
        `,
      });
    },
  },
  plugins: [openAPI()],
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        text: `Click the link to verify your email: ${verificationUrl}`,
        html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Verify Email</title>
                  <style>
                    body, table, td, a {
                      font-family: Arial, sans-serif;
                    }

                    .container {
                      background-color: #ffffff;
                      color: #333333;
                    }

                    .button {
                      display: inline-block;
                      font-size: 16px;
                      color: #ffffff !important;
                      text-decoration: none;
                      background-color: #000000;
                      padding: 14px 24px;
                      border-radius: 10px;
                      border: 2px solid #000000;
                      font-weight: bold;
                    }

                    @media (prefers-color-scheme: dark) {
                      body {
                        background-color: #121212 !important;
                        color: #ffffff !important; 
                      }
                      .container {
                        background: #1e1e1e !important;
                        color: #ffffff !important; 
                      }
                      h1, p {
                        color: #ffffff !important; 
                      }
                      .button {
                        background-color: #ffffff !important;
                        color: #000000 !important; 
                        border: 2px solid #ffffff !important;
                      }
                    }

                    @media screen and (max-width: 600px) {
                      .container {
                        width: 100% !important;
                        padding: 10px !important;
                      }
                      .button {
                        padding: 12px 18px !important;
                        font-size: 14px !important;
                      }
                    }
                  </style>
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td align="center" style="padding: 20px 0">
                        <table role="presentation" width="90%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="background: #ffffff; padding: 20px; border-radius: 10px;" class="container">
                          <tr>
                            <td align="center">
                              <h1 style="margin: 0 0 10px 0; font-size: 24px; color: #333" class="text">Hello, ${user.name}</h1>
                              <p style="margin: 0 0 20px 0; font-size: 16px; color: #555" class="text">
                                To confirm your account creation request, please click the button below.
                              </p>
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 20px 0">
                                <tr>
                                  <td align="center">
                                    <a href="${verificationUrl}" target="_blank" class="button">
                                      Verify Email
                                    </a>
                                  </td>
                                </tr>
                              </table>
                              <p style="font-size: 14px; color: #777" class="text">
                                If you didn’t request this, you can safely ignore this email.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
              </html>
`,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
