import Layout from "components/Layout";
import PostsList from "posts/PostsList";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePostPage from "posts/SinglePostPage";
import EditPostForm from "posts/EditPostForm";
import AddPostForm from "posts/AddPostForm";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostsList />} />
          <Route path="posts">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
