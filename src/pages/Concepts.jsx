import Concepts from '@/sections/Concept'
import Showroom from '@/sections/Showroom'
import usePageTitle from '@/hooks/usePageTitle'

export default function ConceptsPage() {
  usePageTitle('Concept')

  return (
    <>
      <Concepts />
      <Showroom />
    </>
  )
}
