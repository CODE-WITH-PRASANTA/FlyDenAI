module.exports = function visaApprovedEmailTemplate(
  firstName,
  applicationId,
  visaType
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
          background: linear-gradient(135deg, #0054a6 0%, #0078d7 100%);
          padding:30px 30px; 
          color:white; 
          text-align:center;
        ">
          <h1 style="margin:0; font-size:28px;">
            🎉 Visa Application Approved!
          </h1>
          <p style="margin:8px 0 0; font-size:16px; opacity:0.95;">
            Congratulations from FlyDenAi Visa Services
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:35px;">

          <h2 style="margin-top:0; color:#222; font-size:22px;">
            Hello ${firstName},
          </h2>

          <p style="font-size:16px; color:#444; line-height:1.7;">
            We are excited to inform you that your 
            <strong>${visaType}</strong> visa application has been 
            <strong style="color:#0a8f47;">successfully approved!</strong>
          </p>

          <!-- Application ID Box -->
          <div style="
            background:#fff2cc;
            padding:18px 20px;
            border-radius:10px;
            border-left:6px solid #ffbf00;
            margin:22px 0;
          ">
            <p style="margin:0; font-size:16px;">
              <strong style="color:#ba7b00;">Application ID:</strong>
              <span style="font-size:18px; font-weight:bold; color:#000;">
                ${applicationId}
              </span>
            </p>
            <p style="margin:6px 0 0; font-size:14px; color:#555;">
              Please keep this ID safely for future reference.
            </p>
          </div>

          <!-- Info Block -->
          <div style="
            background:#e9fdf0;
            padding:20px 20px;
            border-radius:10px;
            border-left:6px solid #0a8f47;
            margin-bottom:30px;
            font-size:15px;
            line-height:1.7;
          ">
            ✔ Your visa has been approved.<br/>
            ✔ You will receive your visa within the next 
            <strong style="color:#0a8f47;">24 hours</strong>.<br/>
            ✔ It will be sent to your registered <strong>WhatsApp number</strong> and <strong>Email ID</strong>.<br/>
            ✔ Thank you for choosing FlyDenAi for your visa processing.
          </div>

          <!-- Buttons -->
          <div style="text-align:center; margin:30px 0;">
            <a href="https://flydenai.eu"
              style="
                background:#0054a6;
                color:white;
                padding:13px 24px;
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
                padding:13px 24px;
                border-radius:7px;
                text-decoration:none;
                font-size:16px;
                font-weight:600;
                box-shadow:0 3px 12px rgba(245,166,35,0.35);
              "
            >Contact Support</a>
          </div>

          <p style="font-size:14px; color:#666; line-height:1.7;">
            We appreciate your trust in <strong>FlyDenAi Visa Services</strong>.<br/>
            Wishing you a pleasant journey ahead!
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
          Visit: <a href="https://flydenai.eu"
            style="color:#0054a6; font-weight:600; text-decoration:none;">
          flydenai.eu</a>
        </td>
      </tr>

    </table>
  </div>
  `;
};
