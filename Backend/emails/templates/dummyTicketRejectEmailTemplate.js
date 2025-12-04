module.exports = function dummyTicketRejectEmailTemplate(customer, reason = "") {
  const { name } = customer;

  return `
  <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f2f3f7;padding:25px;">

    <table width="100%" cellpadding="0" cellspacing="0"
      style="max-width:750px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;
             box-shadow:0 6px 22px rgba(0,0,0,0.10);">

      <!-- HEADER -->
      <tr>
        <td style="
          background: linear-gradient(135deg,#ff3b30,#d63031);
          padding:30px;
          text-align:center;
          color:#fff;">
          
          <h1 style="margin:0;font-size:28px;font-weight:600;letter-spacing:0.3px;">
            ${process.env.COMPANY_NAME}
          </h1>
          <p style="margin-top:6px;font-size:15px;opacity:0.95;">
            Dummy Ticket • Visa Assistance • Travel Support
          </p>
        </td>
      </tr>

      <!-- BODY -->
      <tr>
        <td style="padding:35px;">

          <h2 style="color:#1a1a1a;margin:0 0 15px;font-size:23px;">
            Hello ${name},
          </h2>

          <p style="font-size:17px;color:#444;line-height:1.7;margin-top:0;">
            We regret to inform you that your  
            <strong style="color:#d63031;">Dummy Ticket Request (Flight/Hotel)</strong>  
            could not be approved.
          </p>

          <!-- REJECTION BOX -->
          <div style="
            background:#ffeaea;
            border-left:6px solid #d63031;
            padding:18px 22px;
            border-radius:10px;
            font-size:16px;
            color:#7a1f1f;
            margin:25px 0;
            line-height:1.7;">
            ❌ <strong>Your booking has been rejected.</strong><br>
            ${reason || "The reason may be incorrect information, mismatched details, or internal verification issues."}
          </div>

          <!-- NEXT STEPS BOX -->
          <div style="
            background:#fff8e6;
            border-left:6px solid #ffb300;
            padding:18px 22px;
            border-radius:10px;
            font-size:15px;
            color:#7a5200;
            margin:25px 0;
            line-height:1.7;">
            🔄 <strong>What you can do next:</strong><br>
            • Recheck all submitted details for accuracy<br>
            • Ensure passport, name & travel dates match correctly<br>
            • Try submitting a new request<br>
            • Contact our support team for guidance or clarification
          </div>

          <p style="font-size:15px;color:#555;line-height:1.7;margin-top:20px;">
            We understand this may be disappointing, but our team is here to help you through the process.  
            If you believe this was an error or you need further explanation, please reach out.
          </p>

          <!-- SUPPORT BUTTON -->
          <div style="text-align:center;margin:35px 0;">
            <a href="mailto:${process.env.EMAIL_USER}"
              style="
                background:linear-gradient(135deg,#ff3b30,#b71515);
                color:white;
                padding:14px 25px;
                text-decoration:none;
                font-size:16px;
                border-radius:8px;
                display:inline-block;
                font-weight:500;
                box-shadow:0 4px 12px rgba(214,48,49,0.3);
              ">
              📩 Contact Support
            </a>
          </div>

          <p style="color:#666;font-size:14px;line-height:1.6;margin:0;">
            Thank you for choosing <strong>${process.env.COMPANY_NAME}</strong>.  
            We are committed to providing accurate and reliable travel documentation services.
            <br><br>
            – Team ${process.env.COMPANY_NAME}
          </p>

        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="
          background:#eef1f5;
          padding:22px;
          text-align:center;
          font-size:13px;
          color:#777;
          line-height:1.6;">
          
          <strong>${process.env.COMPANY_NAME}</strong><br>
          Visa • Dummy Ticket • Client Support • Travel Assistance<br><br>
          © ${new Date().getFullYear()} ${process.env.COMPANY_NAME} • All Rights Reserved
        </td>
      </tr>

    </table>
  </div>
  `;
};
