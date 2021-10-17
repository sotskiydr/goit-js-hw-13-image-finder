import './sass/main.scss';
import pictureMarkup from './templates/markup-pictures.hbs'
import apiService from './js/apiService'

const refs = {
  form : document.querySelector('.search-form'),
  gallery : document.querySelector('.gallery'),
  loadMoreBtn : document.querySelector('.more')
}

const API = new apiService();

refs.form.addEventListener('submit' , onSearchPicture);
refs.loadMoreBtn.addEventListener('click' , onLoadMore)

function onSearchPicture (e){
  e.preventDefault();
  onClearMarkup();
  API.value = refs.form.elements.query.value;
  API.resetPage();
  API.fetchImg().then(onRenderMarkup);
  refs.form.reset();
}


function onLoadMore (){
  API.fetchImg().then(onRenderMarkup)
  setTimeout(handleButtonClick,250)
}

function onRenderMarkup (imgCard){
  const markup = pictureMarkup(imgCard);
  refs.gallery.insertAdjacentHTML('beforeend' , markup);
}

function onClearMarkup () {
  refs.gallery.innerHTML = '';
}

function handleButtonClick() {
  const element = document.querySelector('body');
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}