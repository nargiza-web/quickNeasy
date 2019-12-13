// DOM elements
const createdRecipeList = document.querySelector('.createdRecipe');

const sharedRecipes = document.querySelector('.sharedRecipes');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const allRecipes = document.querySelector('.allRecipes')
const accountDetails = document. querySelector('.account-details');

// setup UI toggle between logged in and logged out
const setupUI = (user) => {
  if(user){
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div> email: ${user.email}</div>
        <div> Logged in as ${doc.data().firstName}</div>
      `;
      accountDetails.innerHTML = html
    })
    //toggle user UI elements
    loggedInLinks.forEach(item => item.style.display ='block');
    loggedOutLinks.forEach(item => item.style.diplsay='none');
  } else {
    // hide account info
    accountDetails.innerHTML = '';
    //toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'none')
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

const showAllRecipes = (recipes) => {
  let html ='';
  recipes.forEach(doc => {
    const list = doc.data();
    const li = `
        <li>
        <div class="collapsible-header grey lighten-4">${list.name}</div>
        <div class="collapsible-body white"> <img style="width:300px; height:auto" src="${list.image}"</div>
        <video  width="300" height="300" controls>
        <source src="${list.url}" ></video>
        </li>
    `;
    html += li;
  })
  allRecipes.innerHTML = html
}

// setup your html and see the data on DOM for shredRecipes
const mySharedRecipes = (data) => {
  if (data.length){
    let html='';
  data.forEach(doc => {
    const list = doc.data();
    const li = `
      <li>
        <button  onclick = "addToFavourites('${list.name}','${list.ingredients}','${doc.id}')">AddtoFav</button>
        <div  class="collapsible-header grey lighten-4">${list.name}</div>
        <div class="collapsible-body white"> <img style="width:300px; height:auto" src="${list.image}"</div>
        <video  width="300" height="300" controls>
        <source src="${list.url}" ></video>
      </li>
    `;
    html += li;
  })
  sharedRecipes.innerHTML = html
  } else {
    sharedRecipes.innerHTML = `<h5 class="center-align">Login to view your shared recipes</h5>`
  }
}

function addToFavourites(name1,ingredients1,id){
  let userID = auth.currentUser.uid;
  //let anotheruser = user.uid;
  db.collection('users').doc(userID)
  .collection("favorites").doc(id)
  .set({
    name: name1
  })
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function(){
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals)
  
   var items = document.querySelectorAll('.collapsible');
   M.Collapsible.init(items);
});

