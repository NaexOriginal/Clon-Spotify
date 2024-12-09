import { axiosInstance } from '@/lib/axios';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

const updateApiToken = (token: string | null) => {
  if (token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete axiosInstance.defaults.headers.common['Authorization'];
}

export const AuthProvider = () => {

  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async() => {
      try {
        const token = await getToken()
        updateApiToken(token)
      } catch (error) {
        
      }
    }
  })

  return (
    <div>AuthProvider</div>
  )
}
