import Spinner from "react-bootstrap/Spinner";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <Spinner animation="border" size="sm" />
      <span>{text}</span>
    </div>
  );
}