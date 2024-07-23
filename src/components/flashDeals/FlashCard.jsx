import React, { useState, useEffect, useRef } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const SampleNextArrow = (props) => {
  const { onClick, onMouseEnter, onMouseLeave } = props;
  return (
    <div className='control-btn' onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick, onMouseEnter, onMouseLeave } = props;
  return (
    <div className='control-btn' onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  );
};

const FlashCard = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0)
  const [isHoveringNext, setIsHoveringNext] = useState(false);
  const [isHoveringPrev, setIsHoveringPrev] = useState(false);
  const [iscardHover, setIscardHover] = useState(true);
  const sliderRef = useRef(null);
  const imageSliderRef = useRef(null);

  useEffect(() => {
    let interval;
    if (sliderRef.current) {
      if (isHoveringNext) {
        interval = setInterval(() => {
          sliderRef.current.slickNext();
        }, 500);
      } else if (isHoveringPrev) {
        interval = setInterval(() => {
          sliderRef.current.slickPrev();
        }, 500);
      } else {
        clearInterval(interval);
      }
    }
    return () => clearInterval(interval);
  }, [isHoveringNext, isHoveringPrev]);

  

  const increment = () => {
    setCount(count + 1)
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow
      onMouseEnter={() => setIsHoveringNext(true)}
      onMouseLeave={() => setIsHoveringNext(false)}
    />,
    prevArrow: <SamplePrevArrow
      onMouseEnter={() => setIsHoveringPrev(true)}
      onMouseLeave={() => setIsHoveringPrev(false)}
    />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  const renderSlider = ({productItems}) => {
    return(
    <Slider
      {...imageSliderSettings}
      ref={imageSliderRef}
      key={productItems.id}
    >
      {productItems.images.map((image, index) => (
        <img src={image} alt="" key={index} />
      ))}
    </Slider>
    )
  }
  let imageSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    autoplaySpeed: 2300,
    hovertoPause: true
  };

  return (
    <>
      <Slider {...settings} ref={sliderRef}>
        {productItems.map((productItems, index) => {
          return (
            <div className='box'>
              <div className='product mtop'>
                <div className='img' onMouseEnter={() => { setIscardHover(true) }}
                  onMouseLeave={() => setIscardHover(false)}>
                  <span className='discount'>{productItems.discount}% Off</span>
                  {renderSlider({productItems})}
                  <div className='product-like'>
                    <label>{count}</label> <br />
                    <i className='fa-regular fa-heart' onClick={increment}></i>
                  </div>
                </div>
                <div className='product-details'>
                  <h3>{productItems.name}</h3>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                  </div>
                  <div className='price'>
                    <h4>Rs.{productItems.price}.00 </h4>
                    <button onClick={() => addToCart(productItems)}>
                      <i className='fa fa-plus'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </>
  )
}

export default FlashCard
