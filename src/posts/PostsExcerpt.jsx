import ReactionButtons from "posts/ReactionButtons";
import { useGetPostsQuery } from "./postsSlice";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import TimeAgo from "./TimeAgo";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const PostsExcerpt = ({ postId }) => {
  const { post } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

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
        <Button component={Link} to={`posts/${post.id}`} size="small">
          View Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostsExcerpt;
