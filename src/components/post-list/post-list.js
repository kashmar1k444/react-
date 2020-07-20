import React from 'react';
import PostListItem from '../post-list-item'

const PostList = ({posts, onDelete , onToggleImportant , onToggleLike}) => {

    const elements = posts.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <li key={item.id} className="list-group-item">
                 <PostListItem
                 {...itemProps}
                 onDelete={() => onDelete(id)}
                 onToggleImportant={ () => onToggleImportant(id)}
                 onToggleLike = { () => onToggleLike(id)}/>
            </li>
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PostList