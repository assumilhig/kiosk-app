import { getConnection } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Item');
    return Response.json(result.recordset);
  } catch (err) {
    console.error('GET error:', err);
    return new Response(JSON.stringify({ error: err.originalError.info.message }), { status: 500 });
  }
}