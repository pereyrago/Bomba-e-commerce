import React from 'react';
import ProductCard from './ProductCard/ProductCard';
import {connect} from 'react-redux';
import s from './../../styles/catalog.module.css'


function Catalog ({productsCatalog, category}){
    return (
        <div className={s.box}>
            <div className={s.ProductCard}>
            <div className={s.Categories}>{category || 'Catalogo'}</div>
                {productsCatalog.map( product => 
                        
                        <ProductCard  name={ product.name} price={product.price} description={product.description}
                        key={product.id} id={product.id} images={product.images} stock={product.stock}/>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productsCatalog: state.productsCatalog,
        category: state.category
    };
  };

export default connect(mapStateToProps,null)(Catalog);