import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import ReactionButtons from "posts/ReactionButtons";
import { Link, useParams } from "react-router-dom";
import { useGetPostsQuery } from "./postsSlice";

const SinglePostPage = () => {
  const { postId } = useParams();
  const { post, isLoading } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data, isLoading }) => ({
      post: data?.entities[postId],
      isLoading,
    }),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (!post) {
    return <p>post not found</p>;
  }

  return (
    <Card sx={{ mb: "1rem" }}>
      <CardContent>
        <Typography variant="h4" sx={{ fontSize: "25px" }}>
          {post.title}
        </Typography>
        <Typography>{post.body}</Typography>
        <ReactionButtons post={post} />
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/posts/edit/${post.id}`} size="small">
          Edit Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default SinglePostPage;
