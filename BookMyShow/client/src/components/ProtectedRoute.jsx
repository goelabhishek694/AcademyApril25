import { Link, Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to="/login" replace/>;
    }
  return (
    <div>
      <header style={{backgroundColor: "#111827", padding: "16px 24px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10}}>
        <div style={{fontSize: 18, fontWeight: 600}}>Book My Show</div>
        <nav style={{display: "flex", gap: 16, alignItems: "center"}}>
          <Link to="/" style={{color: "white", textDecoration: "none", fontWeight: 500}}>Home</Link>
          <Link to="/logout" style={{color: "white", textDecoration: "none", fontWeight: 500}}>Logout</Link>
          </nav>
      </header>
      <main style={{padding: "24px"}}>{children}</main>
    </div>
  )
}

export default ProtectedRoute
