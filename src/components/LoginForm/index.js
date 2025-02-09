import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({showErrorMsg: false})
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onSubmitSuccess = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    console.log(data)

    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-main-container">
        <div className="sub-form-container">
          <form onSubmit={this.onSubmitSuccess} className="form-container">
            <label className="form-label" htmlFor="username">
              USERNAME
            </label>
            <input
              placeholder="Username"
              value={username}
              onChange={this.getUsername}
              id="username"
              className="form-input"
              type="text"
            />
            <label className="form-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              placeholder="Password"
              value={password}
              onChange={this.getPassword}
              id="password"
              className="form-input"
              type="password"
            />
            <div className="login-button-container">
              <button className="login-button" type="submit">
                Login
              </button>
            </div>
            {showErrorMsg && <p className="error-msg-para">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
