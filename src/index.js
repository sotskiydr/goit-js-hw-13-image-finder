import './sass/main.scss';
import pictureMarkup from './templates/markup-pictures.hbs'
import apiService from './js/apiService'

const refs = {
  form : document.querySelector('.search-form'),
  gallery : document.querySelector('.gallery'),
  loadMoreBtn : document.querySelector('.more'),
  body : document.querySelector('body'),
  modalWindow : document.querySelector('.lightbox'),
  modalWindowOverlay : document.querySelector('.lightbox__overlay'),
  modalImage : document.querySelector('.lightbox__image')
}

const API = new apiService();

refs.form.addEventListener('submit' , onSearchPicture);
refs.loadMoreBtn.addEventListener('click' , onLoadMore);
refs.gallery.addEventListener('click' , onClickPicture);

function onSearchPicture (e){
  e.preventDefault();
  onClearMarkup();
  API.value = refs.form.elements.query.value;
  API.resetPage();
  API.fetchImg().then(onRenderMarkup);
  refs.form.reset();
  refs.loadMoreBtn.style.display = 'block';
}


function onLoadMore (){
  API.fetchImg().then(onRenderMarkup)
  setTimeout(handleButtonClick,200)
}

function onRenderMarkup (imgCard){
  const markup = pictureMarkup(imgCard);
  refs.gallery.insertAdjacentHTML('beforeend' , markup);
}

function onClearMarkup () {
  refs.gallery.innerHTML = '';
}

function handleButtonClick() {
  const element = refs.gallery.lastElementChild;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
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