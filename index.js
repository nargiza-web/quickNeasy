// DOM elements
const createdRecipeList = document.querySelector('.createdRecipe');
const listofFavourites = document.querySelector('.listofFavourites');
const mymy = document.getElementById('mymy');
const sharedRecipes = document.querySelector('.sharedRecipes');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
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
    loggedOutLinks.forEach(item => item.style.display='none');
  } else {
    // hide account info
    accountDetails.innerHTML = '';
    //toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'none')
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

// setup your html and see the data on DOM for shredRecipes
const mySharedRecipes = (data) => {
  if (data.length){
    let html='';
  data.forEach(doc => {
    const list = doc.data();
    const x = doc._key.path.segments[6];
    const li = `
      <li >
        <div style="width:175px"><input  onclick="showpic('${list.image}','${list.ingredients}','${list.name}','${list.preparation}','${list.servings}','${list.url}')" style="margin:25px 10px 3px 0px;float:left;width:100px;" type="image" src="${list.image}" onerror="this.onerror=null;this.src='https://via.placeholder.com/200';" ><span style="clear:left;display:block;text-align:left;padding:5px 15px 5px 0px">${list.name}</span></div>
        <button   onclick = "addToFavourites('${list.image}','${list.ingredients}','${list.name}','${list.preparation}','${list.servings}','${list.url}', '${doc.id}')">AddtoFav</button>
      </li>
    `;
    
    html += li;    
  })
  sharedRecipes.innerHTML = html
  } else {
    sharedRecipes.innerHTML = `<h5 class="center-align">Login to view your shared recipes</h5>`
  }
}

// function showpic(thePicture, ingred1, name, prep1, serve, urls) {
//   document.getElementById("allPicture").src = `${thePicture}`;
//   document.getElementById("allVideo").src = `${urls}`;
//   document.getElementById("allVideo").style.visibility = "visible"
//   document.getElementById("allName").innerHTML = "Name: " + name;
//   let array = ingred1.split(",");
//   console.log(array);
//   let html = "";
//   for (i = 0; i < array.length; i++) {
//     const li = `<li>${array[i]}</li>`;
//     html += li;
//     console.log(html);
//   }
//   document.getElementById("allRecipe").innerHTML = "Recipe: " + html;
//   let array1 = prep1.split(",");
//   let html1 = "";
//   for (i = 0; i < array1.length; i++) {
//     const li = `<li>${array1[i]}</li>`;
//     html1 += li;
//   }
//   document.getElementById("allPrep").innerHTML = "Prep: " + html1;
//   document.getElementById("allServings").innerHTML = "Servings: " + serve;
// }


function addToFavourites(image1, ingredients1, name1, preparation1, servings1, url1, id){
  let userID = auth.currentUser.uid;
  //let anotheruser = user.uid;
  db.collection('users').doc(userID)
  .collection("favorites").doc(id)
  .set({
    image: image1,
    ingredients: ingredients1,
    name: name1,
    preparation: preparation1,
    servings: servings1,
    url: url1
  })
  
}

const displayFavourites = (data) => {

  mymy.addEventListener('click', (e) => {
    e.preventDefault();
    
    sharedRecipes.innerHTML = '';
    //side.innerHTML='';
    if (data.length) {
      let html = "";
      data.forEach(doc => {
        const list = doc.data();
        // console.log(doc._key.path.segments[6]) Name of each unique id
        const x = doc._key.path.segments[6];
        const li = `
        <li style="width:175px">
          <div ><input onclick="showFavpic('${list.image}','${list.ingredients}','${list.name}','${list.preparation}','${list.servings}','${list.url}')" style="margin:25px 0px 3px 0px;float:left;width:100px" type="image" src="${list.image}" onerror="this.onerror=null;this.src='https://via.placeholder.com/200';" ><button onclick="myFavdelete(this, '${doc.id}')">Delete</button>
          <span style="clear:left;display:block;text-align:left;padding:5px 15px 5px 0px">${list.name}</span></div>
        </li>
      `;
        html += li;
      });   
      listofFavourites.innerHTML = html;
  }  
}
 )   
}

  function showFavpic(thePicture, ingred1, name, prep1, serve, urls) {
    document.getElementById("favPicture").src = `${thePicture}`;
    document.getElementById("favVideo").src = `${urls}`;
    document.getElementById("favVideo").style.visibility = "visible"
    document.getElementById("favName").innerHTML = "Name: " + name;
    let array = ingred1.split(",");
    console.log(array);
    let html = "";
    for (i = 0; i < array.length; i++) {
      const li = `<li>${array[i]}</li>`;
      html += li;
      console.log(html);
    }
    document.getElementById("favRecipe").innerHTML = "Recipe: " + html;
    let array1 = prep1.split(",");
    let html1 = "";
    for (i = 0; i < array1.length; i++) {
      const li = `<li>${array1[i]}</li>`;
      html1 += li;
    }
    document.getElementById("favPrep").innerHTML = "Prep: " + html1;
    document.getElementById("favServings").innerHTML = "Servings: " + serve;
  }
  
  
  // delete functionality
  function myFavdelete(obj, id) {
  let li = obj.parentElement.parentElement;
  listofFavourites.removeChild(li);
  
  let userID = auth.currentUser.uid;
  db.collection("users").doc(userID).collection('favorites').doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
});
  
 }


// setup materialize components
document.addEventListener('DOMContentLoaded', function(){
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals)
  
   var items = document.querySelectorAll('.collapsible');
   M.Collapsible.init(items);
});

