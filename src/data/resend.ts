import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationLinkEmail = async (
  email: string,
  token: string
) => {
  const verificationLink = `http://localhost:3000/auth/new-verififcation?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Ani <onboarding@resend.dev>",
    to: email,
    subject: "Email Verification",
    html: `<p>Click <a href=${verificationLink}>here</a> to verify your email </p>`,
  });

  if (error) return null;

  return true;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const verificationLink = `http://localhost:3000/auth/new-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Ani <onboarding@resend.dev>",
    to: email,
    subject: "Reset your Password",
    html: `<p>Click <a href=${verificationLink}>here</a> to reset your password </p>`,
  });

  if (error) return null;

  return true;
};
