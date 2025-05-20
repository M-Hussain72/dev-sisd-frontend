import { createFileRoute } from '@tanstack/react-router';
import InputFelid from '../component/ui/InputFelid';
import { useState, useRef } from 'react';
import Button from '../component/ui/Button';
import Profile from '../component/Profile';
import { RequireAuth } from '../component/helper/RequiredAuth';

export const Route = createFileRoute('/user/profile/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Profile />;
}
