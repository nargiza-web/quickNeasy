db.collection('Recipes').onSnapshot(snapshot => {
  showAllRecipes(snapshot.docs)
})

// LISTEN AUTH STATUS CHANGES
auth.onAuthStateChanged(user => {
  if(user){
    db.collection('Recipes').onSnapshot(snapshot => {
      mySharedRecipes(snapshot.docs);
    }, err => console.log(err.message));
    setupUI(user)
  } else {
    setupUI()
    mySharedRecipes([])
  }
})

// create a RECIPE
const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('Favourites').add({
    name: createForm.name.value,
    ingredients: createForm.ingredients.value,
    preparation: createForm.preparation.value,
    url:'www.google.com',
    servings: createForm.servings.value,
     image: createForm.image.value
  }).then(() => {
    //cleanup and close the modal, reset
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  })
})

// SIGN UP the user
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  
  // after getting the user info sign user and fire it on database and save there
  auth.createUserWithEmailAndPassword(email, password).then(cred =>{
    return db.collection('users').doc(cred.user.uid).set({
      firstName : signupForm['firstName'].value
    });  
  }).then(() => {
  // close the signup modal & reset the form
  const modal = document.querySelector('#modal-signup');
  M.Modal.getInstance(modal).close();
  signupForm.reset();
  })
});

// LOGOUT the user
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e)=>{
  e.preventDefault();
  auth.signOut().then(() => {
    window.location = "fakeindex.html"
  })
})

// LOGIN - first event listener
const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  // get user info
  const email = loginForm['login-email'].value
  const password = loginForm['login-password'].value
  
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    
    // cleanup after yourself:), that is close the modal and reset it
    const modal = document.querySelector('#modal-login')
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  })
})
