import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  try {
    const records = await db.insert(advocates).values(advocateData).returning();
    return Response.json({ advocates: records }, { status: 201 });
  } catch (error) {
    // Optionally log the error for debugging
    console.error("Failed to seed advocates:", error);

    // Return a JSON error response with a 500 status code
    return Response.json(
      { error: "Failed to seed advocates. Please try again later." },
      { status: 500 }
    );
  }
}
