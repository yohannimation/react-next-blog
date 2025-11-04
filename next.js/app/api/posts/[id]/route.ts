import { NextResponse } from "next/server";

// ⚠️ Même tableau que dans le fichier précédent (dans la vraie vie → DB)
let posts = [
    { id: 1, title: "Titre 1", content: "Contenu 1", private: false, author: 1 },
    { id: 2, title: "Titre 2", content: "Contenu 2", private: true, author: 2 },
];

// 🟢 GET — un seul post
export async function GET(_: Request, { params }: { params: { id: string } }) {
    const post = posts.find((p) => p.id === Number(params.id));
    if (!post) return NextResponse.json({ error: "Post non trouvé" }, { status: 404 });
    return NextResponse.json(post);
}

// 🟣 PUT — modifier un post
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const updatedData = await req.json();

    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return NextResponse.json({ error: "Post non trouvé" }, { status: 404 });

    posts[index] = { ...posts[index], ...updatedData };
    return NextResponse.json(posts[index]);
}

// 🔴 DELETE — supprimer un post
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return NextResponse.json({ error: "Post non trouvé" }, { status: 404 });

    posts.splice(index, 1);
    return NextResponse.json({ message: "Post supprimé" });
}
