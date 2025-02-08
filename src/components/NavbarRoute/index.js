const NavbarRoute = props => {
  const {cartCount} = props

  return (
    <nav>
      <h1>UNI Resto Cafe</h1>
      <p>My Orders</p>
      <p>{cartCount}</p>
    </nav>
  )
}

export default NavbarRoute
