// pages/api/posts.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { users } from "../../../data/users";

let posts = [
    { id: 1, title: "Titre 1", content: "Contenu 1", private: false, author: 1 },
    { id: 2, title: "Titre 2", content: "Contenu 2", private: true, author: 1 },
];

const SECRET = process.env.JWT_SECRET || "secret";

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS pour CORS
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

// GET : récupération des posts avec contenu conditionnel et auteur
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    // Vérifier JWT
    const authHeader = req.headers.get("Authorization") || "";
    let isAuthenticated = false;
    let currentUserId: number | null = null;

    if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decoded: any = jwt.verify(token, SECRET);
            isAuthenticated = true;
            currentUserId = decoded.id;
        } catch {
            isAuthenticated = false;
        }
    }

    // Filtrer selon recherche
    let filteredPosts = posts;
    if (search) {
        const lowerSearch = search.toLowerCase();
        filteredPosts = posts.filter(p =>
            p.title.toLowerCase().includes(lowerSearch)
        );
    }

    // Ajouter le nom de l'auteur et masquer le contenu privé si non connecté
    const visiblePosts = filteredPosts.map(post => {
        const authorName = users.find(u => u.id === post.author)?.username || "Unknown";
        return {
            ...post,
            author: authorName,
            content: post.private && !isAuthenticated ? null : post.content,
        };
    });

    return NextResponse.json(visiblePosts, { headers: corsHeaders });
}

// POST : ajouter un post et le lier à l'utilisateur courant
export async function POST(req: Request) {
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const token = authHeader.split(" ")[1];
    let userId: number;
    try {
        const decoded: any = jwt.verify(token, SECRET);
        userId = decoded.id;
    } catch {
        return NextResponse.json({ error: "Invalid token" }, { status: 401, headers: corsHeaders });
    }

    const body = await req.json();
    const newPost = {
        id: posts.length + 1,
        title: body.title,
        content: body.content,
        private: body.private ?? false,
        author: userId,
    };

    posts.push(newPost);
    const authorName = users.find(u => u.id === userId)?.username || "Unknown";

    return NextResponse.json({ ...newPost, author: authorName }, { status: 201, headers: corsHeaders });
}
