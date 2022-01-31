import React from 'react';


const CommentList = ({ comments }) => {

    const renderedComments = comments.map(comment => {

        if (comment.status === "pending") {
            return(
                <li key={comment.id}>
                    This comment is awaiting moderation.
                </li>
            )
        }
        if (comment.status === "approved") {
            return(
                <li key={comment.id}>
                    {comment.content}
                </li>
            )
        }

        if (comment.status === "rejected") {
            return(
                <li key={comment.id}>
                    This comment has been rejected.
                </li>
            )
        }




    })

    return(
        <ul>
            {renderedComments}
        </ul>
    );

}

export default CommentList;
