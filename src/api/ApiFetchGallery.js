import axios from 'axios';

const API_KEY = '34171664-962fcc0ca1a314a1660696e5b';
const BASE_URL = 'https://pixabay.com/api/';

export default async function ApiFetchGallery(query, page) {
  return await axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&
      orientation=horizontal&
      safesearch=true&per_page=12&page=${page}`
    )
    .then(response => response.data);
    
}




