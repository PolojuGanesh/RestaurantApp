import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoCartOutline} from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'

import './index.css'

class Navbar extends Component {
  clickOnLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          return (
            <nav className="navbar-main-container">
              <Link className="navbar-header-link" to="/">
                <h1 className="navbar-title">UNI Resto Cafe</h1>
              </Link>
              <div className="my-orders-container">
                <p className="my-orders-para">My Orders</p>
                <Link to="/cart" className="navbar-header-link">
                  <button className="cart-header-button" type="button">
                    <IoCartOutline className="cart-icon" />
                  </button>
                </Link>
                <p className="cart-count">{cartList.length}</p>
                <button
                  onClick={this.clickOnLogout}
                  type="button"
                  className="logout"
                >
                  Logout
                </button>
                <button
                  onClick={this.clickOnLogout}
                  type="button"
                  className="mobile-logout"
                >
                  <FiLogOut className="cart-icon" />
                </button>
              </div>
            </nav>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(Navbar)
