module.exports = function paymentSuccessEmailTemplate(
  firstName,
  applicationId,
  visaType,
  totalAmount
) {
  return `
  <div style="font-family: 'Arial', sans-serif; background:#eef3f8; padding:25px;">
    <table width="100%" cellspacing="0" cellpadding="0" 
      style="max-width:700px; margin:auto; background:white; 
      border-radius:14px; overflow:hidden; 
      box-shadow:0 6px 25px rgba(0,0,0,0.12);">

      <!-- Header -->
      <tr>
        <td style="
          background: linear-gradient(135deg, #0a8f47 0%, #0cbf60 100%);
          padding:28px 32px; 
          color:white; 
          text-align:center;
        ">
          <h1 style="margin:0; font-size:28px; letter-spacing:0.5px;">
            Payment Successful
          </h1>
          <p style="margin:6px 0 0; font-size:15px; opacity:0.95;">
            Thank you for choosing FlyDenAi Visa Services
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:35px 35px 20px;">

          <h2 style="margin-top:0; color:#222; font-size:22px;">
            Hello ${firstName},
          </h2>

          <p style="font-size:16px; color:#444; line-height:1.7; margin-bottom:25px;">
            We are pleased to inform you that your payment has been 
            <strong style="color:#0a8f47;">successfully completed</strong>.
          </p>

          <!-- Application ID -->
          <div style="
            background:#fff4d6;
            padding:18px 20px;
            border-radius:10px;
            border-left:6px solid #ffae42;
            margin-bottom:28px;
          ">
            <p style="margin:0; font-size:16px; color:#222;">
              <strong style="color:#d35400;">Application ID:</strong>
              <span style="font-size:18px; font-weight:bold; color:#000;">
                ${applicationId}
              </span>
            </p>
            <p style="margin:6px 0 0; font-size:13.5px; color:#555;">
              Please save this for future reference and status checking.
            </p>
          </div>

          <!-- Payment Info Section -->
          <h3 style="color:#0054a6; margin:0 0 12px; font-size:18px;">
            Payment Summary
          </h3>

          <table style="width:100%; border-collapse:collapse; font-size:15px; margin-bottom:28px;">
            <tr>
              <td style="padding:10px 0; color:#666;"><strong>Visa Type:</strong></td>
              <td style="padding:10px 0; color:#111;">${visaType}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; color:#666;"><strong>Paid Amount:</strong></td>
              <td style="padding:10px 0; color:#0a8f47; font-weight:700;">₹${totalAmount}</td>
            </tr>
          </table>

          <!-- Status Block -->
          <div style="
            background:#e9fdf0;
            padding:20px 20px;
            border-radius:10px;
            border-left:6px solid #0a8f47;
            margin-bottom:35px;
            font-size:15px;
            line-height:1.7;
          ">
            ✔ Your payment has been successfully verified.<br/>
            ✔ Your visa application is now <strong>under processing</strong>.<br/>
            ✔ Our expert team will review your documents and 
            <strong style="color:#0a8f47;">proceed with your visa as soon as possible.</strong>
          </div>

          <!-- Buttons -->
          <div style="text-align:center; margin:32px 0;">
            <a href="https://flydenai.eu" 
              style="
                background:#0054a6;
                color:white;
                padding:13px 22px;
                border-radius:7px;
                text-decoration:none;
                font-size:16px;
                font-weight:600;
                margin-right:12px;
                box-shadow:0 3px 12px rgba(0,84,166,0.3);
              "
            >Check Status</a>

            <a href="https://flydenai.eu/contact"
              style="
                background:#f5a623;
                color:white;
                padding:13px 22px;
                border-radius:7px;
                text-decoration:none;
                font-size:16px;
                font-weight:600;
                box-shadow:0 3px 12px rgba(245,166,35,0.35);
              "
            >Contact Support</a>
          </div>

          <p style="font-size:14px; color:#666; line-height:1.7;">
            Thank you for trusting <strong>FlyDenAi Visa Services</strong>.<br/>
            We will continue to update you as your visa progresses.
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="
          background:#f3f6fa;
          padding:20px;
          text-align:center;
          font-size:13px;
          color:#777;
        ">
          © ${new Date().getFullYear()} FlyDenAi • All Rights Reserved<br/>
          Visit: <a href="https://flydenai.eu" style="color:#0054a6; font-weight:600; text-decoration:none;">flydenai.eu</a>
        </td>
      </tr>

    </table>
  </div>
  `;
};
