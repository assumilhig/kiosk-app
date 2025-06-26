import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const pool = await getConnection();
    const items = await pool
      .request()
      .query(
        "SELECT ID, ItemLookupCode, Description, ExtendedDescription, Price, Quantity, DepartmentID, CategoryID, SubCategoryID, OrderNo FROM Item WHERE (Inactive = 0 OR ItemStatus = 'Regular Item') AND ISNULL(OrderNo, 0) > 0"
      );
    const departments = await pool
      .request()
      .query(
        "SELECT ID, Name, OrderNo FROM Department WHERE Inactive = 0 AND ISNULL(OrderNo, 0) > 0 ORDER BY OrderNo"
      );

    return Response.json({
      items: items.recordset,
      departments: departments.recordset,
    });
  } catch (err) {
    console.error("GET error:", err);
    return new Response(
      JSON.stringify({ error: err.originalError.info.message }),
      { status: 500 }
    );
  }
}
