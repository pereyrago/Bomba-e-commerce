import React, {useEffect} from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {connect} from 'react-redux';


function BoxRate({promedio}) {
  
  useEffect(()=>{},[promedio])


  return (
    
    <Box component="fieldset" mb={3} borderColor="transparent">
      {promedio ?
        <Rating name="half-rating-read" value={promedio*1} precision={0.25} readOnly /> 
        : null}
    </Box>

  )

}

 const mapStateToProps = (state) => {
  return {
      promedio: state.ratePromedio
  };
}; 

export default connect (mapStateToProps, null)(BoxRate);