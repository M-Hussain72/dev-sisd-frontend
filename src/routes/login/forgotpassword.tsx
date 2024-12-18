import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import ForgotPasswordPage from '../../component/ForgotPasswordPage'

export const Route = createFileRoute('/login/forgotpassword')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ForgotPasswordPage />
}
