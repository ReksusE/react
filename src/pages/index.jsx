import Hero from '@/sections/Hero'
import Categories from '@/sections/Categories'
import Founder from '@/sections/Founder'
import Realization from '@/sections/Realization'
import Trust from '@/sections/Trust'
import Showroom from '@/sections/Showroom'

export const metadata = {
  title: 'Home',
}

export default () => {
  return (
    <>
      <Hero />
      <Categories />
      <Founder />
      <Realization />
      <Trust />
      <Showroom />
    </>
  )
}
