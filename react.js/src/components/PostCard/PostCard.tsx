import Button from "../Button/Button"
import type { PostCardInterface } from "./PostCard.interface"

import style from "./PostCard.module.scss"

export default function PostCard({ post }: PostCardInterface) {
    return (
        <li className={style.card}>
            <h2>{post.title}</h2>
            <p>More about <Button type="link" variant="link" href={post.title}>{post.author}</Button></p>
            <p>
                {
                    post.private ?
                    ("This post is private") :
                    (post.content)
                }
            </p>
        </li>
    )
}