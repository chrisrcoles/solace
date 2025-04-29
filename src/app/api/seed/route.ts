import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const records = await db.insert(advocates).values(advocateData).returning();
    return NextResponse.json({ advocates: records }, { status: 201 });
  } catch (error) {
    console.error("Failed to seed advocates:", error);
    // Return a JSON error response with a 500 status code
    return NextResponse.json(
      { error: "Failed to seed advocates. Please try again later." },
      { status: 500 }
    );
  }
}
