import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from '../Slider'
import EachItemMenu from '../EachItemMenu'
import Navbar from '../Navbar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    itemsCategoryList: [],
    foodItemsDetails: [],
    activeButton: '',
    itemQuantities: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeData()
  }

  onSuccess = data => {
    const updatedData = data[0].table_menu_list.map(eachCategory => ({
      menuCategory: eachCategory.menu_category,
      menuCategoryId: eachCategory.menu_category_id,
    }))

    const updatedFoodItemDetails = data[0].table_menu_list.map(each => ({
      menuCategoryId: each.menu_category_id,
      menuCategory: each.menu_category,
      categoryDishes: each.category_dishes.map(eachItem => ({
        dishId: eachItem.dish_id,
        dishName: eachItem.dish_name,
        dishPrice: eachItem.dish_price,
        dishImage: eachItem.dish_image,
        dishCurrency: eachItem.dish_currency,
        dishCalories: eachItem.dish_calories,
        dishDescription: eachItem.dish_description,
        dishAvailability: eachItem.dish_Availability,
        hasAddons: eachItem.addonCat && eachItem.addonCat.length > 0,
      })),
    }))

    const initialQuantities = {}
    updatedFoodItemDetails.forEach(category => {
      category.categoryDishes.forEach(dish => {
        initialQuantities[dish.dishId] = 0
      })
    })

    this.setState({
      itemsCategoryList: updatedData,
      foodItemsDetails: updatedFoodItemDetails,
      activeButton: updatedData[0]?.menuCategoryId || '',
      itemQuantities: initialQuantities,
    })
  }

  getHomeData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {method: 'GET'}

    const response = await fetch(url, options)
    if (response.ok) {
      this.setState({apiStatus: apiStatusConstants.success})
      const data = await response.json()
      this.onSuccess(data)
    }
  }

  clickingCategoryButton = id => {
    this.setState({activeButton: String(id)})
  }

  changeItemQuantity = (dishId, itemCount) => {
    this.setState(prevState => {
      const newQuantities = {
        ...prevState.itemQuantities,
        [dishId]: Math.max(itemCount, 0),
      }

      const totalCount = Object.values(newQuantities).reduce(
        (sum, val) => sum + val,
        0,
      )

      return {
        itemQuantities: newQuantities,
        cartCount: totalCount,
      }
    })
  }

  renderSuccessView = () => {
    const {
      foodItemsDetails,
      activeButton,
      itemQuantities,
      itemsCategoryList,
    } = this.state
    const filteredFoodItemsArray = foodItemsDetails.filter(
      each => each.menuCategoryId === activeButton,
    )

    return (
      <>
        <ul className="buttons-ul-list-container">
          {itemsCategoryList.map(each => (
            <Slider
              key={each.menuCategoryId}
              activeButton={activeButton}
              each={each}
              clickingCategoryButton={this.clickingCategoryButton}
            />
          ))}
        </ul>
        <ul className="food-menu-ul-container">
          {filteredFoodItemsArray.map(each =>
            each.categoryDishes.map(eachItem => (
              <EachItemMenu
                key={eachItem.dishId}
                eachItem={eachItem}
                itemQuantity={itemQuantities[eachItem.dishId] || 0}
                changeItemQuantity={this.changeItemQuantity}
              />
            )),
          )}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="ThreeDots" height="50" width="50" color="blue" />
    </div>
  )

  renderSwitchCase = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-main-container">
        <Navbar />
        {this.renderSwitchCase()}
      </div>
    )
  }
}

export default Home
