import React from 'react';
import imgs from "../../imgs/imgs.js";
import s from "./../../../styles/Footer.module.css";
import {Link} from "react-router-dom";


function Footer() {
    return(
        <div className={s.footer}>
            <div className={s.logo}>
                <img className={s.bomba}src={imgs.bomba} alt=""/>
                <p className={s.textBomba}>bomba</p>
            </div>
            <div className={s.contact}>
                <Link to="/contact"><p className={s.contactText}>Contactános</p></Link>
            </div>
            <div>
                <div className={s.instaContainer}>
                    <img className={s.insta} src={imgs.insta} alt=""/>
                </div>
            </div>

        </div>
    )
}

export default Footer;