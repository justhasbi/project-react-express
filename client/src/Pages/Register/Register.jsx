import { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'

function Register() {
  const [error, setError] = useState("")

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data, e) => {
    e.preventDefault()
    try {
      setError(false)
      const postData = await axios.post('/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password,
        birthdate: data.birthdate
      })
      window.alert("Register Success")
      postData.data && window.location.replace('/login')
      // console.log(postData.data)
    } catch (err) {
      if (err.response.status === 500) {
        setError(err.response.data.result)
        isErrorAvailable()
      }
    }
  }

  const isErrorAvailable = () => {
    if (error) {
      window.alert(error)
    }
  }

  return (
    <div className="register">
      <div className="register-container">
        <span className="register-title">Register</span>
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            autoComplete="off"
            // onChange={e => setUsername(e.target.value)}
            {...register('username', {
              required: true,
              minLength: 6,
              maxLength: 20
            })}
          />
          {/* form validation string */}
          {errors?.username?.type === "required" && <p className="error-string">This field is required</p>}
          {errors?.username?.type === "maxLength" && (<p className="error-string">Username name cannot exceed 20 characters</p>)}
          {errors?.username?.type === "minLength" && (<p className="error-string">username must be more than 6 characters</p>)}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your email"
            // onChange={e => setEmail(e.target.value)}
            {...register('email', { required: true })}
          />
          {/* form validation string */}
          {errors?.email?.type === "required" && <p className="error-string">This field is required</p>}

          <label htmlFor="birthdate">Birth Date</label>
          <input
            type="date"
            id="birthdate"
            // onChange={e => setBirth(e.target.value)}
            {...register('birthdate', { required: true })}
          />
          {/* form validation string */}
          {errors?.email?.type === "required" && <p className="error-string">This field is required</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            // onChange={e => setPass(e.target.value)}
            {...register('password', { required: true })}
          />
          {/* form validation string */}
          {errors?.password?.type === "required" && <p className="error-string">This field is required</p>}
          <button className="register-button" type="submit">Register</button>
        </form>
        <div className="register-button-container">
          <span>Have an account?</span>
          <Link to="/login">
            <span className="register-link">Login here</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register