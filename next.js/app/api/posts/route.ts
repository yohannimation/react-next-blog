// pages/api/posts.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

let posts = [
    { id: 1, title: "Titre 1", content: "Contenu 1", private: false, author: 1 },
    { id: 2, title: "Titre 2", content: "Contenu 2", private: true, author: 2 },
];

const SECRET = process.env.JWT_SECRET || "secret";

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173", // ton front React
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS pour CORS
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

// GET avec filtrage privé/public et recherche
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    // Vérifier JWT
    const authHeader = req.headers.get("Authorization") || "";
    let isAuthenticated = false;

    if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            jwt.verify(token, SECRET);
            isAuthenticated = true;
        } catch {
            isAuthenticated = false;
        }
    }

    // Filtrer selon recherche
    let filteredPosts = posts;
    if (search) {
        const lowerSearch = search.toLowerCase();
        filteredPosts = posts.filter((p) =>
            p.title.toLowerCase().includes(lowerSearch)
        );
    }

    // Masquer le contenu privé si non connecté
    const visiblePosts = filteredPosts.map(post => {
        if (post.private && !isAuthenticated) {
            return { ...post, content: null };
        }
        return post;
    });

    return NextResponse.json(visiblePosts, { headers: corsHeaders });
}

// POST pour ajouter un post
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
