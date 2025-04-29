import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  try {
    const data = await db.select().from(advocates);
    return Response.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch advocates:", error);
    console.error("DB error, falling back to static data:", error);
    // Fallback to static data
    return Response.json({ data: advocateData, fallback: true }, { status: 200 });
  }
}
