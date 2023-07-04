const loadSavedNewsBtn = document.querySelector("#loadSaved");
const loadNewNewsBtn = document.querySelector("#loadNew");
const dashboard = document.getElementById("dashboard");
const savedNews = document.getElementById("savedNews");
const newNews = document.getElementById("newNews");
let newsText =document.getElementById('news');
const savedNewss=document.getElementById('savedNewsText');
const selectFilter = document.getElementById("newsCategory");
const Key = "k9r15XB6nHXWebziCvGglFlcp632wpLtkB3VF1L4RzXP6A7K";
//this is fetch section
fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${Key}`)
.then((response) => response.json())
.then((json) => {
  renderNews(json);
})
.catch((error)=>{
  console.log(error,"this is errorr")
});

selectFilter.addEventListener("change", function() {
 let selectedCategory = selectFilter.value;
 fetch(`https://api.currentsapi.services/v1/latest-news?category=${selectedCategory}&apiKey=${Key}`)
   .then((response) => response.json())
  .then((json) => {
    console.log(json)
     renderCategoryNews(json);
   });
 });

  //this below section is function which show fetching data

function renderNews(json) {
    let allContent = "";
    let data = json.news;
    //console.log(data);

    for (var i = 0; i < data.length; i++){
      const it = data[i]
   allContent +=  
    `<div class="change">
   <style>
   .change{
      background-color:#303134;
      color: white;
      font-size : 16px;
      border: 3px solid #3c4043;
      border-radius: 20px;
      box-shadow: 0 4px 10px rgba(1, 2, 4, 10);
      transition: transform 0.8s ease;
      
    }
      .change:hover{
        transform: scale(1.1);
      } 
    }
    </style>
    <h4 style="color:orange;font-family:serif">category: ${it.category}</h4>
    <h4 style="color:orange">By ${it.author}</h4> 
    <img src="${it.image}"height="200px" width="100%"></img>
    <p style="color:orange;">Date: ${it.published}</p>
    <p style="color:#dddddd;line-height: 1.5">${it.description}<a href="${it.url}">read more</a></p> 
    <button class="like-button" id="${i}">
    </button>
    </div>`;
  }
   newsText.innerHTML = allContent;
   const buttons = newsText.querySelectorAll('.main .change .like-button');
   for (let i = 0; i < buttons.length; i++) {
     buttons[i].addEventListener('click', function() {
       loveButton(data[buttons[i].id]);
     });
   }
  }
  
  //this is category section

  function renderCategoryNews(json) {
   let allContent = "";
    let data = json.news;
    for (var i = 0; i < data.length; i++){
     const it = data[i]
     allContent +=  
     `<div class="change">
     <style>
     .change{
        background-color:#303134;
        color: white;
        font-size : 15px;
        border: 3px solid #3c4043;
        border-radius: 20px;
        box-shadow: 0 4px 10px rgba(1, 2, 4, 10);
        transition: transform 0.8s ease;
      
      }
        .change:hover{
          transform: scale(1.1);
        } 
      }
      </style>
      <h4 style="color:orange;font-family:serif">category: ${it.category}</h4>
      <h4 style="color:orange">By ${it.author}</h4> 
      <img src="${it.image}"height="200px" width="100%"></img>
      <p style="color:orange">Date: ${it.published}</p>
      <p style="color:#dddddd;line-height: 1.5">${it.description}<a href="${it.url}">read more</a></p> 
      <button class="like-button" id="${i}">
      </button>
      </div>`;
    }
    newsText.innerHTML = allContent;
    const buttons = newsText.querySelectorAll('.main .change .like-button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function() {
        loveButton(data[buttons[i].id]);
      });
    }
  }
function myFunction() {
  newNews.style.display="none";
  savedNews.style.display="none";
  dashboard.style.display="block";
}

loadSavedNewsBtn.addEventListener("click", function() {
  // Code to load saved news
  dashboard.style.display = "none";
  savedNews.style.display = "block";
  document.getElementById('saveNews1').style.backgroundColor = "grey"
 savedNews();
});

loadNewNewsBtn.addEventListener("click", function() {
//  // Code to load new news
 dashboard.style.display = "none";
    newNews.style.display = "block";
   document.getElementById('loadNew1').style.backgroundColor = "grey";
});

//this is button section

function loveButton(data) {
  let author = data.author;
  let description = data.description;
  let url = data.url;
  let image = data.image;
const savedNews = JSON.parse(localStorage.getItem('loveButton')) || [];
 savedNews.push({ author,description,image,url});
localStorage.setItem('loveButton', JSON.stringify(savedNews));

let likeButtons = document.getElementsByClassName('like-button');
  for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('click', function() {
      this.style.backgroundColor = 'red';
    });
  }
}

////this is saved function
//
function savedFunction(){
  const savedNews = JSON.parse(localStorage.getItem('loveButton')) || [];
    let output = '';
   savedNews.forEach(function(element) {
     output += 
      `<div class="change">
      <style>
      .change{
        background-color:#303134;
        color: white;
        font-size : 15px;
        border: 3px solid #3c4043;
        border-radius: 20px;
        box-shadow: 0 4px 10px rgba(1, 2, 4, 10);
        transition: transform 0.8s ease;
      }
        .change:hover{
          transform: scale(1.1);
        } 
      }
      </style>
      <h4 style="color:orange">By ${element.author}</h4>  
      <img src="${element.image}"height="200px" width="100%"></img>
      <p style="color:#dddddd;line-height: 1.5">${element.description}<a href="${element.url}">read more</a></p> 
      <button class="like-button" style="background-color:darkred">
     </button>
      </div>`;
    });    
    document.getElementById('savedNewsText').innerHTML = output;
}
