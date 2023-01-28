import { TextField, Box, MenuItem, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostsQuery, useUpdatePostMutation } from "./postsSlice";
import { useGetUsersQuery } from "users/usersSlice";
import { useState } from "react";
import { Container } from "@mui/system";

const EditPostForm = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState();
  const [userId, setUserId] = useState();

  const { post, isLoadingPosts } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data, isLoading }) => ({
      post: data?.entities[postId],
      isLoading,
    }),
  });

  const { data: users, isSuccess: isUsersSuccess } =
    useGetUsersQuery("getUsers");

  const onEditClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: postId,
          title,
          body,
          userId,
        });
        setTitle("");
        setBody("");
        setUserId("");
        navigate(`/posts/${postId}`);
      } catch (error) {
        console.error("Failed to save the post", error);
      }
    }
  };

  if (isLoadingPosts) {
    return <p>Loading...</p>;
  } else if (!post) {
    return <p>Post not found</p>;
  }

  let options;
  if (isUsersSuccess) {
    options = users.ids.map((id) => (
      <MenuItem key={id} value={id} onChan>
        {users.entities[id].name}
      </MenuItem>
    ));
  }

  const canSave = [title, body, userId].every(Boolean);

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mb: 2 },
        }}
      >
        <TextField
          fullWidth
          label="Title"
          defaultValue={post.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="PostAuthor"
          select
          fullWidth
          label="Select Author"
          onChange={(e) => setUserId(e.target.value)}
        >
          {options}
        </TextField>
        <TextField
          fullWidth
          multiline
          label="Content"
          rows={5}
          defaultValue={post.body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button size="large" color="primary" fullWidth>
          Delete Post
        </Button>
        <Button
          variant="contained"
          fullWidth
          disabled={!canSave}
          onClick={onEditClicked}
        >
          Edit Post
        </Button>
      </Box>
    </Container>
  );
};
export default EditPostForm;
