import React, {useEffect, useState} from 'react'
import {setProductCatalogAll} from '../../../store/actions/index'
import {connect} from 'react-redux';



function HomePage ({setProductCatalogAll}) {

    useEffect(() => {
        setProductCatalogAll()
    },[])
    
    return (
            <>
                <h1>Productos</h1>
                  
            </>
    )
}

export default connect(null,{setProductCatalogAll})(HomePage);