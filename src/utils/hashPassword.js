import sha256 from './sha256'

/** Хеш пароля с «солью» в виде email. */
export default function hashPassword(email, password) {
  return sha256(`artkante:${email.trim().toLowerCase()}:${password}`)
}
