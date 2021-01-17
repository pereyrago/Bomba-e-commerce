import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import s from "./../../../styles/CarouselCard.module.css";
import { useState, useEffect } from "react";
import authAxios from "../../../axios.js";
import {Link} from 'react-router-dom';
import {ratePromedio, setProductInfo, verReview} from './../../../store/actions/index'
import { connect } from "react-redux";

function CarouselTefi({ratePromedio, setProductInfo, verReview}){

const [destacados, setDestacados]=useState([])

  useEffect(() => {
    authAxios.get('products/category/Destacados') 
    .then(ans => (setDestacados(ans.data),console.log(ans.data)))
    .catch(err=> console.log(err))
},[])

  
return (
<div className={s.container}>
  <Carousel
    additionalTransfrom={0}
    arrows={true}
    autoPlay
    autoPlaySpeed={2}
    centerMode={false}
    className={s.carousel}
    containerClass="container-with-dots"
    customTransition="all 1s linear"
    dotListClass=""
    draggable={true}
    focusOnSelect={false}
    infinite
    itemClass=""
    keyBoardControl
    minimumTouchDrag={80}
    renderButtonGroupOutside={false}
    renderDotsOutside={false}
    responsive={{
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024
        },
        items: 4,
        partialVisibilityGutter: 40
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464
        },
        items: 3,
        partialVisibilityGutter: 30
      }
    }}
    showDots={false}
    sliderClass=""
    slidesToSlide={1}
    swipeable
    transitionDuration={5000}
  >
    
      {destacados ? destacados.map ( (destacado) => 

          <div className={`card ${s.card}`}>
          <img src={`http://localhost:3001${destacado.images[0].imgUrl}`} className={`card-img-top" alt="..." ${s.imagen}`}/>
          <div className={`card-body ${s.texto}`}>
              <h5 className={`card-title ${s.titulo}`}>{destacado.name}</h5>
              <Link to="/products/" onClick={()=> (ratePromedio(destacado.id), setProductInfo(destacado.id), verReview(destacado.id))}>
                  <button className={`btn btn-primary ${s.ver}`}>Ver</button>
              </Link>
          </div>
          </div>

      ) : null}
       
    </Carousel>
  </div>
  )
}


export default connect (null, {ratePromedio, setProductInfo, verReview})(CarouselTefi);