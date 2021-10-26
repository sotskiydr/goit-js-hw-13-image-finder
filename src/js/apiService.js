import pnotify from './pnotify';
export default class apiService {
  constructor() {
    this.value = '';
    this.page = 1;
  }

  async fetchImg(){
    const KEY = '23877606-1096bee22002de3079c9510e6';
    const BASE_URL  = 'https://pixabay.com/api/?image_type=photo?image_type=photo&orientation=horizontal&per_page=12';
    const url = `${BASE_URL}&q=${this.value}&page=${this.page}&key=${KEY}`;
    return await fetch(url)
      .then(r => {
        if(r.status === 400) this.onError();
        return r.json();
      })
      .then(data => {
        this.checkError = true;
        return data;
    }).catch(this.onError)
  }

  incrementPage(){
    this.page += 1
  }

  resetPage(){
    this.page = 1;
  }

  onError(message){
    pnotify({
      title: 'Error 😱',
      text: message,
      delay: 2000,
    });
  }
}