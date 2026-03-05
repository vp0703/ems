import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function EmployeeList({
  employees,
  getCountryName,
  onEdit,
  onDelete,
  deletingId,
}) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Country</th>
          <th style={{ width: 180 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-4">No employees</td>
          </tr>
        ) : (
          employees.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.mobile}</td>
              <td>{getCountryName(e.country)}</td>
              <td className="d-flex gap-2">
                <Button size="sm" variant="primary" onClick={() => onEdit(e)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(e)}
                  disabled={String(deletingId) === String(e.id)}
                >
                  {String(deletingId) === String(e.id) ? "Deleting..." : "Delete"}
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}