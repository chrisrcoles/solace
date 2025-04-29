import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  try {
    const data = await db.select().from(advocates);
    return Response.json({ data }, { status: 200 });
  } catch (error) {
    // Optionally log the error for debugging
    console.error("Failed to fetch advocates:", error);

    // Return a JSON error response with a 500 status code
    return Response.json(
      { error: "Failed to fetch advocates. Please try again later." },
      { status: 500 }
    );
  }
}
