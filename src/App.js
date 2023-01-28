import Layout from "components/Layout";
import PostsList from "posts/PostsList";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePostPage from "posts/SinglePostPage";
import EditPostForm from "posts/EditPostForm";
import AddPostForm from "posts/AddPostForm";
import UsersList from "users/UsersList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SingleUserPage from "users/SingleUserPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#03001C",
    },
    secondary: {
      main: "#5B8FB9",
    },
    fontColor: {
      main: "#FFFFFF",
    },
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PostsList />} />
            <Route path="posts">
              <Route index element={<AddPostForm />} />
              <Route path=":postId" element={<SinglePostPage />} />
              <Route path="edit/:postId" element={<EditPostForm />} />
            </Route>
            <Route path="/users">
              <Route index element={<UsersList />} />
              <Route path=":userId" element={<SingleUserPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
