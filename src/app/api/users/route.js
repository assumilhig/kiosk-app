import { getConnection } from '@/lib/db';
import sql from 'mssql';

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Users');
    return Response.json(result.recordset);
  } catch (err) {
    console.error('GET error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    const pool = await getConnection();
    await pool
      .request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .query('INSERT INTO Users (Name, Email) VALUES (@name, @email)');

    return new Response(JSON.stringify({ message: 'User created' }), { status: 201 });
  } catch (err) {
    console.error('POST error:', err);
    return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, email } = body;

    const pool = await getConnection();
    await pool
      .request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .query('UPDATE Users SET Name = @name, Email = @email WHERE ID = @id');

    return new Response(JSON.stringify({ message: 'User updated' }), { status: 200 });
  } catch (err) {
    console.error('PUT error:', err);
    return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));

    const pool = await getConnection();
    await pool.request().input('id', sql.Int, id).query('DELETE FROM Users WHERE ID = @id');

    return new Response(JSON.stringify({ message: 'User deleted' }), { status: 200 });
  } catch (err) {
    console.error('DELETE error:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), { status: 500 });
  }
}
