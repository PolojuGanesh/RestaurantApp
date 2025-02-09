import {Component} from 'react'
import Navbar from '../Navbar'
import EachCartItem from '../EachCartItem'
import CartContext from '../../context/CartContext'

import './index.css'

class Cart extends Component {
  noItemAddedShopNow = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value

          const clickOnRemoveAllCartItems = () => {
            removeAllCartItems()
          }
          const showEmptyView = cartList.length === 0
          const onRenderRemoveAllButton = () => (
            <>
              {showEmptyView ? null : (
                <div className="remove-all-button-container">
                  <button
                    data-testid="remove"
                    onClick={clickOnRemoveAllCartItems}
                    className="remove-all-button"
                  >
                    Remove All
                  </button>
                </div>
              )}
            </>
          )

          return (
            <>
              <Navbar />
              <div className="cart-container">
                {showEmptyView ? (
                  <div className="cart-empty-view-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                      alt=""
                      className="empty-cart-image"
                    />
                    <p className="cart-empty-heading">Your Cart is Empty</p>
                    <button
                      onClick={this.noItemAddedShopNow}
                      className="shop-now-btn"
                    >
                      Shop Now
                    </button>
                  </div>
                ) : (
                  <div className="cart-content-container">
                    <h1 className="cart-heading">My Cart</h1>
                    {onRenderRemoveAllButton()}
                    <ul className="cart-list">
                      {cartList.map(eachCartItem => (
                        <EachCartItem
                          key={eachCartItem.dishId}
                          cartItemDetails={eachCartItem}
                        />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
