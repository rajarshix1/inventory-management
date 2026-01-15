import type { Route } from "./+types/dashboard";
import { useAuth } from "../../context/appContext";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard - Inventory System" }];
}

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <h1>Inventory System</h1>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <main>
        <h2>Dashboard</h2>
        <div>
          <div>Total Products: 0</div>
          <div>Total Users: 0</div>
          <div>Categories: 0</div>
        </div>
      </main>
    </div>
  );
}
