const loadSavedNewsBtn = document.querySelector("#loadSaved");
const loadNewNewsBtn = document.querySelector("#loadNew");
const dashboard = document.getElementById("dashboard");
const savedNews = document.getElementById("savedNews");
const newNews = document.getElementById("newNews");
let newsText =document.getElementById('news');
const savedNewss=document.getElementById('savedNewsText');
const selectFilter = document.getElementById("newsCategory");

//this is fetch section
fetch('https://inshorts.deta.dev/news?category=all')
.then((response) => response.json())
.then((json) => {
  renderNews(json);
});

selectFilter.addEventListener("change", function() {
  let selectedCategory = selectFilter.value;
  fetch(`https://inshorts.deta.dev/news?category=${selectedCategory}`)
    .then((response) => response.json())
    .then((json) => {
      renderCategoryNews(json);
    });
  });

  //this below section is function which show fetching data

function renderNews(json) {
    let allContent = "";
    let data = json.data;
    let category = json.category;
    for (var i = 0; i < data.length; i++){
      const it = data[i]
      allContent +=  
      `<div class="main" style="background-color:#0f7ecd;color:black;padding:20px;margin:10px;font-family:popins;font-size: 1.2em;">
      <div class="change">
      <style>
      .change{
        background-color:white;
      }
        .change:hover{
          background-color:black;
          color: white;
        } 
      }
      </style>
      <h4 style="color:orange;font-family:serif">category: ${category}</h4>
      <h2 style="color:orange">By ${it.author}</h2> 
      <img src="${it.imageUrl}"height="300" width="500"></img>
      <p style="color:orange">Date: ${it.date}</p>
      <p>${it.content}<a href="${it.url}">read more</a></p> 
      <button class="like-button" id="${i}">
      </button>
      </div>
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
    let data = json.data;
    let category = json.category;
    for (var i = 0; i < data.length; i++){
      const it = data[i]
      allContent +=  
      `<div class="main" style="background-color:#0f7ecd;color:black;padding:20px;margin:10px;font-family:popins;font-size: 1.2em;">
      <div class="change">
      <style>
      .change{
        background-color:white;
      }
        .change:hover{
          background-color:black;
          color: white;
        } 
      }
      </style>
      <h4 style="color:orange;font-family:serif">category: ${category}</h4>
      <h2 style="color:orange">By ${it.author}</h2>
       <img src="${it.imageUrl}"height="300" width="500"></img>
       <p style="color:orange">Date: ${it.date}</p>
      <p>${it.content}<a href="${it.url}">read more</a></p> 
      <button class="like-button" id="${i}">
      </button>
      </div>
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
  // Code to load new news
  dashboard.style.display = "none";
    newNews.style.display = "block";
    document.getElementById('loadNew1').style.backgroundColor = "grey";
});

//this is button section

function loveButton(data) {
  let author = data.author;
  let content = data.content;
const savedNews = JSON.parse(localStorage.getItem('loveButton')) || [];
 savedNews.push({ author,content });
localStorage.setItem('loveButton', JSON.stringify(savedNews));

let likeButtons = document.getElementsByClassName('like-button');
  for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('click', function() {
      this.style.backgroundColor = 'red';
    });
  }
}

//this is saved function

function savedFunction(){
  const savedNews = JSON.parse(localStorage.getItem('loveButton')) || [];
    let output = '';
    savedNews.forEach(function(element) {
      output += 
      `<div style="background-color:#0f7ecd;color:black;padding:20px;margin:10px;font-family:popins;font-size: 1.2em;">
      <div class="change">
      <style>
      .change{
        background-color:white;
      }
        .change:hover{
          background-color:black;
          color: white;
        } 
      }
      </style>
      <h2 style="color:orange">By ${element.author}</h2>  
      <p>${element.content}<a href="${element.url}">read more</a></p> 
      <button class="like-button">
      </button>
      </div>
      </div>`;
    });
    
    document.getElementById('savedNewsText').innerHTML = output;
}
