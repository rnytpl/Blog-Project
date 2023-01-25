import { useAddReactionsMutation } from "posts/postsSlice";
import React from "react";
import { useDispatch } from "react-redux";

const reactionEmoji = {
  heart: "💕",
  wow: "😲",
  rocket: "🚀",
  coffee: "☕",
  thumbsUp: "👍",
};

const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionsMutation();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <span
      key={name}
      name={name}
      onClick={() => {
        addReaction({
          postId: post.id,
          name,
        });
      }}
    >
      {emoji}
      &nbsp;
      {post.reactions[name]}
    </span>
  ));

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
