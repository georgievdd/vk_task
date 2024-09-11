import LockIcon from 'components/icons/lock'
import Input from 'components/ui/input'
import useInput from 'components/ui/input/use-input'
import { useCallback, useEffect, useState } from 'react'
import { PageComponent, Permission } from 'types/page'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import authService from 'service/auth_service'
import alert from 'components/alert'

const SigninPage: PageComponent = () => {
  const [lockState, setLockState] = useState(0)
  const navigate = useNavigate()
  const email = useInput()
  const password = useInput()

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const credentials = {email: email.value, password: password.value}
    authService.signin({...credentials, username: ''})
    .then(() => {
      setLockState(1)
      setTimeout(() => {
        navigate('/')
      }, 500)
    })
    .catch(error => {
      console.log(error);
      alert(error.response?.data?.message)
      setLockState(2)
    })
  }, [email.value, password.value])

  return (
    <div className='auth-container shadow'>
      <div className='auth-lock'>
        <LockIcon lockState={lockState} setLockState={setLockState}/>
      </div>
      <form className='auth-form' onSubmit={onSubmit}>
        <div>
          <h3 className='form-label'>Email</h3>
          <Input type='email' {...email}/>
        </div>
        <div>
          <h3 className='form-label'>Password</h3>
          <Input type='password' {...password}/>
        </div>
        <div>
          <Button style={{
            fontFamily: 'Quicksand, sans-serif',
            width: '100%',
            backgroundColor: 'rgba(111,231,151,0.6)',
            color: 'black'
          }} variant='contained' color='primary' type='submit'>SIGNIN</Button>
        </div>
        <p>Don't have an account? <Link to='/signup'>signup</Link></p>
      </form>
    </div>
  )
}

SigninPage.permission = Permission.ALL

export default SigninPage