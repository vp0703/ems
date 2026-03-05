import Alert from "react-bootstrap/Alert";

export default function ErrorAlert({ error }) {
  if (!error) return null;
  return <Alert variant="danger" className="mb-3">{String(error)}</Alert>;
}