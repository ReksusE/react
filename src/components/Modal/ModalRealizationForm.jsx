import Button from '@/components/Button/Button'
import Field from '@/components/Field/Field'
import ModalPrivacy from './ModalPrivacy'

export default function ModalRealizationForm() {
  return (
    <form
      className="modal__form"
      encType="multipart/form-data"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="modal__file">
        <span className="modal__file-label">Прикрепить проект</span>
        <input
          className="modal__file-input"
          type="file"
          name="project_file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar"
        />
        <span className="modal__file-button">Выбрать файл</span>
      </label>

      <Field
        className="modal__field"
        label="Комментарий"
        type="textarea"
        placeholder="Расскажите о проекте"
      />
      <Field
        className="modal__field"
        label="Ваше имя"
        type="text"
        placeholder="Введите имя"
        isRequired
      />
      <Field
        className="modal__field"
        label="Телефон"
        type="tel"
        placeholder="+7 (___) ___-__-__"
        inputMode="tel"
        isRequired
        mask="+7 (999) 999-99-99"
      />
      <Field
        className="modal__field"
        label="Email"
        type="email"
        placeholder="example@mail.ru"
        inputMode="email"
        isRequired
      />
      <ModalPrivacy />
      <Button className="modal__submit" type="submit">
        Отправить проект
      </Button>
    </form>
  )
}
