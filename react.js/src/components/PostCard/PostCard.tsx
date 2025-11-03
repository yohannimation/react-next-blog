import type { PostCardInterface } from "./PostCard.interface";

export default function PostCard({title, content}: PostCardInterface) {
    return (
        <li>
            <h2>{title}</h2>
            <p>{content}</p>
        </li>
    )
}