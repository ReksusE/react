export default function ModalPrivacy() {
  return (
    <label className="modal__checkbox-label">
      <input
        className="modal__privacy-input"
        type="checkbox"
        required
      />

      <span
        className="modal__privacy-control"
        aria-hidden="true"
      />

      <span className="modal-span">
        Я согласен(а) с политикой конфиденциальности
      </span>
    </label>
  )
}