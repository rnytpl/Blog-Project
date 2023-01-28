import React from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import ReactionButtons from "posts/ReactionButtons";
import TimeAgo from "./TimeAgo";
import PostAuthor from "./PostAuthor";
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
        <Typography variant="h4" sx={{ fontSize: "25px", mb: "1rem" }}>
          {post.title}
        </Typography>
        <Typography sx={{ mb: "0.5rem" }}>{post.body}</Typography>
        <Box>
          <TimeAgo timestamp={post.date} />
          &nbsp;by&nbsp;
          <PostAuthor userId={post.userId} />
        </Box>
        <Box sx={{ mt: "0.5rem" }}>
          <ReactionButtons post={post} />
        </Box>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/posts/edit/${post.id}`} size="small">
          View Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default SinglePostPage;
