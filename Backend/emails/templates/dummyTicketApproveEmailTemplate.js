module.exports = function dummyTicketApproveEmailTemplate(customer, bookingData, passengers) {
  const { name } = customer;
  const { from, to, date, returnDate, class: travelClass, tripType } = bookingData;

  return `
  <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f2f6fc;padding:25px;">
    
    <table width="100%" cellpadding="0" cellspacing="0"
      style="max-width:750px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;
             box-shadow:0 6px 22px rgba(0,0,0,0.08);">

      <!-- HEADER -->
      <tr>
        <td style="
          background: linear-gradient(135deg,#005eff,#00c6ff);
          padding:30px 20px;
          text-align:center;
          color:white;">
          <h1 style="margin:0;font-size:30px;letter-spacing:0.5px;font-weight:600;">
            ${process.env.COMPANY_NAME}
          </h1>
          <p style="margin-top:6px;font-size:15px;opacity:0.95;">
            Dummy Ticket • Visa • Travel Support Services
          </p>
        </td>
      </tr>

      <!-- BODY -->
      <tr>
        <td style="padding:35px;">

          <h2 style="color:#1a1a1a;margin-top:0;font-size:24px;">
            Hello ${name},  
          </h2>

          <p style="font-size:17px;color:#444;line-height:1.7;">
            🎉 <strong style="color:#0a8f47;">Great news!</strong><br>
            Your <strong>Dummy Ticket (Flight/Hotel)</strong> request has been  
            <strong style="color:#0a8f47;">successfully approved.</strong>
          </p>

          <!-- STATUS BOX -->
          <div style="
            background:#e7fbe9;
            padding:18px 22px;
            border-left:6px solid #0a8f47;
            border-radius:8px;
            margin:22px 0;
            font-size:16px;
            color:#155724;
            line-height:1.6;">
            ✔ Your booking has passed approval checks.<br>
            📩 Final ticket will be delivered within <strong>24 hours</strong> to your Email & WhatsApp.
          </div>

          <!-- TICKET CARD -->
          <div style="
            background:#f7faff;
            border:1px solid #dfe8f5;
            padding:22px;
            border-radius:10px;
            margin:25px 0;
            box-shadow:0 2px 10px rgba(0,0,0,0.05);">
            
            <h3 style="color:#005eff;margin-top:0;font-size:20px;">
              ✈ Booking Summary
            </h3>

            <table style="width:100%;font-size:15px;margin-top:10px;">
              <tr><td style="padding:7px 0;color:#444;"><strong>From:</strong></td><td>${from}</td></tr>
              <tr><td style="padding:7px 0;color:#444;"><strong>To:</strong></td><td>${to}</td></tr>
              <tr><td style="padding:7px 0;color:#444;"><strong>Date:</strong></td><td>${date}</td></tr>
              <tr><td style="padding:7px 0;color:#444;"><strong>Return:</strong></td><td>${returnDate || "N/A"}</td></tr>
              <tr><td style="padding:7px 0;color:#444;"><strong>Trip Type:</strong></td><td>${tripType}</td></tr>
              <tr><td style="padding:7px 0;color:#444;"><strong>Class:</strong></td><td>${travelClass}</td></tr>
            </table>
          </div>

          <!-- PASSENGERS -->
          <h3 style="color:#005eff;margin-top:30px;margin-bottom:10px;font-size:20px;">
            👥 Passenger Details
          </h3>

          <table style="
            width:100%;
            border-collapse:collapse;
            background:#ffffff;
            border-radius:8px;
            margin-bottom:25px;
            overflow:hidden;
            border:1px solid #dfe8f5;">
            
            <thead>
              <tr style="background:#005eff;color:white;">
                <th style="padding:12px;text-align:left;">Name</th>
                <th style="padding:12px;text-align:left;">Nationality</th>
              </tr>
            </thead>

            <tbody>
              ${passengers
                .map(
                  (p) => `
              <tr style="border-bottom:1px solid #e9eef7;">
                <td style="padding:12px;color:#333;">
                  ${p.title} ${p.firstName} ${p.lastName}
                </td>
                <td style="padding:12px;color:#333;">
                  ${p.nationality}
                </td>
              </tr>`
                )
                .join("")}
            </tbody>
          </table>

          <!-- EXTRA INFO -->
          <div style="
            background:#fff4d9;
            border-left:6px solid #ffb300;
            padding:15px 18px;
            border-radius:8px;
            font-size:14.5px;
            color:#7a5200;
            line-height:1.7;">
            ⚠ Please verify all details carefully.<br>
            Any correction requests must be submitted before ticket issuance.
          </div>

          <!-- Thanks Message -->
          <p style="color:#555;font-size:15px;line-height:1.7;margin-top:25px;">
            Thank you for choosing <strong>${process.env.COMPANY_NAME}</strong> for your visa and travel documentation support.<br>
            Our team is dedicated to ensuring you receive fast and reliable service.
          </p>

        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="
          background:#eef2f7;
          padding:25px;
          text-align:center;
          font-size:13px;
          color:#777;
          line-height:1.6;">
          
          <strong>${process.env.COMPANY_NAME}</strong><br>
          Visa • Dummy Ticket • Travel Support • Customer Assistance  
          <br><br>
          © ${new Date().getFullYear()} ${process.env.COMPANY_NAME} • All Rights Reserved
        </td>
      </tr>

    </table>
  </div>
  `;
};
