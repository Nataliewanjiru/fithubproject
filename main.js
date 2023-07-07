const detailsContainer = document.getElementById("details");
const workoutButton = document.getElementById('workoutButton');
let socials = document.getElementById("socials")

fetch('http://localhost:3000/items')
  .then(response => response.json())
  .then(data => 
    { 
  workoutButton.addEventListener('click', ()=>{
        handleWorkoutButton(data)
    })
})
  
//Home Button  
const homeButton = document.getElementById('homeButton');
homeButton.addEventListener('click', () => {
  handleHomeButtonClick();
});

function handleHomeButtonClick() {
    window.location.href = 'index.html';
}



// Display workPage
function handleWorkoutButton(info){
    
    detailsContainer.innerText=""
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

function handleQuestionButtonClick() {
    socials.innerHTML=""
    detailsContainer.innerText=""
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
.then(data=>
     handleNutritionButtonClick(data)
    )

    function handleNutritionButtonClick(info) {
      nutriButton.addEventListener("click", () => {
        detailsContainer.innerHTML = "";
        detailsContainer.id ="foodBox"
        socials.innerHTML="";
        
        let h1 =document.createElement("h1")
         h1.innerText="Feel Free To find your Portions"
         detailsContainer.append(h1)
        
         for (let i = 0; i < info.length; i++) {
          const food = info[i];
          const foodCard = document.createElement("div");
          foodCard.className = "card";
          
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
      });
    }
    