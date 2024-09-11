import './styles.css'
import useGet from "hooks/use-get"
import postService from "service/post_service"
import { PageComponent, Permission } from "types/page"
import Skeleton from 'components/skeleton'
import PostCompressed from 'components/post/post-compressed'
import {Posts} from "../../model/post";
const PostsPage: PageComponent = () => {
    const posts = useGet<Posts>(postService.list)
    if (posts.isLoading) {
        return (
        <div className="data-container posts-container">
            {Array.from({length: 6}).map((_, i) => (
                <Skeleton key={i}/>
            ))}
        </div>)
    }
    return (
        <div className="data-container posts-container">
            {posts.data?.data?.map(post => <PostCompressed key={post.id} post={post}/>)}
        </div>
    )
}

PostsPage.permission = Permission.ALL


export default PostsPage