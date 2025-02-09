import CartContext from '../../context/CartContext'

import './index.css'

const EachItemMenu = props => {
  const {eachItem, itemQuantity, changeItemQuantity} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    hasAddons,
  } = eachItem

  const decreaseQuantity = () => {
    if (itemQuantity > 0) {
      changeItemQuantity(dishId, itemQuantity - 1)
    }
  }

  const increaseQuantity = () => {
    changeItemQuantity(dishId, itemQuantity + 1)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...eachItem, itemQuantity})
        }

        return (
          <li className="dish-each-sub-container">
            <div className="red-or-green-and-dish-info-container">
              <div className="dish-info-container">
                <h1 className="item-title">{dishName}</h1>
                <p className="price">{`${dishCurrency} ${dishPrice}`}</p>
                <p className="dish-description">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="counter-container">
                    <button
                      onClick={decreaseQuantity}
                      type="button"
                      className="minus-button"
                    >
                      -
                    </button>
                    <p className="count-para">{itemQuantity}</p>
                    <button
                      onClick={increaseQuantity}
                      type="button"
                      className="plus-button"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <h1 className="not-available">Not available</h1>
                )}
                {hasAddons && (
                  <p className="customizations">Customizations available</p>
                )}
              </div>
              {itemQuantity > 0 && (
                <button
                  onClick={onClickAddToCart}
                  className="add-to-cart-button"
                  type="button"
                >
                  ADD TO CART
                </button>
              )}
            </div>
            <div className="dish-image-and-calories-container">
              <div className="calories-container">
                <p className="calories-para">{`${dishCalories} Calories`}</p>
              </div>
              <div className="dish-image-container">
                <img className="dish-image" src={dishImage} alt={dishName} />
              </div>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default EachItemMenu
