
import React, {useEffect} from 'react'
import Catalog from './Catalogo/Catalog.jsx';
import {connect} from 'react-redux';
import {setProductCatalogAll} from '../store/actions/index'




function ContainerCatalogo (props) {    
  useEffect(() => {
    props.setProductCatalogAll()
  },[]) 
  
  useEffect(() => {
    },[props.productsCatalog])
      return (
            <>
             {props.productsCatalog.length ?
            <div>
                <Catalog />
            </div> : null
          }
                  
            </>
    )
}
const mapStateToProps = (state) => {
  return {
      productsCatalog: state.productsCatalog
  };
};

export default connect(mapStateToProps,{setProductCatalogAll})(ContainerCatalogo);

