import Hero from '@/sections/Hero'
import Categories from '@/sections/Categories'
import Founder from '@/sections/Founder'
import Realization from '@/sections/Realization'

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
    </>
  )
}
