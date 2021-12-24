//GLOBAL VARIABLES

const form = document.querySelector('form');
const urlInput = document.querySelector('input[name="url"]');
const imgAlt = document.querySelector('input[name="alt"]');
const topInput = document.querySelector('input[name="top-text"]');
const bottomInput = document.querySelector('input[name="bottom-text"]');
const memesContainerDiv = document.querySelector('.memes-container');
const memesDataArray = [];

//Helper Functions

    //adds new meme data to memesDataArray
    function addNewMemeDataToArray(newMemeObj){
        memesDataArray.push(newMemeObj);
    }

    //rewrite of og createNewMeme(newMemeObj) func to better format text over image on meme
    function createNewMeme(newMemeObj){
        const newMemeDiv = document.createElement('div');
        newMemeDiv.classList.add('new-meme-div');

        //using an expanded ternary operator to assign a class depending on the length of the top text passed in (how many lines of text)
        //if topText's length is <= 24 characters long, assign the string/class "one-line" to the topSizeClass variable
        //else if topText's length is >24 && <=48, assign the string/class "two-lines" to the topSizeClass variable
        //else if topText's length is >48, assign the string/class "three-lines" to the topSizeClass variable
        const topSizeClass= newMemeObj.topText.length <= 24 
        ? "one-line"
        : (newMemeObj.topText.length > 24 && newMemeObj.topText.length <= 48) 
        ? "two-lines" 
        : "three-lines";

        // now time to do the same for the bottom text
        const bottomSizeClass = newMemeObj.bottomText.length <= 24
        ? "one-line"
        : (newMemeObj.bottomText.length > 24 && newMemeObj.bottomText.length <= 48)
        ? "two-lines"
        : "three-lines";

        newMemeDiv.innerHTML = 
            `<div class="new-meme-content-div">
                <img class="new-meme-img" src="${newMemeObj.url}" alt="${newMemeObj.alt}">
                <div class="new-meme-text-div">
                    <h3 class="top-text ${topSizeClass}">
                        ${newMemeObj.topText}
                    </h3>
                    <h3 class="bottom-text ${bottomSizeClass}">
                        ${newMemeObj.bottomText}
                    </h3>
                </div>
                <div class="overlay">
                    <span class="overlay-x">X</span>
                </div>
            </div>`;
        return newMemeDiv;
    }

    //clears the memes container div, loops over memesDataArray, creates new meme element, and appends to DOM
    function renderMemes(memesDataArray){
        memesContainerDiv.innerHTML = "";
        for(let i = 0; i < memesDataArray.length; i++){
            const createdMeme = createNewMeme(memesDataArray[i]);
            memesContainerDiv.appendChild(createdMeme);
        }
        addMemeDeleteListeners(); //we need to make sure that every meme has been appended, we wrote this function to select all elements on the DOM with the class .meme-content
    }

    //add eventListeners to delete meme to each meme (addMemeDeleteListeners) plural bc it adds an eventlistener to each meme
    function addMemeDeleteListeners(){
        const memesList = document.querySelectorAll('.new-meme-div');
        console.log(memesList);
        for(let i = 0; i < memesList.length; i++){
            let meme = memesList[i];
            meme.addEventListener("click", function(event){
                // console.log("pls work"); //sanity check to make sure event listener is linked/working
                // console.log(meme); //this should update as memesList[i] changes

                //delete the clicked on meme's obj in the memesDataArray[i] and re-render the remaining meme objs bc the indexes correspond with the nodesList
                memesDataArray.splice(i, 1); //this starts the deletion at the index, i, and removes one meme obj--mutates the og array, doesn't return a copy (if it did, we'd have to save the output to a new variable)

                //now we need to ask the the meme-container to re-render using the updated value of memesDataArray
                renderMemes(memesDataArray);
            });
        };
    } 


//Event Listeners

    //to be triggered when the user submits the meme generator form (not on click), creates newMemeObj, adds new meme data to memesDataArray, and calls renderMemes();

    form.addEventListener('submit', function(event){
        event.preventDefault();

        const newMemeObj = {
            url: urlInput.value,
            alt: imgAlt.value,
            topText: topInput.value,
            bottomText: bottomInput.value
        };

        addNewMemeDataToArray(newMemeObj);

        renderMemes(memesDataArray);
    });


    //to be triggered when the user attempts to type more than 72 characters in the top text input fields
    //event obj=keydown doesn't include releasing the key so the actual value of the field isn't updated until the key is released
    topInput.addEventListener('keydown', function(event){
        console.log("top input value", event.target.value);
        //this will log whatever the value of the input is before the keydown (one before the most current value) and we want keydown because this should trigger after the user has pressed the 73rd character
        //event.target >> let's get the element that had the keydown happen to it >>once we get that element (input), we can access the value property of the input element

        //create a variable for the input length
        const inputLength = event.target.value.length;
        // console.log(inputLength);

        //write a conditional to see if inputLength is 72 characters long
        if (inputLength === 72) {
            alert("Hey! We're not charging by the character, but this is still a meme--no need to go overboard!");
        }
    })


    //now it's bottomInput's turn!
    bottomInput.addEventListener('keydown', function(event){
        console.log("bottom input value", event.target.value);
        //this will log whatever the value of the input is before the keydown (one before the most current value) and we want keydown because this should trigger after the user has pressed the 73rd character
        //event.target >> let's get the element that had the keydown happen to it >>once we get that element (input), we can access the value property of the input element

        //create a variable for the input length
        const inputLength = event.target.value.length;
        // console.log(inputLength);

        //write a conditional to see if inputLength is 72 characters long
        if (inputLength === 72) {
            alert("Hey! We're not charging by the character, but this is still a meme--no need to go overboard!");
        }
    })

    //we don't need to dynamically add this eventlistner because it, like the form, is added as soon as the page loads (the text inputs start on the page right away)
    

