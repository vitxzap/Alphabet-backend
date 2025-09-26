export function generateVerificationEmailLayout(
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

export function generateOTPCodeLayout(otp: string) {
  const layout = `
    <!DOCTYPE html> <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <meta charset="UTF-8" /> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <!--[if !mso]><!-- --> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!--<![endif]--> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" /> <meta name="x-apple-disable-message-reformatting" /> <link href="https://fonts.googleapis.com/css?family=Inter:ital,wght@0,400;0,500;0,700;0,800" rel="stylesheet" /> <title>Untitled</title> <!-- Made with Postcards Email Builder by Designmodo --> <style> html, body { margin: 0 !important; padding: 0 !important; min-height: 100% !important; width: 100% !important; -webkit-font-smoothing: antialiased; } * { -ms-text-size-adjust: 100%; } #outlook a { padding: 0; } .ReadMsgBody, .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height: 100%; } table, td, th { mso-table-lspace: 0 !important; mso-table-rspace: 0 !important; border-collapse: collapse; } u + .body table, u + .body td, u + .body th { will-change: transform; } body, td, th, p, div, li, a, span { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly; } img { border: 0; outline: 0; line-height: 100%; text-decoration: none; -ms-interpolation-mode: bicubic; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; } .body .pc-project-body { background-color: transparent !important; } @media screen and (-webkit-min-device-pixel-ratio:0) { .pc-img-h-pct { height: auto !important; } } @media (min-width: 621px) { .pc-lg-hide { display: none; } .pc-lg-bg-img-hide { background-image: none !important; } } </style> <style> @media (max-width: 620px) { .pc-project-body {min-width: 0px !important;} .pc-project-container, .pc-component {width: 100% !important;} .pc-sm-hide {display: none !important;} .pc-sm-bg-img-hide {background-image: none !important;} .pc-w620-padding-35-35-35-35 {padding: 35px 35px 35px 35px !important;} } @media (max-width: 520px) { .pc-w520-padding-30-30-30-30 {padding: 30px 30px 30px 30px !important;} } </style> <!--[if !mso]><!-- --> <style> @font-face { font-family: 'Inter'; font-style: normal; font-weight: 800; src: url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYAZFhjg.woff') format('woff'), url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYAZFhiA.woff2') format('woff2'); } @font-face { font-family: 'Inter'; font-style: normal; font-weight: 500; src: url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZFhjg.woff') format('woff'), url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZFhiA.woff2') format('woff2'); } @font-face { font-family: 'Inter'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZFhjg.woff') format('woff'), url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZFhiA.woff2') format('woff2'); } @font-face { font-family: 'Inter'; font-style: normal; font-weight: 700; src: url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZFhjg.woff') format('woff'), url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZFhiA.woff2') format('woff2'); } </style> <!--<![endif]--> <!--[if mso]> <style type="text/css"> .pc-font-alt { font-family: Arial, Helvetica, sans-serif !important; } </style> <![endif]--> <!--[if gte mso 9]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--> </head> <body class="body pc-font-alt" style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; font-weight: normal; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #f4f4f4;" bgcolor="#f4f4f4"> <table class="pc-project-body" style="table-layout: fixed; width: 100%; min-width: 600px; background-color: #f4f4f4;" bgcolor="#f4f4f4" border="0" cellspacing="0" cellpadding="0" role="presentation"> <tr> <td align="center" valign="top" style="width:auto;"> <table class="pc-project-container" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td style="padding: 20px 0px 20px 0px;" align="left" valign="top"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"> <tr> <td valign="top"> <!-- BEGIN MODULE: Header 2 --> <table class="pc-component" style="width: 600px; max-width: 600px;" align="center" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"> <tr> <td valign="top" class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35" style="padding: 40px 40px 40px 40px; height: unset; background-color: #1B1B1B;" bgcolor="#1B1B1B"> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td align="center" valign="top" style="padding: 0px 0px 17px 0px; height: auto;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin-right: auto; margin-left: auto;"> <tr> <td valign="top" align="center"> <div class="pc-font-alt" style="text-decoration: none;"> <div style="font-size:14px;line-height:121%;text-align:center;text-align-last:center;color:#4f18f2;font-family:'Inter', Arial, Helvetica, sans-serif;letter-spacing:-0.2px;font-style:normal;"> <div style="font-family:'Inter', Arial, Helvetica, sans-serif;"><span style="font-family: 'Inter', Arial, Helvetica, sans-serif; font-size: 14px; line-height: 121%; font-weight: 500;">Resum.it</span> </div> </div> </div> </td> </tr> </table> </td> </tr> </table> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td align="center" valign="top" style="padding: 0px 0px 30px 0px; height: auto;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin-right: auto; margin-left: auto;"> <tr> <td valign="top" align="center"> <div class="pc-font-alt" style="text-decoration: none;"> <div style="font-size:36px;line-height:128%;text-align:center;text-align-last:center;color:#ffffff;font-family:'Inter', Arial, Helvetica, sans-serif;letter-spacing:-0.6px;font-style:normal;"> <div style="font-family:'Inter', Arial, Helvetica, sans-serif;"><span style="font-family: 'Inter', Arial, Helvetica, sans-serif; font-size: 36px; line-height: 128%; font-weight: 800;">Verification code</span> </div> </div> </div> </td> </tr> </table> </td> </tr> </table> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td align="center" valign="top" style="padding: 0px 0px 29px 0px; height: auto;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin-right: auto; margin-left: auto;"> <tr> <td valign="top" align="center"> <div class="pc-font-alt" style="text-decoration: none;"> <div style="font-size:18px;line-height:156%;text-align:center;text-align-last:center;color:#ffffff;font-family:'Inter', Arial, Helvetica, sans-serif;letter-spacing:-0.2px;font-style:normal;"> <div style="font-family:'Inter', Arial, Helvetica, sans-serif;"><span style="font-family: 'Inter', Arial, Helvetica, sans-serif; font-size: 18px; line-height: 156%; font-weight: 500;">Here is your </span><span style="font-family: 'Inter', Arial, Helvetica, sans-serif; color: rgb(79, 24, 242); font-size: 18px; line-height: 156%; font-weight: 500;">Resum.it</span><span style="font-family: 'Inter', Arial, Helvetica, sans-serif; font-size: 18px; line-height: 156%; font-weight: 500;"> email verification code. NEVER share this code with anyone.</span> </div> </div> </div> </td> </tr> </table> </td> </tr> </table> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td valign="top"> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 2px solid #D9D9D9;">&nbsp;</td> </tr> </table> </td> </tr> </table> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td align="center" valign="top" style="padding: 32px 0px 0px 0px; height: auto;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="center" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;"> <tr> <td valign="top" align="center"> <div class="pc-font-alt" style="text-decoration: none;"> <div style="font-size:32px;line-height:21px;text-align:center;text-align-last:center;color:#4f18f2;font-family:'Inter', Arial, Helvetica, sans-serif;letter-spacing:-0.2px;font-style:normal;"> <div style="font-family:'Inter', Arial, Helvetica, sans-serif;"><span style="font-family: 'Inter', Arial, Helvetica, sans-serif; font-size: 32px; line-height: 21px; font-weight: 700; text-transform: uppercase;">[code}</span> </div> </div> </div> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <!-- END MODULE: Header 2 --> </td> </tr> <tr> <td> <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td align="center" valign="top" style="padding-top: 20px; padding-bottom: 20px; vertical-align: top;"> <a href="https://postcards.email/?uid=MzI1MTYw&type=footer" target="_blank" style="text-decoration: none; overflow: hidden; border-radius: 2px; display: inline-block;"> <img src="https://cloudfilesdm.com/postcards/promo-footer-dark.jpg" width="198" height="46" alt="Made with (o -) postcards" style="width: 198px; height: auto; margin: 0 auto; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; vertical-align: top;"> </a> <img src="https://api-postcards.designmodo.com/tracking/mail/promo?uid=MzI1MTYw" width="1" height="1" alt="" style="display:none; width: 1px; height: 1px;"> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </body> </html> 
    `;
  return layout;
}
