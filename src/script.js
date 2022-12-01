const API_KEY = '0edcf27d-cd4f-4f58-aedc-0c6ec6c354aa'
const URL_TOP_250_BEST_FILMS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1'
const URL_ID = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'
const movies = document.querySelector('.movies')
const modal = document.querySelector('.popup')
const modalClose = document.querySelector('.popup-close')
const modalBody = document.querySelector('.popup-body')


function ShowMovies(data) {

	movies.innerHTML = ''
	data.films.forEach(movie => {
		let ratingColor
		if (+movie.rating >= 7) {
			ratingColor = 'green'
		} else if (+movie.rating >= 4) {
			ratingColor = 'yellow'
		} else if (+movie.rating < 4) {
			ratingColor = 'red'
		}

		const movieElement = document.createElement('div')
		movieElement.classList.add('movie', 'flex', 'flex-col', 'bg-[#161c29]', 'gap-2', 'rounded', 'p-2', 'opacity-80', 'hover:opacity-60', 'cursor-pointer', 'relative')
		movieElement.setAttribute('id', movie.filmId)
		movieElement.innerHTML = `<img src='${movie.posterUrl}' alt='${movie.nameRu}' class='rounded'>
\t\t\t\t<h4 class='text-slate-200'>${movie.nameRu}</h4>
\t\t\t\t<span class='text-main-blue text-sm'>${movie.genres.map((genre) => ` ${genre.genre}`)}</span>
\t\t\t\t<div class='absolute top-4 left-4 ${ratingColor} md:p-2 p-1 rounded'>${movie.rating}</div>`
		movies.append(movieElement)
	})
}

async function moviess(url) {
	const resp = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			'X-API-KEY': API_KEY
		}
	}).catch(reason => {
		console.log(reason)
	})
	const respData = await resp.json()
	ShowMovies(respData)
}

moviess(URL_TOP_250_BEST_FILMS)

movies.addEventListener('click', (event) => {
	if (event.target.closest('.movie')) {
		modal.classList.add('open')
		document.body.style.overflow = 'hidden'
		filmInfoById(event.target.parentElement.getAttribute('id'))
	}
})

document.body.addEventListener('click', (event) => {
	if (event.target.closest('.popup-close')) {
		modal.classList.remove('open')
		document.body.style.overflow = 'auto'
	}
})


document.body.addEventListener('click', (event) => {
	if (event.target.closest('.popup-body')) {
		if (!event.target.closest('.popup-content')) {
			modal.classList.remove('open')
			document.body.style.overflow = 'auto'
		}
	}
})


// Инфа о фильме по айди
async function filmInfoById(id) {
	let url = URL_ID + id
	const resp = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			'X-API-KEY': API_KEY
		}
	}).catch(reason => {
		console.log(reason)
	})
	const respData = await resp.json()
	showFilmById(respData)
}

function showFilmById(data) {
	let color;
	let ratingColor = data.ratingKinopoisk
	let name = data.nameOriginal ? data.nameOriginal : data.nameRu
	color = ratingColor >= 7 ? 'green' : color = ratingColor < 7 && ratingColor >= 4 ? 'yellow' : 'red'

	modalBody.innerHTML = ''
	const modalContent = document.createElement('div')
	modalContent.classList.add('popup-content')
	modalContent.innerHTML = (`
\t\t\t<button class='popup-close btn self-start'>Закрыть</button>
\t\t\t<div class='film-info w-full'>
\t\t\t\t<img src='${data.posterUrl}' alt='' class='max-w-[300px] rounded'>
\t\t\t\t<h3 class='text-3xl font-bold'>${data.nameRu}<span>(${data.year})</span></h3>
\t\t\t\t<div class='text-sm text-gray-500 mr-4'>${name}<span class='ml-2 rounded p-1 ${color} text-white'>${data.ratingKinopoisk}</span></div>
\t\t\t\t<div class='info-text w-full pt-7'>
\t\t\t\t\t<div class='flex justify-between px-4'><div class='w-[142px] gap-12'>Год производства</div> <div class='opacity-60 self-end'>${data.year}</div></div>
\t\t\t\t\t<div class='flex justify-between px-4'><div class='w-[142px] gap-12'>Жанр</div> <div class='opacity-60 self-end'>${data.genres[0].genre}</div></div>
\t\t\t\t\t<div class='flex justify-between px-4'><div class='w-[142px] gap-12'>Страна</div> <div class='opacity-60 self-end'>${data.countries[0].country}</div></div>
\t\t\t\t</div>
\t\t\t\t<div class='self-start mt-4'>
\t\t\t\t\t<h2>Описание фильма</h2>
\t\t\t\t\t<div class='text-white opacity-60'>${data.description}</div>
\t\t\t\t</div>
\t\t\t</div>`)
	modalBody.append(modalContent)
}


