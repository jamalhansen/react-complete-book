import { useParams, Link } from "react-router-dom";

export function ProductDetail() {
  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.id}</p>
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
}
