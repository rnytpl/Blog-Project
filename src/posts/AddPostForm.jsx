import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "users/usersSlice";
import { useAddNewPostMutation } from "./postsSlice";

const AddPostForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState();
  const [userId, setUserId] = useState();

  const { data: users, isSuccess } = useGetUsersQuery("getUsers");

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const canSave = [title, body, userId].every(Boolean) && !isLoading;

  let options;
  if (isSuccess) {
    options = users.ids.map((id) => (
      <MenuItem key={id} value={id}>
        {users.entities[id].name}
      </MenuItem>
    ));
  }

  const onSaveClicked = async () => {
    console.log("button works");
    if (canSave) {
      try {
        await addNewPost({ title, body, userId });
        setTitle("");
        setBody("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.error("Failed to add new post", error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mb: 2 },
        }}
      >
        <TextField
          label="Title"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          select
          label="Select Author"
          fullWidth
          onChange={(e) => setUserId(e.target.value)}
        >
          {options}
        </TextField>
        <TextField
          label="Type your text"
          multiline
          fullWidth
          rows={5}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={onSaveClicked}
          disabled={!canSave}
        >
          Save Post
        </Button>
      </Box>
    </Container>
  );
};

export default AddPostForm;
