import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { NextRequest } from "next/server";
import { ilike, or, sql, eq } from "drizzle-orm";
import { PgSelectBase } from "drizzle-orm/pg-core";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    let data;
    
    if (query) {
      // Create a case-insensitive search across all relevant columns
      const baseQuery = db.select().from(advocates);
      data = await baseQuery.where(
        or(
          ilike(advocates.firstName, `%${query}%`),
          ilike(advocates.lastName, `%${query}%`),
          ilike(advocates.city, `%${query}%`),
          ilike(advocates.degree, `%${query}%`),
          // For specialties, we need to use a JSONB operator
          sql`${advocates.specialties}::text ILIKE ${`%${query}%`}`,
          // For years of experience, convert to string for searching
          sql`CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${`%${query}%`}`
        )
      );
    } else {
      // If no query parameter, return all advocates
      data = await db.select().from(advocates);
    }
    return Response.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch advocates:", error);
    console.error("DB error, falling back to static data:", error);
    // Fallback to static data
    return Response.json({ data: advocateData, fallback: true }, { status: 200 });
  }
}
