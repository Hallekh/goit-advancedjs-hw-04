// Import the necessary libraries
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Notiflix from 'notiflix';

// Constants
const API_KEY = '42278399-485b72b195d854376bf6ad4cf';
const BASE_URL = 'https://pixabay.com/api/';

// Selectors
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// Initial state
let currentPage = 1;
let searchQuery = '';

// Event listeners
searchForm.addEventListener('submit', searchImages);
loadMoreBtn.addEventListener('click', loadMoreImages);

// Functions
async function searchImages(event) {
  event.preventDefault();

  // Reset pagination
  currentPage = 1;

  // Hide load more button
  loadMoreBtn.style.display = 'none';

  // Get search query
  searchQuery = event.target.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
      position: 'topCenter',
    });
    return;
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 40,
      },
    });

    const { data } = response;

    if (data.hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    renderImages(data.hits);

    if (data.totalHits > 40) {
      loadMoreBtn.style.display = 'block';
    } else {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    searchForm.reset();
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again.',
      position: 'topCenter',
    });
  }
}

async function loadMoreImages() {
  currentPage++;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 40,
      },
    });

    const { data } = response;

    renderImages(data.hits);

    if ((currentPage - 1) * 40 + data.hits.length >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: "Sorry, but you've reached the end of search results.",
      position: 'topCenter',
    });
  }
}

function renderImages(images) {
  if (currentPage === 1) {
    gallery.innerHTML = ''; // Clear gallery before rendering new images
  }
  searchForm.reset();
  images.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('photo-card');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = 'lazy';

    const info = document.createElement('div');
    info.classList.add('info');

    const likes = document.createElement('p');
    likes.classList.add('info-item');
    likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

    const views = document.createElement('p');
    views.classList.add('info-item');
    views.innerHTML = `<b>Views:</b> ${image.views}`;

    const comments = document.createElement('p');
    comments.classList.add('info-item');
    comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

    const downloads = document.createElement('p');
    downloads.classList.add('info-item');
    downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

    info.appendChild(likes);
    info.appendChild(views);
    info.appendChild(comments);
    info.appendChild(downloads);

    card.appendChild(img);
    card.appendChild(info);

    gallery.appendChild(card);
  });
}
