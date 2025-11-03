import { useMemo } from "react";

import PostCardList from "../components/PostCardList/PostCardList";

export default function Home() {
    const cardList = useMemo(() => [
        { title: "titre 1", content: "content1" },
        { title: "titre 2", content: "content2" },
        { title: "titre 3", content: "content3" },
    ], []);

    return (
        <PostCardList cardList={cardList} />
    )
}