import { NextResponse } from "next/server";

let posts = [
    { id: 1, title: "Titre 1", content: "Contenu 1", private: false, author: 1 },
    { id: 2, title: "Titre 2", content: "Contenu 2", private: true, author: 2 },
];

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173", // ton front React
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
    return NextResponse.json(posts, { headers: corsHeaders });
}

export async function POST(req: Request) {
    const body = await req.json();
    const newPost = {
        id: posts.length + 1,
        title: body.title,
        content: body.content,
        private: body.private ?? false,
        author: body.author ?? 0,
    };

    posts.push(newPost);
    return NextResponse.json(newPost, { status: 201, headers: corsHeaders });
}
