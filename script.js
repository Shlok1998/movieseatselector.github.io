const container = document.querySelector('.container');
const seat = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieselector = document.querySelector('#movie-selector');
let ticketPrice = +movieselector.value;

populateUI();

// Update movie-selector event
movieselector.addEventListener('change', e => {
   ticketPrice = +e.target.value;
   movieselectIndex(e.target.selectedIndex, e.target.value);
   updateSelectedSeats();
});

// Update on click event
container.addEventListener('click', (e) => {
   if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
      e.target.classList.toggle('selected');
      updateSelectedSeats();
   }
});

// update selected movie index and price
function movieselectIndex(movieIndex, moviePrice) {
   localStorage.setItem('selectedMovieIndex', movieIndex);
   localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update the count and total of seats
function updateSelectedSeats() {
   const selectedSeats = document.querySelectorAll('.row .seat.selected');

   // Copy the selectedSeats into new array 
   // Map through the array
   // using spread operator(...)
   // return a new array 
   const newSeatsIndex = [...selectedSeats].map(seats => [...seat].indexOf(seats));  
   // save the new array in the local storage
   localStorage.setItem('selectedSeats', JSON.stringify(newSeatsIndex));

   const totalSeats = selectedSeats.length;
   count.innerText = totalSeats;
   total.innerText = ticketPrice * totalSeats;
}

// get data from local storage
function populateUI() {
   const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
   if(selectedSeats != null && selectedSeats.length > 0) {
      seat.forEach((seat, index) => {
         if(selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
         }
      })
   }

   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
   movieselector.selectedIndex =  selectedMovieIndex;
}

// Initial count and total of movie 
updateSelectedSeats();