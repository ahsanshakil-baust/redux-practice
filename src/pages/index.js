import { fetchUsers } from "@/store/feature/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const data = useSelector((state) => state.user.users);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {data.length > 0 &&
        data.map((name, index) => <div key={index}>{name}</div>)}
      {data.length === 0 && <div>No data</div>}
    </main>
  );
}
