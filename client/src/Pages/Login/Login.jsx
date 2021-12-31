import axios from 'axios'
import { useContext } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'
import './login.css'

function Login() {
  const userRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching } = useContext(Context)

  console.log(passwordRef)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({
      type: "LOGIN_START"
    })
    try {
      const res = await axios.post("/auth/login/", {
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data
      })
      window.location.replace('/')
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
      })
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <span className="login-title">LOGIN</span>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="loginInput"
            placeholder="Enter your username"
            ref={userRef}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            ref={passwordRef}
          />
          <button className="login-button" type="submit" disabled={isFetching}>Login</button>
        </form>
        <div className="register-button-container">
          <span>Didn't have an account?</span>
          <Link to="/register">
            <span className="register-link">Register here</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
