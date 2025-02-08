import {Component} from 'react'
import {IoCartOutline} from 'react-icons/io5'

import './index.css'

class Navbar extends Component {
  render() {
    const {cartCount} = this.props
    return (
      <nav className="navbar-main-container">
        <h1 className="navbar-title">UNI Resto Cafe</h1>
        <div className="my-orders-container">
          <p className="my-orders-para">My Orders</p>
          <IoCartOutline className="cart-icon" />
          <span className="cart-count">{cartCount}</span>
        </div>
      </nav>
    )
  }
}

export default Navbar
