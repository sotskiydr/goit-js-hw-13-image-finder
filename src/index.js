import './sass/main.scss';
import pictureMarkup from './templates/markup-pictures.hbs'
import apiService from './js/apiService'
import refs from './js/refs.js'

const API = new apiService();

refs.form.addEventListener('submit' , onSearchPicture);
refs.gallery.addEventListener('click' , onClickPicture);

function onSearchPicture (e){
  e.preventDefault();
  onClearMarkup();
  API.value = refs.form.elements.query.value;
  API.resetPage();
  API.fetchImg().then(onRenderMarkup);
  refs.form.reset();
}

function onRenderMarkup (imgCard){
  const markup = pictureMarkup(imgCard);
  refs.gallery.insertAdjacentHTML('beforeend' , markup);
}

function onClearMarkup () {
  refs.gallery.innerHTML = '';
}

function onClickPicture (e){
  if(!e.target.classList.contains('picture')){
    return
  }
  const elem = e.target.getAttribute('large-image');
  onOpenModalWindow(elem)
  onCloseModalWindow();
}

function onOpenModalWindow (data){
  refs.modalWindow.classList.add('is-open');
  refs.modalImage.src = data;
}

function onCloseModalWindow (){
  refs.modalWindowOverlay.addEventListener('click' , () => {
    refs.modalWindow.classList.remove('is-open')
    refs.modalImage.src = '';
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      refs.modalWindow.classList.remove('is-open');
      refs.modalImage.src = '';
    }
  })
}

function observer() {
  const options = {
    rootMargin: '100px',
  };
  const observer = new IntersectionObserver(callback, options);

  function callback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && API.value !== '') {
        if(API.page > 41){
          API.onError(`No more data for '${API.value}'`);
          return
        }
        API.fetchImg().then(onRenderMarkup);
        API.incrementPage();
      }
    });
  }
  const galleryItem = document.querySelector('.observer');
  observer.observe(galleryItem)
}
observer();