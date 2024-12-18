import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/payment/checkout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/payment/checkout"!</div>
}
