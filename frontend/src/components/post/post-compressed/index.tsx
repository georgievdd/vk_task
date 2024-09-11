import {FC, useCallback, useState} from "react";
import { getDatePreview } from "helpers";
import { Button } from '@mui/material'
import { useNavigate } from "react-router";
import {Post} from "../../../model/post";
import Like from "../../like/Like";
import postService from "../../../service/post_service";

interface Props {
    post: Post
}

const PostCompressed: FC<Props> = ({post}) => {
    const onClick = async () => {
      const res = await postService.like(post.id);
    }
    const [isLiked, setIsLiked] = useState(false);
    return (
        <div className="post-compressed shadow">
            <div className='info'>
                <img
                  style={{maxWidth: '100%', maxHeight: '200px', objectFit: 'contain'}}
                  src={post.imgUrl}
                />
                <div className='time'>{getDatePreview(post.createdAt)}</div>
                <div className='space'/>
                <div className='text'>{post.title}</div>
            </div>
            <div className='button-container'>
              <Like onClick={onClick} isLiked={isLiked}/>
            </div>
        </div>
    )
}

export default PostCompressed