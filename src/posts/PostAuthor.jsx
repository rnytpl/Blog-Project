import React from "react";
import { useGetUsersQuery } from "users/usersSlice";

const PostAuthor = ({ userId }) => {
  const { user } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  return (
    <span>
      <i>{user && user.name}</i>
    </span>
  );
};

export default PostAuthor;
