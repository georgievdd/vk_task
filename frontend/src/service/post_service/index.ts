import {Post, Posts} from "model/post";
import {get, post, put} from "api/instance";
import { unpack, waitFor } from "helpers";
import {FAVORITES, POST, POSTS} from "api/endpoints";

class PostServiceIml {
    async list() {
        const posts = await get<Posts>(POSTS).then(unpack)
        return posts
    }
    async favorites() {
        const posts = await get<Posts>(FAVORITES).then(unpack)
        return posts
    }
    async like(id: string) {
        const like = await post<{statuse: string}>(POST(id)).then(unpack)
        return like
    }
    async byId({id}: {id: string}) {
        const post = await get<Post>(POST(id)).then(unpack)
        return post
    }
}

export default new PostServiceIml()