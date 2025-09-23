export default function generateVerificationEmailLayout(
  url: string,
  user?: string,
  callback?: string,
) {
  const layout = `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
    <style>
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        /* Main styles */
        body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        .header {
            background-color: #6366f1;
            padding: 40px 30px;
            text-align: center;
        }
        
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        
        .content h2 {
            color: #333333;
            margin: 0 0 20px 0;
            font-size: 24px;
            font-weight: normal;
        }
        
        .content p {
            color: #666666;
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 25px 0;
        }
        
        .verify-button {
            display: inline-block;
            background-color: #6366f1;
            color: #ffffff !important;
            text-decoration: none;
            padding: 15px 40px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0;
            transition: background-color 0.3s ease;
        }
        
        .verify-button:hover {
            background-color: #797bf1ff;
        }
        
        .alternative-link {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 20px;
            margin: 30px 0;
        }
        
        .alternative-link p {
            margin: 0 0 10px 0;
            font-size: 14px;
        }
        
        .link-text {
            word-break: break-all;
            color: #6366f1;
            font-size: 14px;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #dee2e6;
        }
        
        .footer p {
            color: #6c757d;
            font-size: 14px;
            margin: 0 0 10px 0;
        }
        
        .security-notice {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
        }
        
        .security-notice p {
            color: #856404;
            font-size: 14px;
            margin: 0;
        }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            
            .header, .content, .footer {
                padding: 20px !important;
            }
            
            .header h1 {
                font-size: 24px !important;
            }
            
            .content h2 {
                font-size: 20px !important;
            }
            
            .verify-button {
                padding: 12px 30px !important;
                font-size: 14px !important;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td>
                <div class="email-container">
                    <!-- Header -->
                    <div class="header">
                        <h1>Welcome to Resum.it!</h1>
                    </div>
                    
                    <!-- Main Content -->
                    <div class="content">
                        <h2>Please verify your email address</h2>
                        <p>Thank you for signing up! To complete your registration and start using your account, please verify your email address by clicking the button below.</p>
                        
                        <!-- Verify Button -->
                        <a href="${url}" class="verify-button">Verify Email Address</a>
                        
                        <!-- Security Notice -->
                        <div class="security-notice">
                            <p><strong>Security Notice:</strong> This verification link will expire in 24 hours for your security.</p>
                        </div>
                        
                        <!-- Alternative Link Section -->
                        <div class="alternative-link">
                            <p><strong>Can't click the button?</strong> Copy and paste this link into your browser:</p>
                            <div class="link-text">${url}</div>
                        </div>
                        
                        <p>If you didn't create an account with us, please ignore this email or contact our support team if you have any concerns.</p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>`;
  return layout;
}
