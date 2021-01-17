import axios from 'axios';
import Authaxios from '../axios'

export const uploadAction = async(image) => {
  const fd = new FormData();
  fd.append('image', image);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  try {
    const res = await Authaxios.post('products/addProduct', fd, config);
  } catch (err) {
    console.log(err);
  }
}
