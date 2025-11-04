import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "@/data/users";

const JWT_SECRET = process.env.JWT_SECRET;

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const user = users.find(u => u.username === username);
    if (!user) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404, headers: corsHeaders });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401, headers: corsHeaders });

    const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    return NextResponse.json({ message: "Login successful", token, user: { id: user.id, username: user.username } }, { headers: corsHeaders });
}
