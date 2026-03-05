import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function EmployeeForm({
  register,
  handleSubmit,
  errors,
  countries,
  saving,
  onCancel,
  title,
  onSubmit,
}) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="mb-3">{title}</Card.Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Label>Name</Form.Label>
              <Form.Control {...register("name")} />
              {errors.name && <div className="text-danger">{errors.name.message}</div>}
            </Col>

            <Col md={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control {...register("email")} />
              {errors.email && <div className="text-danger">{errors.email.message}</div>}
            </Col>

            <Col md={6}>
              <Form.Label>Mobile</Form.Label>
              <Form.Control {...register("mobile")} />
              {errors.mobile && <div className="text-danger">{errors.mobile.message}</div>}
            </Col>

            <Col md={6}>
              <Form.Label>Country</Form.Label>
              <Form.Select {...register("country")}>
                <option value="">Select</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name || c.country || c.title || `Country ${c.id}`}
                  </option>
                ))}
              </Form.Select>
              {errors.country && <div div className="text-danger">{errors.country.message}</div>}
            </Col>

            <Col md={6}>
              <Form.Label>State</Form.Label>
              <Form.Control {...register("state")} />
              {errors.state && <div className="text-danger">{errors.state.message}</div>}
            </Col>

            <Col md={6}>
              <Form.Label>District</Form.Label>
              <Form.Control {...register("district")} />
              {errors.district && <div className="text-danger">{errors.district.message}</div>}
            </Col>
          </Row>

          <div className="mt-3 d-flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel} disabled={saving}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}



