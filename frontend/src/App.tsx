import { AuthCallbackPAge } from './pages/auth-callback/AuthCallbackPage';
import { HomePage } from './pages/home/HomePage';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/auth-callback" element={ <AuthCallbackPAge /> } />
      </Routes>
    </div>
  )
}