import './index.css'

const Slider = props => {
  const {each, activeButton, clickingCategoryButton} = props
  const {menuCategory, menuCategoryId} = each

  const changeActiveButton = () => {
    clickingCategoryButton(menuCategoryId)
  }

  return (
    <li className="each-button-list">
      <button
        onClick={changeActiveButton}
        className={
          activeButton === menuCategoryId
            ? 'change-each-button-slider'
            : 'each-button-slider'
        }
        type="button"
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default Slider
