import type { PostInterface } from "../../interface/post.interface"

export interface PostFormModalInterface {
    post?: PostInterface
    onClose: () => void
}