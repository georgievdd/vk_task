import { useEffect } from 'react'
import { Router } from 'router'
import authService from 'service/auth_service'

const App = () => {
  useEffect(() => {
    authService.tryMe()
  }, [])
  return <Router/>
}

export default App