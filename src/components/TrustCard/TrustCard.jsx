import clsx from 'clsx'
import Icon from '@/components/Icon'
import { Image } from 'minista'

export default function TrustCard(props) {
  const { name, image, socials = [], i18n, delay = 1 } = props

  return (
    <article className={clsx('trust__item', `reveal reveal-delay-${delay}`)}>
      <div className="trust__image">
        <Image src={image}/>

      </div>
      <div className="trust__footer">
        <h3 className="trust__name" data-i18n={i18n}>
          {name}
        </h3>
        {socials.length > 0 && (
          <div className="trust__socials">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href || '#'}
                className="trust__social-link"
                aria-label={social.label}
              >
                <Icon name={social.icon} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}