// import {Component} from 'react'

// import NavbarRoute from '../NavbarRoute'

// class HomeRoute extends Component {
//   state = {cafeData: []}

//   componentDidMount() {
//     this.getData()
//   }

//   onSuccess = data => {
//     const updatedData = data.map(each => ({
//       menuCategory: each.menu_category,
//       menuCategoryId: each.menu_category_id,
//       menuCategoryImage: each.menu_category_image,
//       categoryDishes: each.category_dishes.map(eachOne => ({
//         dishId: eachOne.dish_id,
//         dishAvailability: eachOne.dish_Availability,
//         dishType: eachOne.dish_Type,
//         dishCalories: eachOne.dish_calories,
//         dishCurrency: eachOne.dish_currency,
//         dishDescription: eachOne.dish_description,
//         dishImage: eachOne.dish_image,
//         dishName: eachOne.dish_name,
//         dishPrice: eachOne.dish_price,
//         addonCat: eachOne.addonCat,
//       })),
//     }))

//     console.log(updatedData)

//     this.setState({cafeData: updatedData})
//   }

//   getData = async () => {
//     const url = `https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details`
//     const options = {
//       method: 'GET',
//     }

//     const response = await fetch(url, options)
//     const data = await response.json()
//     this.onSuccess(data[0].table_menu_list)
//   }

//   render() {
//     return (
//       <>
//         <NavbarRoute />
//         <div>
//           <h1>HomeRoute</h1>
//         </div>
//       </>
//     )
//   }
// }

// export default HomeRoute
import {Component} from 'react'
import NavbarRoute from '../NavbarRoute'

class HomeRoute extends Component {
  state = {
    cafeData: [],
    activeCategory: '',
    cartCount: 0,
    dishQuantities: {},
  }

  componentDidMount() {
    this.getData()
  }

  onSuccess = data => {
    const updatedData = data.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      categoryDishes: each.category_dishes.map(eachOne => ({
        dishId: eachOne.dish_id,
        dishAvailability: eachOne.dish_Availability,
        dishType: eachOne.dish_Type,
        dishCalories: eachOne.dish_calories,
        dishCurrency: eachOne.dish_currency,
        dishDescription: eachOne.dish_description,
        dishImage: eachOne.dish_image,
        dishName: eachOne.dish_name,
        dishPrice: eachOne.dish_price,
        addonCat: eachOne.addonCat,
      })),
    }))

    // Initialize dish quantities to 0
    const dishQuantities = {}
    updatedData.forEach(category => {
      category.categoryDishes.forEach(dish => {
        dishQuantities[dish.dishId] = 0
      })
    })

    this.setState({
      cafeData: updatedData,
      activeCategory: updatedData[0]?.menuCategory || '',
      dishQuantities,
    })
  }

  getData = async () => {
    const url = `https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    this.onSuccess(data[0].table_menu_list)
  }

  handleCategoryClick = category => {
    this.setState({activeCategory: category})
  }

  handleIncrement = dishId => {
    const {dishQuantities, cartCount} = this.state
    const updatedQuantities = {...dishQuantities}
    updatedQuantities[dishId] = (updatedQuantities[dishId] || 0) + 1

    this.setState({
      dishQuantities: updatedQuantities,
      cartCount: cartCount + 1,
    })
  }

  handleDecrement = dishId => {
    const {dishQuantities, cartCount} = this.state
    const updatedQuantities = {...dishQuantities}

    if (updatedQuantities[dishId] > 0) {
      updatedQuantities[dishId] -= 1
      this.setState({
        dishQuantities: updatedQuantities,
        cartCount: cartCount - 1,
      })
    }
  }

  renderDish = dish => {
    const {dishQuantities} = this.state
    const quantity = dishQuantities[dish.dishId] || 0

    return (
      <div key={dish.dishId} className="dish-item">
        <img src={dish.dishImage} alt={dish.dishName} className="dish-image" />
        <div className="dish-details">
          <h3>{dish.dishName}</h3>
          <p>
            {dish.dishCurrency} {dish.dishPrice}
          </p>
          <p>{dish.dishDescription}</p>
          <p>{dish.dishCalories} calories</p>
          {dish.addonCat.length > 0 && <p>Customizations available</p>}
          {!dish.dishAvailability && <p>Not available</p>}
          {dish.dishAvailability && (
            <div className="quantity-controls">
              <button
                type="button"
                onClick={() => this.handleDecrement(dish.dishId)}
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                type="button"
                onClick={() => this.handleIncrement(dish.dishId)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  render() {
    const {cafeData, activeCategory, cartCount} = this.state
    const activeCategoryData = cafeData.find(
      category => category.menuCategory === activeCategory,
    )

    return (
      <>
        <NavbarRoute cartCount={cartCount} />
        <div className="home-route">
          <div className="category-tabs">
            {cafeData.map(category => (
              <button
                type="button"
                key={category.menuCategoryId}
                onClick={() => this.handleCategoryClick(category.menuCategory)}
                className={
                  activeCategory === category.menuCategory ? 'active' : ''
                }
              >
                {category.menuCategory}
              </button>
            ))}
          </div>
          <div className="dish-list">
            {activeCategoryData?.categoryDishes.map(dish =>
              this.renderDish(dish),
            )}
          </div>
        </div>
      </>
    )
  }
}

export default HomeRoute
