import './Button.scss'
import clsx from 'clsx'

export default function Button(props) {
  const { className, type = 'button', href, children, ...rest } = props

  const isLink = href !== undefined
  const Component = isLink ? 'a' : 'button'
  const linkAttributes = { href }
  const buttonAttributes = { type }
  const attributesByTag = isLink ? linkAttributes : buttonAttributes

  return (
    <Component
      className={clsx('button', className)}
      {...attributesByTag}
      {...rest}
    >
      {children}
    </Component>
  )
}
