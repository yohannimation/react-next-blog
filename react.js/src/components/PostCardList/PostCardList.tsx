import type { PostCardListInterface } from "./PostCardList.interface";

import PostCard from "../PostCard/PostCard";

export default function PostCardList({cardList}: PostCardListInterface) {
    return (
        <ul>
            {cardList.map((card, index) => {
                return <PostCard key={index} title={card.title} content={card.content} />
            })}
        </ul>
    )
}