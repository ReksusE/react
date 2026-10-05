import { useEffect, useState } from 'react'

import Hero from '@/sections/Hero'
import Categories from '@/sections/Categories'
import Founder from '@/sections/Founder'
import Realization from '@/sections/Realization'
import Trust from '@/sections/Trust'
import Showroom from '@/sections/Showroom'

import Modal from '@/components/Modal/Modal'

import usePageTitle from '@/hooks/usePageTitle'

export default function Home() {
  usePageTitle('Home')

  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
    const handleClick = (event) => {
      if (!(event.target instanceof Element)) {
        return
      }

      const trigger = event.target.closest('[data-js-modal-open]')

      if (!trigger) {
        return
      }

      const modalType = trigger.getAttribute('data-js-modal-open')

      if (!modalType) {
        return
      }

      setActiveModal(modalType)
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <>
      <Hero />

      <Categories />

      <Founder />

      <Realization />

      <Trust />

      <Showroom />

      {activeModal && (
        <Modal
          type={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  )
}