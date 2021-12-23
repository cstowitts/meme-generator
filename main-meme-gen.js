//GLOBAL VARIABLES

//html constants

const form = document.querySelector('form');
const submitBtn = document.querySelector('input[type="submit"]');
const urlInput = document.querySelector('input[name="url"]');
const descriptionInput = document.querySelector('input[name="description"]')
const topInput = document.querySelector('input[name="top-text"]');
const bottomInput = document.querySelector('input[name="bottom-text"]');
const memesContainer = document.querySelector('.memes-container');


//meme data to track
const memeDataArray = [];

//HELPER FUNCTIONS


//this func adds a new meme to the array of memes
function addNewMemeToArray(newMeme) {

    //add new meme data to the array of memes
    memeDataArray.push(newMeme);
}

//this func creates and returns a new meme html element
//this func will be called within renderMemes
function createSingleMemeDiv(meme){
    //we are creating the div container for the meme
    const singleMemeDiv = document.createElement('div');

    //give a class to each div container so we can style it later
    singleMemeDiv.classList.add('meme-content-group'); 
        //don't need to add classes to all elements inside the meme div bc we can reference them doing .meme-content-group > h3, etc

    //we set the innerHTML to the meme content we want, since each meme dataset is an obj, we call the key we want the value for
    singleMemeDiv.innerHTML = `<h3>${meme.topInput}</h3> 
    <img src=${meme.urlInput} alt=${meme.descriptionInput}> 
    <h3>${meme.bottomInput}</h3>`;

    return singleMemeDiv;
}

//function that loops through meme array, creates new memes and appends them to the DOM (render = puts something on the DOM, could be appendToDom, w/e)
//this func will be called on submit of the meme form
//any time the memesArray data changes, we wiill then need to call this func again
function renderMemes (dataArray) {
    //we need to clear the array to make sure there aren't duplicates when we add data to it
    memesContainer.innerHTML = '';
    
    //for each meme obj in array (on each loop): create a new meme div and append it to the memes container div
    for (let i = 0; i < dataArray.length; i++){
        const createdMemeDiv = createSingleMemeDiv(dataArray[i]);
        //looping over the data array, picking out a meme obj, and using the createSingleMemeDiv func to create a meme with the data from that meme obj
        memesContainer.appendChild(createSingleMemeDiv);
    }
}

//EVENT LISTENERS

//we want this all to be triggered when the user submits their meme--the submit event happens to the form element, not on the button itself 
form.addEventListener('submit', function(e){
    //anonymous func instead of renderMemes bc we want to prevent default browser behavior of refreshing the page, happens after submit action happens
    e.preventDefault();

    //create meme obj to add to the array 
    const memeObject = {
        topText: topInput.value,
        bottomText: bottomInput.value,
        url: urlInput.value,
        description: descriptionInput.value
    }

    //user helper func to add this obj and push into meme data array
    addNewMemeToArray(memeObject);

    //use helper func to render all the memes!
    renderMemes(memeDataArray);

});

