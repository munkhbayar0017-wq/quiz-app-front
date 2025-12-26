// app/api/webhooks/clerk/route.ts
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  console.log(
    "🧪 Clerk Signing Secret:",
    process.env.CLERK_WEBHOOK_SIGNING_SECRET
  );
  try {
    // Webhook verify хийх
    const evt = (await verifyWebhook(req)) as WebhookEvent;

    const eventType = evt.type;
    console.log(`📩 Webhook received: ${eventType}`);

    // ✅ User created
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;

      // Neon database дээр user үүсгэх
      const user = await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0].email_address,
          name: first_name ? `${first_name} ${last_name || ""}`.trim() : null,
        },
      });

      console.log("✅ User created in Neon:", user);

      return NextResponse.json({
        success: true,
        message: "User created",
        userId: user.id,
      });
    }

    // ✅ User updated
    if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name } = evt.data;

      const user = await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email_addresses[0].email_address,
          name: first_name ? `${first_name} ${last_name || ""}`.trim() : null,
        },
      });

      console.log("✅ User updated in Neon:", user);

      return NextResponse.json({
        success: true,
        message: "User updated",
      });
    }

    // ✅ User deleted
    if (eventType === "user.deleted") {
      const { id } = evt.data;

      if (id) {
        await prisma.user.delete({
          where: { clerkId: id as string },
        });

        console.log("✅ User deleted from Neon");
      }

      return NextResponse.json({
        success: true,
        message: "User deleted",
      });
    }

    // Бусад event-үүд
    console.log("ℹ️ Event not processed:", eventType);
    return NextResponse.json({
      success: true,
      message: "Webhook received",
    });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json(
      { success: false, error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}
