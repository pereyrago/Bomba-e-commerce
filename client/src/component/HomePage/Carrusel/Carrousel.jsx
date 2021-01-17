import React from 'react';
import imgs from "../../imgs/imgs";
import s from "./../../../styles/Carrousel.module.css";


function Carrousel(props) {

    return(
        <div id="carouselExampleFade" class={`carousel slide carousel-fade ${s.marco}`} data-ride="carousel">
            <div className={`carousel-inner ${s.interior}`}>
                 <div className={`carousel-item active ${s.imagen}`}>
                    <img src={imgs.one} class="d-block w-100" alt="..."/>
                </div>
            <div className="carousel-item">
                <img src={imgs.two} className={`carousel-item active ${s.imagen}`} alt="..."/>
            </div>
            
        </div>
        <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
            <span className={`carousel-control ${s.flecha}`} aria-hidden="true"> <img src={imgs.prev}></img> </span>
            <span className={`sr-only ${s.next}`}>Previous</span>
        </a>
        <a className={`carousel-control-next ${s.tef}`} href="#carouselExampleFade" role="button" data-slide="next">
            <span className={`carousel-control ${s.flecha}`} aria-hidden="true"> <img src={imgs.next}></img> </span>
            <span className={`sr-only ${s.next}`}>Next</span>
        </a>
        </div>
    )
}

export default Carrousel;