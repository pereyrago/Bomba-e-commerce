import React from "react";
import imagenes from "./imagenes/imagenes.js";
import s from "./../../../styles/CarouselCard.module.css";

export default function CarouselCard(){
    return(

        <div className={`card ${s.card}`}>
            <img src={imagenes.a} alt = "" className={`card-img-top" alt="" ${s.imagen}`}/>
            <div className="card-body">
                <p className="card-title">Card title</p>
                <p className="card-text"></p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}