const BASE_URL  = 'https://pixabay.com/api/?image_type=photo?image_type=photo&orientation=horizontal&per_page=12';
const KEY = '&key=23877606-1096bee22002de3079c9510e6';


function fetchImg(value,page){
  return fetch(`${BASE_URL}&q=${value}&=${page}${KEY}`)
    .then(response => {
      return response.json()
    })
}
export default { fetchImg }

// class apiService {
//   constructor() {
//
//   }
//
//   fetchImg(value,page){
//     return fetch(`${BASE_URL}&q=${value}&=${page}${KEY}`)
//       .then(response => {
//         return response.json()
//       })
//   }
// }