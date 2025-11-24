export function generateOTPCodeLayout(otp: string) {
  const layout = `
    <html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <title>Verification Code</title>
  </head>
  <body style="background-color:#f3f4f6; font-family:Arial, sans-serif; padding:40px; margin:0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); padding:40px;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="margin-bottom:32px;">
                <h1 style="font-size:28px; font-weight:bold; color:#111827; margin:0 0 16px 0;">One-time Password Code</h1>
                <p style="font-size:16px; color:#4b5563; margin:0;">Hello! here's your verification code!</p>
              </td>
            </tr>

            <!-- OTP Code Display -->
            <tr>
              <td align="center" style="margin-bottom:32px;">
                <div style="background-color:#f9fafb; border:2px dashed #d1d5db; border-radius:12px; padding:32px; margin-bottom:24px;">
                  <p style="font-size:48px; font-weight:bold; color:#111827; margin:0; letter-spacing:8px; font-family:monospace;">
                    ${otp}
                  </p>
                </div>
                <p style="font-size:14px; color:#6b7280; margin:0;">This code will expire in 5 minutes</p>
              </td>
            </tr>

            <!-- Instructions -->
            <tr>
              <td style="margin-bottom:32px;">
                <p style="font-size:16px; color:#374151; margin:0 0 16px 0;">
                  Enter this code in the verification field to complete the action.
                </p>
                <p style="font-size:16px; color:#374151; margin:0;">
                  If you didn't request this code, please ignore this email or contact our support team if you have concerns.
                </p>
              </td>
            </tr>

            <!-- Security Notice -->
            <tr>
              <td style="background-color:#fffbeb; border-left:4px solid #fbbf24; padding:16px; margin-bottom:32px; border-radius:0 4px 4px 0;">
                <p style="font-size:14px; color:#92400e; font-weight:600; margin:0 0 8px 0;">
                  Security Notice
                </p>
                <p style="font-size:14px; color:#b45309; margin:0;">
                  Never share this code with anyone. Our team will never ask for your verification code.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="border-top:1px solid #e5e7eb; padding-top:24px; text-align:center;">
                <p style="font-size:12px; color:#6b7280; margin:0 0 8px 0;">
                  This is an automated message, please do not reply to this email.
                </p>
                <p style="font-size:12px; color:#6b7280; margin:0 0 8px 0;">
                  © 2025 Synapse. All rights reserved.
                </p>
                <p style="font-size:12px; color:#6b7280; margin:0;">
                  000 Synapse, São Paulo, SP 00000-00, Brazil
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
  return layout;
}
