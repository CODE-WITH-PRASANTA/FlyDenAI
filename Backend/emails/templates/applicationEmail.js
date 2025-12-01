module.exports = function applicationEmailTemplate(
  firstName,
  applicationId,
  visaType,
  onwardDate,
  returnDate,
  travellers
) {
  return `
  <div style="font-family: 'Arial', sans-serif; background:#f4f7fa; padding:20px;">
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width:700px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:#0054a6; padding:25px 30px; color:white; text-align:center;">
          <h1 style="margin:0; font-size:26px;">FlyDenAi Visa Services</h1>
          <p style="margin:5px 0 0; font-size:14px; opacity:0.9;">Your trusted partner for global travel</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px 30px 10px;">

          <h2 style="margin-top:0; color:#222;">Hello ${firstName},</h2>
          <p style="font-size:16px; color:#444; line-height:1.6;">
            Your visa application has been <strong style="color:#0a8f47;">successfully created</strong> with 
            <strong>FlyDenAi</strong>.
          </p>

          <!-- Success Message Block -->
          <div style="
            background:#e8f9ef; 
            padding:15px 20px; 
            border-left:5px solid #0a8f47; 
            border-radius:8px; 
            margin:20px 0; 
            font-size:15px;
          ">
            🎉 <strong>Your Application has been Saved Successfully!</strong><br />
            We are now verifying your submitted details.
          </div>

          <!-- Highlight Application ID -->
          <div style="
            background:#fff7e6;
            padding:18px;
            border-radius:8px;
            border-left:5px solid #f5a623;
            margin-bottom:25px;
          ">
            <p style="margin:0; font-size:15px;">
              <strong style="color:#d35400;">Application ID:</strong>
              <span style="font-size:17px; font-weight:bold; color:#111;">
                ${applicationId}
              </span>
            </p>
            <p style="margin:8px 0 0; font-size:14px; color:#555;">
              Please keep this ID safe. You can check your visa status anytime on our website using this Application ID.
            </p>
          </div>

          <!-- Application Details -->
          <h3 style="color:#0054a6; margin-bottom:10px;">Application Details</h3>
          <table style="width:100%; border-collapse:collapse; font-size:15px; margin-bottom:25px;">
            <tr>
              <td style="padding:8px 0; color:#444;"><strong>Visa Type:</strong></td>
              <td style="padding:8px 0; color:#111;">${visaType}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#444;"><strong>Onward Date:</strong></td>
              <td style="padding:8px 0; color:#111;">${onwardDate}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#444;"><strong>Return Date:</strong></td>
              <td style="padding:8px 0; color:#111;">${returnDate}</td>
            </tr>
          </table>

          <!-- Traveller Details -->
          <h3 style="color:#0054a6; margin-bottom:10px;">Traveller Details</h3>

          <table style="width:100%; border-collapse:collapse; background:#f9fbff; border-radius:8px; overflow:hidden;">
            <thead>
              <tr style="background:#0054a6; color:white; text-align:left;">
                <th style="padding:10px;">Name</th>
                <th style="padding:10px;">Email</th>
                <th style="padding:10px;">Passport No</th>
                <th style="padding:10px;">Nationality</th>
              </tr>
            </thead>
            <tbody>
              ${travellers
                ?.map(
                  (t) => `
                <tr style="border-bottom:1px solid #ddd;">
                  <td style="padding:10px;">${t.title} ${t.firstName} ${t.lastName}</td>
                  <td style="padding:10px;">${t.email ?? "N/A"}</td>
                  <td style="padding:10px;">${t.passportNo ?? "N/A"}</td>
                  <td style="padding:10px;">${t.nationality ?? "N/A"}</td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>

          <br>

          <!-- Buttons -->
          <div style="text-align:center; margin:30px 0;">
            <a href="https://flydenai.eu" 
              style="
                background:#0054a6; 
                color:white; 
                padding:12px 20px; 
                border-radius:6px; 
                text-decoration:none; 
                font-size:16px;
                margin-right:10px;
              "
            >Check Status</a>

            <a href="https://flydenai.eu/contact"
              style="
                background:#f5a623; 
                color:white; 
                padding:12px 20px; 
                border-radius:6px; 
                text-decoration:none; 
                font-size:16px;
              "
            >Contact Us</a>
          </div>

          <p style="font-size:14px; color:#666; line-height:1.6;">
            Thank you for choosing <strong>FlyDenAi Visa Services</strong>.<br/>
            We will keep you updated throughout your visa process.
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f0f4f8; padding:18px; text-align:center; font-size:13px; color:#666;">
          © ${new Date().getFullYear()} FlyDenAi • All Rights Reserved<br/>
          Visit us: <a href="https://flydenai.eu" style="color:#0054a6; text-decoration:none;">flydenai.eu</a>
        </td>
      </tr>

    </table>
  </div>
  `;
};
