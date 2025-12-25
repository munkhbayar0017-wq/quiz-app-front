// // app/api/webhooks/clerk/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../../../lib/prisma";

// export async function POST(req: NextRequest) {
//   try {
//     const event = await req.json();
//     console.log("📩 Webhook event received:", event.type);

//     // ✅ User created
//     if (event.type === "user.created") {
//       const { id, email_addresses, first_name, last_name } = event.data;

//       const user = await prisma.user.create({
//         data: {
//           clerkId: id,
//           email: email_addresses[0].email_address,
//           name: first_name ? `${first_name} ${last_name || ""}`.trim() : null,
//         },
//       });

//       console.log("✅ User created in Neon:", user);
//       return NextResponse.json({
//         success: true,
//         message: "User created",
//         userId: user.id,
//       });
//     }

//     // ✅ User updated
//     if (event.type === "user.updated") {
//       const { id, email_addresses, first_name, last_name } = event.data;

//       const user = await prisma.user.update({
//         where: { clerkId: id },
//         data: {
//           email: email_addresses[0].email_address,
//           name: first_name ? `${first_name} ${last_name || ""}`.trim() : null,
//         },
//       });

//       console.log("✅ User updated in Neon:", user);
//       return NextResponse.json({
//         success: true,
//         message: "User updated",
//       });
//     }

//     // ✅ User deleted
//     if (event.type === "user.deleted") {
//       const { id } = event.data;

//       await prisma.user.delete({
//         where: { clerkId: id },
//       });

//       console.log("✅ User deleted from Neon");
//       return NextResponse.json({
//         success: true,
//         message: "User deleted",
//       });
//     }

//     // Бусад event-үүд
//     return NextResponse.json({
//       success: true,
//       message: "Event received but not processed",
//     });
//   } catch (error) {
//     console.error("❌ Webhook error:", error);
//     return NextResponse.json(
//       { success: false, error: "Webhook processing failed" },
//       { status: 500 }
//     );
//   }
// }
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
