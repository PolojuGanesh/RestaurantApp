import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {cartList: []}

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    this.setState(prevState => {
      const productObject = prevState.cartList.find(
        eachItem => eachItem.dishId === product.dishId,
      )

      if (productObject) {
        return {
          cartList: prevState.cartList.map(eachItem =>
            eachItem.dishId === product.dishId
              ? {
                  ...eachItem,
                  itemQuantity: eachItem.itemQuantity + product.itemQuantity,
                }
              : eachItem,
          ),
        }
      }
      return {cartList: [...prevState.cartList, product]}
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state

    this.setState({cartList: cartList.filter(each => each.dishId !== id)})
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each =>
        each.dishId === id
          ? {...each, itemQuantity: each.itemQuantity + 1}
          : each,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem =>
        eachItem.dishId === id
          ? {
              ...eachItem,
              itemQuantity:
                eachItem.itemQuantity > 1 ? eachItem.itemQuantity - 1 : 1,
            }
          : eachItem,
      ),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
