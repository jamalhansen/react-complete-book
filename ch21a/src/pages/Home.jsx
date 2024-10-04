import { Link, useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const onNavigateHandler = () => {
    navigate("/products");
  };

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="/products">the list of products</Link>
      </p>
      <p>
        <button onClick={onNavigateHandler}>Navigate</button> # not how you
        would normally do this in a button, but for reference
      </p>
    </>
  );
}
