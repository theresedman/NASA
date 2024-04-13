//api-key:QjKzpzK9IBoWUx3teGhZRDBI7xbJ5VX8go4RqHhE
const spaceName = document.querySelector('#inputText');
const sendBtn = document.querySelector('#btnSubmit');
const headingName = document.querySelector('#aliasName');
const apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=QjKzpzK9IBoWUx3teGhZRDBI7xbJ5VX8go4RqHhE'
const btnSwitch = document.querySelector('#switchBtn');
const bodyRef = document.querySelector('body');
const darkModeKey = 'theme-dark';
const darkModeValue = 'active';

//kontrollera om det finns något i localStorage
if(localStorage.getItem(darkModeKey) === darkModeValue){
    console.log('det finns ett localStorage satt');
    enabledDarkMode();
}

btnSwitch.addEventListener('click' , () => {
    // console.log('du klickade på switch');
    // bodyRef.classList.toggle('dark');
    toggleDarkMode();
})

function toggleDarkMode(){
    if(bodyRef.classList.contains('dark')){
        // console.log('klassen dark finns');
        disabledDarkMode();
    }else{
        // console.log('klassen dark finns INTE');
        //om klassen inte finns så ska klassen läggas till
        enabledDarkMode();
    }
}

function enabledDarkMode() {
    // console.log('enabledDarkMode körs');
    btnSwitch.checked = true;
    bodyRef.classList.add('dark');
    //sätta localstorage
    setLocalStorage();
}
function disabledDarkMode(){
    // console.log('disabledDarkMode körs');
    bodyRef.classList.remove('dark');
    removeLocalStorage();

}
function setLocalStorage(){
    // console.log('setLocalStorgae körs');
    //sätter localStorage med en key och value
    localStorage.setItem(darkModeKey , darkModeValue);
}
function removeLocalStorage(){
    // console.log('removeLocalStorgae körs');
    localStorage.removeItem(darkModeKey);

}

//skapa en lyssnare som lyssnar efter när användaren släpper upp en tangent
spaceName.addEventListener('keyup', () => {
    let getValueLength = spaceName.value.length;
    if(getValueLength > 2){
        //btn ska bli enabled
        sendBtn.disabled = false;

    }else{
            //btn ska bli disabled
            sendBtn.disabled = true;
        }
    });
//lyssnare för knappen    
btnSubmit.addEventListener('click', (event) =>{
    event.preventDefault ();
    //Lägga till text i ett HTML.element
    headingName.textContent = spaceName.value;
    //rensar input på värde
    spaceName.value = '';
    //kontrollera om input är tom
    if(spaceName.value === ''){
        sendBtn.disabled = true;
    }
});
//lyssnare till input som kontrollerar focus/border
spaceName.addEventListener('focus',() => {
    //lägga till en class på input
    spaceName.classList.toggle('focusBorder');
});
//lyssnar efter blur
spaceName.addEventListener('blur',() => {
    //lägga till en class på input
    spaceName.classList.toggle('focusBorder');
});


//hämta data från API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data.photos);
        const photos = data.photos;
        const cardsContainer = document.querySelector('section');
        if(photos.length !== 0){
            console.log('det finns data');
            //loop för att loopa igenom data
            photos.forEach(photo => {
                // console.log(photo);
                //anropar en funktion som skapar upp ett nytt kort
                const newCard = createCard(photo);
                //för att lägga till det nya card i container
                cardsContainer.append(newCard);
            });
        } else {
            console.log('det finns inte data');
        }
    }).catch(error => console.log(`Detta är felet: ${error}`));

    //funktion som skapar upp ett nytt kort
    function createCard(photo) {
        // console.log('createCard körs');
        // console.log(photo);

        //skapa upp alla html-element
        const article = document.createElement('article');
        const cardTop = document.createElement('div');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const cardBottom = document.createElement('div');
        const cardText = document.createElement('div');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const cardCode = document.createElement('div');
        const codeImg = document.createElement('img');
        const h4 = document.createElement('h4');

        // lägga till klasser på element
        article.classList.add('card');
        cardTop.classList.add('cardTop');
        figure.classList.add('nasaImg');
        img.classList.add('imgMars');
        cardBottom.classList.add('cardBottom');
        cardText.classList.add('cardText');
        cardCode.classList.add('cardCode');

        //för att lägga till bild 
        img.setAttribute('src', `${photo.img_src}`);
        //om bild inte visas 
        img.setAttribute("alt","Photo by NASA's Curiosity, Opportunity, and Spirit rovers on Mars");
        //för att lägga till bild från img-mappen
        codeImg.src = "img/code.png";


        //för att lägga till text
        h3.textContent = photo.rover.name;
        p.textContent = photo.earth_date;
        h4.textContent = 'Level 1 clearance';


        //lägger till element i article
        // section.append(article);
        article.append(cardTop, cardBottom);
        cardTop.append(figure);
        figure.append (img);
        cardBottom.append(cardText, cardCode);
        cardText.append(h3, p);
        cardCode.append(codeImg, h4);

        console.log(article);
        //för att skicka tillbaka det nya kortet til loop
        return article;
    }