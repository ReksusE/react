const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/

export const validateName = (value) => {
  const name = value.trim()

  if (!name) {return 'Введите имя'}
  if (name.length < 2) {return 'Минимум 2 символа'}

  return ''
}

export const validateEmail = (value) => {
  const email = value.trim()

  if (!email) {return 'Введите email'}
  if (!EMAIL_RE.test(email)) {return 'Некорректный email'}

  return ''
}

export const validatePhone = (value, { required = false } = {}) => {
  if (!value) {return required ? 'Введите телефон' : ''}
  if (!PHONE_RE.test(value)) {return 'Введите номер полностью'}

  return ''
}

export const validatePassword = (value) => {
  if (!value) {return 'Введите пароль'}
  if (value.length < 8) {return 'Минимум 8 символов'}

  return ''
}

/** Оценка надёжности пароля: score 0–4 */
export const getPasswordStrength = (value) => {
  if (!value) {return { score: 0, label: '' }}

  let score = 0

  if (value.length >= 8) {score++}
  if (/[a-zа-я]/.test(value) && /[A-ZА-Я]/.test(value)) {score++}
  if (/\d/.test(value)) {score++}
  if (/[^\p{L}\d]/u.test(value)) {score++}

  score = Math.max(score, 1)

  return { score, label: ['', 'Слабый', 'Средний', 'Хороший', 'Надёжный'][score] }
}
