import React from "react"
import "./Header.css"
import Head from "./Head"
import Searchbarr from "./Search"
import Navbar from "./Navbar"

const Header = ({ CartItem }) => {
  return (
    <>
      <Head />
      <Searchbarr CartItem={CartItem} />
      <Navbar />
    </>
  )
}

export default Header
