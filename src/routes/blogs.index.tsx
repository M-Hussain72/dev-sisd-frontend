import { createFileRoute } from '@tanstack/react-router'
import Blogs from '../component/Blogs'

export const Route = createFileRoute('/blogs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Blogs />
}
