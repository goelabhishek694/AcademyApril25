import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/users.js";

export default function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await getCurrentUser();
        console.log("data of current user",data.data);
        
        setUser(data?.data);
      } catch (err) {
        setError("Failed to load profile", err.message);
      }
    };

    fetchMe();
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Home</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
