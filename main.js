

/*fetch('https://youtube-search-results.p.rapidapi.com/youtube-search/?q=Chloe%20ting', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ee4c792694mshd52ba5e7e0c6defp1c4104jsn50353bd0a202',
    'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
*/




const homeButton = document.getElementById('homeButton');
const aboutButton = document.getElementById('aboutButton');

homeButton.addEventListener('click', () => {
  handleHomeButtonClick();
});

progressButton.addEventListener('click', () => {
  handleProgressButtonClick();
});

function handleHomeButtonClick() {
    window.location.href = 'index.html';
}

function handleProgressButtonClick() {
  console.log('About button clicked');
  document.getElementById("details").innerHTML=""
}
