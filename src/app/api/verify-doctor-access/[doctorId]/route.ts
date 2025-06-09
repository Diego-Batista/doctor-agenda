import { type NextRequest, NextResponse } from "next/server";

import { verifyDoctorAccess } from "@/lib/auth-doctor";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ doctorId: string }> },
) {
  try {
    const { doctorId } = await params;
    const verification = await verifyDoctorAccess(doctorId);

    return NextResponse.json({
      authorized: verification.authorized,
      reason: verification.reason || null,
    });
  } catch (error) {
    return NextResponse.json(
      { authorized: false, reason: "server_error" },
      { status: 500 },
    );
  }
}
