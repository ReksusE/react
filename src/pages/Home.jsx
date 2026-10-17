import Hero from '@/sections/Hero'
import Categories from '@/sections/Categories'
import Founder from '@/sections/Founder'
import Realization from '@/sections/Realization'
import Trust from '@/sections/Trust'
import Showroom from '@/sections/Showroom'
import usePageTitle from '@/hooks/usePageTitle'

export default function Home() {
  usePageTitle('Home')

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
