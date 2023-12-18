"use client";

import { useGetUsersQuery } from "@/store/feature/api/apiSlice";
import { fetchUsers } from "@/store/feature/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const {
    data: users,
    isLoading,
    isSuccess, // Check for proper variable name (typo corrected)
    isError,
    error,
  } = useGetUsersQuery();

  // const data = useSelector((state) => state.user.users);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {isLoading && <div>Loading . . .</div>}
      {!isLoading &&
        users.map((name, index) => <div key={index}>{name.name}</div>)}
      {users && users.length === 0 && <div>No data</div>}
    </main>
  );
}
