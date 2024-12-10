import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { AuthCallbackPage } from './pages/auth-callback/AuthCallbackPage';
import { HomePage } from './pages/home/HomePage';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/sso-callback" element={ <AuthenticateWithRedirectCallback 
          signUpForceRedirectUrl={'/auth-callback'}
        /> } />
        <Route path="/auth-callback" element={ <AuthCallbackPage /> } />
      </Routes>
    </div>
  )
}