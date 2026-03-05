import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ConfirmModal({
  show,
  title = "Confirm",
  body = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
  confirmVariant = "danger",
  onConfirm,
  onClose,
  busy = false,
}) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={busy}>
          {cancelText}
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm} disabled={busy}>
          {busy ? "Please wait..." : confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
