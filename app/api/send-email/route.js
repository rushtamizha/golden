import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const data = await request.json();
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    // Generate Google Static Maps URL for HTML preview
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x250&path=color:0xdc2626|weight:4|enc:&markers=color:blue|label:P|${encodeURIComponent(
      data.pickupAddress
    )}&markers=color:green|label:D|${encodeURIComponent(
      data.dropAddress
    )}&key=${googleApiKey}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "eswaran17phu012@gmail.com",
        pass: "fear umjx ajlx gdby",
      },
    });

    const mailOptions = {
      from: '"Cab Dispatch Engine" <eswaran17phu012@gmail.com>',
      to: "eswaran17phu012@gmail.com",
      subject: `🚨 NEW BOOKING: ${data.fullName || "Customer"} (${data.tripType} - ${data.stateContext})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">New Ride Dispatch</h2>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #94a3b8;">${data.stateContext} Operating Zone</p>
          </div>

          <div style="padding: 20px;">
            <!-- Customer Summary -->
            <table style="width: 100%; margin-bottom: 20px; font-size: 14px; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #64748b;"><strong>Customer Name:</strong></td><td style="text-align: right; color: #0f172a;">${data.fullName || "Not Provided"}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;"><strong>Mobile Number:</strong></td><td style="text-align: right; color: #0f172a;">${data.mobileNumber || "Not Provided"}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;"><strong>Trip Type:</strong></td><td style="text-align: right; color: #0f172a;">${data.tripType}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;"><strong>Vehicle:</strong></td><td style="text-align: right; color: #0f172a;">${data.vehicleName}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;"><strong>Passengers:</strong></td><td style="text-align: right; color: #0f172a;">${data.passengers} Pax</td></tr>
            </table>

            <!-- Static Map Image Preview -->
            ${
              googleApiKey
                ? `<div style="margin-bottom: 20px; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
                    <img src="${staticMapUrl}" alt="Route Preview Map" style="width: 100%; height: auto; display: block;" />
                   </div>`
                : ""
            }

            <!-- Route Details -->
            <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; padding: 16px; border-radius: 12px; margin-bottom: 20px; font-size: 13px;">
              <p style="margin: 0 0 8px 0;"><strong>Pickup:</strong> ${data.pickupAddress}</p>
              <p style="margin: 0 0 8px 0;"><strong>Drop:</strong> ${data.dropAddress}</p>
              <p style="margin: 0 0 8px 0;"><strong>Schedule:</strong> ${data.pickupDate} at ${data.pickupTime}</p>
              ${data.returnDate ? `<p style="margin: 0 0 8px 0;"><strong>Return Date:</strong> ${data.returnDate}</p>` : ""}
              <p style="margin: 8px 0 0 0;"><a href="${data.googleMapsUrl}" target="_blank" style="color: #2563eb; text-decoration: none; font-weight: bold;">Open Live Navigation Map →</a></p>
            </div>

            <!-- Total Estimated Fare -->
            <div style="background-color: #0f172a; color: #ffffff; padding: 16px; border-radius: 12px; text-align: center;">
              <span style="font-size: 11px; text-transform: uppercase; color: #94a3b8; display: block; margin-bottom: 4px;">Estimated Total Fare</span>
              <span style="font-size: 26px; font-weight: bold; color: #fbbf24;">${data.estimatedFare}</span>
              <span style="font-size: 11px; color: #94a3b8; display: block; margin-top: 4px;">(Rate: ${data.ratePerKm} | Bata: ${data.driverBata})</span>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SMTP processing error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}