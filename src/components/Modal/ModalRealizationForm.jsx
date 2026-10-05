import Button from '@/components/Button/Button'
import ModalPrivacy from './ModalPrivacy'

export default function ModalRealizationForm() {
  return (
    <form
      className="modal__form"
      action="#"
      method="POST"
      encType="multipart/form-data"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="modal__form-grid">
        <div className="modal__upload-area">
          <input
            type="file"
            name="project_file"
            id="project_file"
            hidden
          />

          <label htmlFor="project_file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="21"
              viewBox="0 0 27 21"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M16.9667 16.5H21.0833C24.0625 16.5 26.5 14.9626 26.5 12.1C26.5 9.23737 23.6292 7.8121 21.3 7.7C20.8185 3.22316 17.4542 0.5 13.5 0.5C9.7625 0.5 7.35533 2.91 6.56667 5.3C3.31667 5.6 0.5 7.60947 0.5 10.9C0.5 14.1905 3.425 16.5 7 16.5H10.0333"
                stroke="#939393"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M13.5 20.5V8.31117M16.5 10.7447L13.5 7.5L10.5 10.7447H16.5Z"
                stroke="#939393"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Прикрепить файлы</span>
          </label>
        </div>

        <textarea
          className="modal__input modal__textarea"
          name="comment"
          placeholder="Комментарий"
        />

        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Ваше имя"
          required
        />

        <input
          className="modal__input"
          type="tel"
          name="phone"
          placeholder="Ваш телефон"
          required
        />

        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Ваша почта"
        />
      </div>

      <ModalPrivacy />

      <Button
        className="modal__btn"
        type="submit"
      >
        Отправить
      </Button>
    </form>
  )
}