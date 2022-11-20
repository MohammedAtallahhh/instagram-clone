import { useRouter } from "next/router";
import React from "react";

const UserPage = () => {
  const router = useRouter();

  return <div>UserPage: {router.query.username}</div>;
};

export default UserPage;
