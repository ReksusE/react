import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

/**
 * Поле с маской +375 (XX) XXX-XX-XX. Подключается к MUI TextField
 * через slotProps.input.inputComponent.
 */
const PhoneInput = forwardRef(function PhoneInput({ onChange, name, ...rest }, ref) {
  return (
    <IMaskInput
      {...rest}
      mask="+{375} (00) 000-00-00"
      inputRef={ref}
      inputMode="tel"
      onAccept={(value) => onChange({ target: { name, value } })}
      overwrite
    />
  )
})

export default PhoneInput
