import Button from '@/components/Button/Button'
import Field from '@/components/Field/Field'
import ModalPrivacy from './ModalPrivacy'

export default function ModalContactForm() {
  return (
    <form
      className="modal__form"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field
        className="modal__input"
        label="Ваше имя"
        type="text"
        placeholder="Введите имя"
        isRequired
      />

      <Field
        className="modal__input"
        label="Телефон"
        type="tel"
        placeholder="+7 (___) ___-__-__"
        inputMode="tel"
        isRequired
        mask="+7 (999) 999-99-99"
      />

      <ModalPrivacy />

      <Button className="modal__btn" type="submit">
        Отправить
      </Button>
    </form>
  )
}
