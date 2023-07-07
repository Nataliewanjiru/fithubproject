const detailsContainer = document.getElementById("details");
const workoutButton = document.getElementById('workoutButton');
let socials = document.getElementById("socials")

//fetch workout information
fetch('http://localhost:3000/items')
  .then(response => response.json())
  .then(data => 
    { 
  document.getElementById("workoutSite").addEventListener("click",()=>{
        handleWorkoutButton(data)})
    
  workoutButton.addEventListener('click', ()=>{
        handleWorkoutButton(data)
    })
})
  
//Home Button  actions
const homeButton = document.getElementById('homeButton');
homeButton.addEventListener('click', () => {
  handleHomeButtonClick();
});

function handleHomeButtonClick() {
    window.location.href = 'index.html';
}



// Display workPage

function handleWorkoutButton(info){

    socials.innerHTML=" "
    detailsContainer.innerHTML=""
    detailsContainer.removeAttribute("id")
    detailsContainer.className ="workoutBox"

    let wordBox = document.createElement('div')
    wordBox.className = "wordBox"
    let pictureBox = document.createElement("div")
    pictureBox.className = "pictureBox"
   
    for (let i = 0; i < info.length; i++) {
    let activity=info[i].bestThumbnail.url
     let imgElement = document.createElement("img");
     imgElement.src = activity;
     imgElement.className="workoutPictures"
     pictureBox.append(imgElement)

     let h2 = document.createElement("h2")
     h2.textContent=`${info[i].title}`
     h2.className="title" 

     
     let p = document.createElement("p")
     p.innerHTML=`Member attending: ${info[i].attending}`
     p.className="members"
 
     const button =update(info,i,p);

     wordBox.append(h2,p,button)
     
     detailsContainer.append(pictureBox,wordBox)
     
  }
}


// Book Button Update
function update(info, i, p) {
    let button = document.createElement("button");
    button.textContent = "Book Session";
    button.id = "bookButton";
    button.addEventListener("click", () => {
      let id = info[i].id;
      info[i].attending += 1;
      p.innerHTML = `Members attending: ${info[i].attending}`;
      button.innerHTML = "Booked";
  
      fetch(`http://localhost:3000/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ attending: info[i].attending })
      });
    });
    return button;
  }
  

  

  // Question Page
const questionButton = document.getElementById('questionButton');
questionButton.addEventListener('click', () => {
  handleQuestionButtonClick()
});

// function for details that appear on the question home
function handleQuestionButtonClick() {
    socials.innerHTML=""
    detailsContainer.innerHTML=""
    detailsContainer.removeAttribute("class")
    detailsContainer.id="questionBox" 
    detailsContainer.innerHTML=`
    <h1> DO YOU HAVE ANY QUESTIONS ? </h1>
    <form id="form">
    <label for="question" > Question</label>
    <input type="text" name="question" class="input" id="question" placeholder="Write your question?" >
    <br><br><br><br>
    <label for="email" >Email</label>
    <input type="email" placeholder="Let us reach you" name="email" class="input" id="email" >
    <button type="submit" id="submit" value="submit">Submit</button>
    </form>
`
questionSubmit()
}
 

// fuction for submiting the form
function questionSubmit() {
    let form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let quiz = document.getElementById("question").value
      let email =document.getElementById("email").value
      fetch(`http://localhost:3000/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ quiz,email})
      });
      Swal.fire("We'll reach back with a response!");
       form.reset()
    });
  }


  


 // Nutrition Page

const nutriButton = document.getElementById("nutriButton")

  fetch('http://localhost:3000/food')
.then(response=>response.json())
.then(data=>{
  document.getElementById("nutriSite").addEventListener("click",()=>{
    handleNutritionButtonClick(data)
  })
  nutriButton.addEventListener("click",()=>{
    handleNutritionButtonClick(data)
  })
     
})

 
//function that displays page items
  function handleNutritionButtonClick(info) {
        detailsContainer.innerHTML = "";
        detailsContainer.removeAttribute("class")
        detailsContainer.id ="foodBox"
        socials.innerHTML="";
          formSearch()
 
      for (let i = 0; i < info.length; i++) {
          var food = info[i];
          var foodCard = document.createElement("div");
           foodCard.className = "card";
          card(foodCard,food)             
      };
         search(foodCard)
      }
      
      
      
  //Function that displays search button  
  function formSearch(){
        let searchFood =document.createElement("form")
         searchFood.innerHTML =`
        <input id="searchFood" class="search" type="text">
       <button id="foodButton" class="search" >Search</button>`
       detailsContainer.append(searchFood)

      }

//funtion for displaying the cards
 function card(foodCard,food){
    foodCard.innerHTML = `
     <h5>${food.name}</h5>
      <p>Calories: ${food.nutrients.calories}</p>
       <p>Carbohydrates: ${food.nutrients.carbohydrates}</p>
       <p>Protein: ${food.nutrients.protein}</p>
       <p>Fat: ${food.nutrients.fat}</p>
       <p>Fiber: ${food.nutrients.fiber}</p>
       <img src="${food.image}" alt="${food.name}" width="200">
       `;
          detailsContainer.appendChild(foodCard);
    }
    

  // Function for searching  
  function search(foodCard) {
    let button = document.getElementById("foodButton");
    button.addEventListener("click", function(event) {
      event.preventDefault();
      let input = document.getElementById("searchFood").value;
      fetch(`http://localhost:3000/food`)
        .then(response => response.json())
        .then(data => {
          let found = false;
          for (let i = 0; i < data.length; i++) {
            if (input === data[i].name) {
              detailsContainer.innerHTML = "";
              formSearch();
              console.log(data[i].nutrients);
              card(foodCard, data[i]);
              found = true;
            }
          }
          if (!found) {
            handleNutritionButtonClick(data);
          }
        });
    });
  }