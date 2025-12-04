module.exports = function dummyTicketPaymentSuccessTemplate(
  customer,
  bookingData,
  passengers,
  priceDetails
) {
  const { name } = customer;
  const {
    from,
    to,
    date,
    returnDate,
    class: travelClass,
    tripType,
    travellers,
  } = bookingData;

  return `
  <div style="font-family: 'Arial', sans-serif; background:#eef3ff; padding:25px;">
    <table width="100%" cellspacing="0" cellpadding="0" style="
      max-width:720px; 
      margin:auto; 
      background:white; 
      border-radius:14px; 
      overflow:hidden; 
      box-shadow:0 6px 25px rgba(0,0,0,0.1);
    ">

      <!-- HEADER -->
      <tr>
        <td style="
          background:linear-gradient(135deg, #004c97, #007bff);
          padding:30px;
          text-align:center;
          color:white;
        ">
          <h1 style="margin:0; font-size:28px; font-weight:800;">
            ${process.env.COMPANY_NAME}
          </h1>
          <p style="margin-top:6px; opacity:0.9; font-size:15px;">
            Your trusted travel partner
          </p>
        </td>
      </tr>

      <!-- BODY -->
      <tr>
        <td style="padding:30px;">

          <h2 style="color:#222; margin-top:0;">Hello ${name},</h2>
          <p style="font-size:16px; color:#444; line-height:1.7;">
            We're excited to inform you that your payment for the 
            <strong style="color:#0a8f47;">Dummy Ticket / Flight / Hotel Booking</strong>  
            has been <strong style="color:#0a8f47;">successfully received</strong>.
          </p>

          <!-- SUCCESS BOX -->
          <div style="
            background:#e9fff0;
            padding:16px 20px;
            border-left:5px solid #12a74f;
            border-radius:10px;
            margin:20px 0;
            font-size:15px;
            color:#0a8f47;
            font-weight:600;
          ">
            🎉 Payment Successful!  
            You will receive your ticket/booking confirmation within 
            <strong>24 hours</strong>.
          </div>

          <!-- BOOKING DETAILS -->
          <h3 style="color:#004c97; margin-bottom:12px;">Booking Information</h3>
          <table style="width:100%; border-collapse:collapse; font-size:15px; margin-bottom:25px;">
            <tr>
              <td style="padding:8px 0; color:#555;"><strong>From:</strong></td>
              <td style="padding:8px 0;">${from}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#555;"><strong>To:</strong></td>
              <td style="padding:8px 0;">${to}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#555;"><strong>Departure:</strong></td>
              <td style="padding:8px 0;">${date}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#555;"><strong>Return:</strong></td>
              <td style="padding:8px 0;">${returnDate || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#555;"><strong>Travel Class:</strong></td>
              <td style="padding:8px 0;">${travelClass}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#555;"><strong>Trip Type:</strong></td>
              <td style="padding:8px 0;">${tripType}</td>
            </tr>
          </table>

          <!-- PASSENGERS -->
          <h3 style="color:#004c97; margin-bottom:12px;">Passenger Details</h3>
          <table style="width:100%; border-collapse:collapse; background:#f7faff; border-radius:10px; overflow:hidden;">
            <thead>
              <tr style="background:#004c97; color:white;">
                <th style="padding:10px;">Name</th>
                <th style="padding:10px;">Nationality</th>
              </tr>
            </thead>
            <tbody>
              ${passengers
                .map(
                  (p) => `
              <tr style="border-bottom:1px solid #ddd;">
                <td style="padding:10px;">${p.title} ${p.firstName} ${p.lastName}</td>
                <td style="padding:10px;">${p.nationality}</td>
              </tr>`
                )
                .join("")}
            </tbody>
          </table>

          <br/>

          <!-- PAYMENT SUMMARY -->
          <h3 style="color:#004c97;">Payment Summary</h3>
          <table style="width:100%; border-collapse:collapse; font-size:15px; margin-bottom:25px;">
            <tr>
              <td style="padding:8px 0; color:#555;"><strong>Base Amount:</strong></td>
              <td style="padding:8px 0;">₹${priceDetails.baseAmount}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#555;"><strong>Discount:</strong></td>
              <td style="padding:8px 0;">-₹${priceDetails.discountAmount}</td>
            </tr>
            <tr style="background:#e9fff0;">
              <td style="padding:10px; color:#0a8f47; font-weight:bold;"><strong>Total Paid:</strong></td>
              <td style="padding:10px; color:#0a8f47; font-weight:bold;">₹${priceDetails.finalAmount}</td>
            </tr>
          </table>

          <!-- FOOT MESSAGE -->
          <p style="font-size:15px; color:#444; line-height:1.7;">
            Thank you for trusting <strong>${process.env.COMPANY_NAME}</strong> for your travel needs.
            Our team is now processing your request and will send your ticket/confirmation shortly.
            <br/><br/>
            If you need urgent support, feel free to contact us anytime.
          </p>

          <!-- CTA BUTTONS -->
          <div style="text-align:center; margin:25px 0;">
            <a href="${process.env.FRONTEND_URL}"
              style="
                background:#004c97;
                color:white;
                padding:12px 20px;
                border-radius:6px;
                text-decoration:none;
                font-size:16px;
                margin-right:10px;
              "
            >Visit Dashboard</a>

            <a href="mailto:${process.env.EMAIL_USER}"
              style="
                background:#f5a623;
                color:white;
                padding:12px 20px;
                border-radius:6px;
                text-decoration:none;
                font-size:16px;
              "
            >Contact Support</a>
          </div>

        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="
          background:#f0f4fa; 
          padding:18px; 
          text-align:center; 
          font-size:13px; 
          color:#666;
        ">
          © ${new Date().getFullYear()} ${process.env.COMPANY_NAME} • All Rights Reserved  
        </td>
      </tr>

    </table>
  </div>
  `;
};
