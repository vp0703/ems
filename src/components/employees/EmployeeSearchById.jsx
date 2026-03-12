import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export default function EmployeeSearchById({
  onSearch,
  onClear,
  loading,
  error,
}) {
  const [id, setId] = useState("");

  return (
    <Card className="mb-3 mt-5">
      <Card.Body>
        <div className="d-flex flex-wrap gap-2 align-items-end">
          <Form.Group>
            <Form.Label>Search employee by ID</Form.Label>
            <Form.Control
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ex. 2.."
            />
          </Form.Group>

          <Button
            variant="success"
            onClick={() => onSearch(id)}
            disabled={!id || loading}
          >
            {loading ? "Searching..." : "Search"}
          </Button>

          <Button variant="outline-secondary" onClick={() => { setId(""); onClear(); }}>
            Clear
          </Button>
        </div>

        {error ? <div className="text-danger mt-3">{error}</div> : null}

        {/* {result ? (
          <div className="mt-3">
            <div><b>Name:</b> {result.name}</div>
            <div><b>Email:</b> {result.email}</div>
            <div><b>Mobile:</b> {result.mobile}</div>
            <div><b>Country:</b> {getCountryName(result.country)}</div>
            <div><b>State:</b> {result.state}</div>
            <div><b>District:</b> {result.district}</div>
          </div>
        ) : null} */}
      </Card.Body>
    </Card>
  );
}