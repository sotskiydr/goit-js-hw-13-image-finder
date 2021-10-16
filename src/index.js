import './sass/main.scss';
import pictureMarkup from './templates/markup-pictures.hbs'
import API from './js/apiService'

const refs = {
  form : document.querySelector('.search-form'),
  gallery : document.querySelector('.gallery'),
  loadMoreBtn : document.querySelector('.more')
}

refs.form.addEventListener('submit' , onSearchPicture);
refs.loadMoreBtn.addEventListener('click' , onLoadMore)

function onSearchPicture (e){
  e.preventDefault();
  const inputValue = refs.form.elements.query.value;
  API.fetchImg(inputValue).then(imgCard => {
    console.log(imgCard)
    onRenderMarkup(imgCard)
  })
  refs.form.reset();
}

function onRenderMarkup (imgCard){
  const markup = pictureMarkup(imgCard);
  console.log(markup)
  refs.gallery.innerHTML = markup;
}

function onLoadMore (){

}