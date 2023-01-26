import { TextField, Box, MenuItem, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "./postsSlice";
import { useGetUsersQuery } from "users/usersSlice";
import { useState } from "react";

const EditPostForm = () => {
  const { postId } = useParams()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState()
  const [userId, setUserId] = useState()
  console.log(title, userId, body)
  const { post, isLoading } = useGetPostsQuery('getPosts', {
    selectFromResult: ({ data, isLoading }) => ({
      post: data?.entities[postId], isLoading
    })
  })
  const { data: users, isSuccess: isUsersSuccess } = useGetUsersQuery('getUsers')
  if (isLoading) {
    return <p>Loading...</p>
  } else if (!post) {
    return <p>Post not found</p>
  }

  let options;
  if (isUsersSuccess) {
    options = users.ids.map(id => (
      <MenuItem key={id} value={id} onChan>
        {users.entities[id].name}
      </MenuItem>
    ))
  }

  return (
    <Box component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
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
      <Button variant="contained" fullWidth>
        Edit Post
      </Button>
    </Box>

  )
}
export default EditPostForm;
