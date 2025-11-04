// app/api/users/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "@/data/users";

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
    return NextResponse.json(usersWithoutPassword, { headers: corsHeaders });
}

export async function POST(req: Request) {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) return NextResponse.json({ error: "Champs manquants" }, { status: 400, headers: corsHeaders });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    username,
    password: hashedPassword,
    };

    users.push(newUser);
    const { password: _, ...rest } = newUser;
    return NextResponse.json(rest, { status: 201, headers: corsHeaders });
}
