import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = ({ CartItem }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const search = document.querySelector(".search");
      if (search) {
        search.classList.toggle("active", window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Inline styles
  const styles = {
    search: {
      width: '100%',
      backgroundColor: '#f5f5f5',
      transition: 'background-color 0.3s ease',
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    searchActive: {
      backgroundColor: '#ddd',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
    },
    logo: {
      flex: 1,
    },
    searchBox: {
      display: !isSmallScreen ? 'flex' : 'none',
      alignItems: 'center',
      position: 'relative',
      flex: 2,
    },
    searchIcon: {
      position: 'absolute',
      left: '2px',
      // right:"10px"
    },
    searchInput: {
      width: '100%',
      padding: '10px 40px 10px 60px',
      border: '1px solid #ccc',
      borderRadius: '20px',
      outline: 'none',
    },
    icon: {
      display: !isSmallScreen ? 'flex' : 'none',
      alignItems: 'center',
      gap: '15px',
    },
    iconSmall: {
      display: isSmallScreen ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      position: 'relative',
      transform: 'translateX(100px)', // Moves the search icon towards the right

    },
    cart: {
      position: 'relative',
    },
    badge: {
      backgroundColor: 'crimson',
      color: 'white',
      padding: '2px 6px',
      borderRadius: '50%',
      fontSize: '12px',
      position: 'absolute',
      top: '-5px',
      right: '-10px',
    },
  };

  return (
    <section className='search' style={{ ...styles.search, ...(window.scrollY > 100 ? styles.searchActive : {}) }}>
      <div className='container' style={styles.container}>
        <div className='logo' style={styles.logo}>
          <h1 style={{ color: "crimson", fontStyle: "italic" }}>React Store</h1>
        </div>

        <div className='search-box' style={styles.searchBox}>
          <i className='fa fa-search' style={styles.searchIcon}></i>
          <input type='text' placeholder='Search and hit enter...' style={styles.searchInput} />
        </div>

        <div className='icon' style={styles.icon}>
          <i className='fa fa-user icon-circle'></i>
          <div className='cart' style={styles.cart}>
            <Link to='/cart'>
              <i className='fa fa-shopping-bag icon-circle'></i>
              <span style={styles.badge}>{CartItem.length === 0 ? "" : CartItem.length}</span>
            </Link>
          </div>
        </div>

        <div className='icon-small' style={styles.iconSmall}>
          <i className='fa fa-search'></i>
        </div>
      </div>
    </section>
  );
};

export default Search;
