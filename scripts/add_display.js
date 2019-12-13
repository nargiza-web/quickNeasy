
////// Variables
const docRef = db.collection("Recipes");
let name = document.getElementById("name");
let recipe = document.getElementById("recipe");
let preparation = document.getElementById("preparation");
let servings = document.getElementById("servings");
let url = document.getElementById("url");
// const createdRecipeList = document.querySelector('.createdRecipe')
const listofRecipes = document.querySelector(".listofRecipes");

////// Loads All existing Recipes to Page
docRef.onSnapshot(snapshot => {
  setupRecipeInfo(snapshot.docs);
});

////// Creates a form to have User input Recipes
// const createForm = document.querySelector("#create-form");
// createForm.addEventListener("submit", e => {
//   e.preventDefault();
//   docRef
//     .add({
//       name: createForm.name.value,
//       ingredients: createForm.recipe.value,
//       preparation: createForm.preparation.value,
//       url: "www.google.com",
//       servings: createForm.servings.value,
//       image: createForm.url.value
//     })
//     .then(() => {
//       //cleanup and close the modal, reset
//       const modal = document.querySelector("#modal-create");
//       M.Modal.getInstance(modal).close();
//       createForm.reset();
//       docRef.onSnapshot(snapshot => {
//         setupRecipeInfo(snapshot.docs);
//       });
//     });
// });

// setup your html and see the data on DOM
const setupRecipeInfo = data => {
  // if (data.length) {
    let html = "";
    data.forEach(doc => {
      const list = doc.data();
      // console.log(doc._key.path.segments[6]) Name of each unique id
      const x = doc._key.path.segments[6];
      const li = `
      <li>
        <div><input onclick="showpic('${list.image}','${list.ingredients}','${list.name}','${list.preparation}',${list.servings},'${list.url}')" style="margin:25px 10px 3px 0px;float:left;width:100px" type="image" src="${list.image}" onerror="this.onerror=null;this.src='https://via.placeholder.com/200';" ><span style="clear:left;display:block;text-align:center">${list.name}</span></div>
      </li>
    `;
      html += li;
    });
    listofRecipes.innerHTML = html;
  }


//<button onclick="mydelete(this)">Delete</button>
//////// Populates the right side of the screen with Info of the Picture you clicked on
function showpic(thePicture, ingred1, name, prep1, serve, urls) {
  document.getElementById("ok").src = `${thePicture}`;
  document.getElementById("vi").src = `${urls}`;
  document.getElementById("vi").style.visibility = "visible";
  document.getElementById("n").innerHTML = "Name: " + name;
  let array = ingred1.split(",");
  console.log(array);
  let html = "";
  for (i = 0; i < array.length; i++) {
    const li = `<li>${array[i]}</li>`;
    html += li;
    console.log(html);
  }
  document.getElementById("r").innerHTML = "Recipe: " + html;
  let array1 = prep1.split(",");
  let html1 = "";
  for (i = 0; i < array1.length; i++) {
    const li = `<li>${array1[i]}</li>`;
    html1 += li;
  }
  document.getElementById("p").innerHTML = "Prep: " + html1;
  document.getElementById("s").innerHTML = "Servings: " + serve;
}

/////// Deleted Functionality
function mydelete(obj) {
  let li = obj.parentElement.parentElement;
  listofRecipes.removeChild(li);
}

document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

// function btnlogin() {
//   location.href("/Users/mehmetozek/digital_crafts/htx-november/6project/register.html")
// }