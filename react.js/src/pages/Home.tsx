import { useMemo } from "react";

import PostsList from "../components/PostsList/PostsList";

import type { PostInterface } from "../interface/post.interface";

export default function Home() {
    const posts = useMemo<PostInterface[]>(() => [
        { id: 1, title: "titre 1", content: "content1", author: 1 },
        { id: 2, title: "titre 2", content: "content2", author: 1 },
        { id: 3, title: "titre 3", content: "content3", author: 2 },
        { id: 4, title: "titre 3", content: "content3", author: 2 },
    ], []);

    return (
        <>
            <h1>Recent posts</h1>
            <PostsList posts={posts} />
        </>
    )
}