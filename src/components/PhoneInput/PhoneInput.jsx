import { useEffect, useRef } from 'react'
import IMask from 'imask'

/** Поле телефона с маской +375 (XX) XXX-XX-XX (imask). */
export default function PhoneInput({ value, onChange, ...rest }) {
  const inputRef = useRef(null)
  const maskRef = useRef(null)
  const onChangeRef = useRef(onChange)

  onChangeRef.current = onChange

  useEffect(() => {
    const mask = IMask(inputRef.current, { mask: '+{375} (00) 000-00-00' })

    mask.on('accept', () => onChangeRef.current(mask.value))
    maskRef.current = mask

    return () => mask.destroy()
  }, [])

  useEffect(() => {
    if (maskRef.current && maskRef.current.value !== value) {
      maskRef.current.value = value
    }
  }, [value])

  return <input ref={inputRef} type="tel" inputMode="tel" defaultValue={value} {...rest} />
}
