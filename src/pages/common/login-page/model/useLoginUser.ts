import { useMutation } from '@tanstack/react-query'
import { login } from '../api/login'
import { useNavigate } from 'react-router-dom'

export const useLoginUser = () => {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      navigate('/')
      window.location.reload()
    },
  })

  return mutation
}
