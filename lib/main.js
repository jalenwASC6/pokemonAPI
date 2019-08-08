let fluidContainer = document.getElementsByClassName("container-fluid")[0];
let input = document.getElementById("input")
let button = document.getElementById("submit_button")
button.addEventListener("click",callPokemonAPI)

function callPokemonAPI(event) {
    event.preventDefault()
    let url = `https://pokeapi.co/api/v2/pokemon/${input.value}`;
    
    fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
        console.log(data);
        let name = data.name;
        number = data.id;
        types = getTypes(data);
        moves = getMoves(data);
        abilities = getAbilities(data);
        image = data.sprites.front_default;
        let pokemon = new Pokemon(name, number, types, moves, abilities, image);
        console.log(pokemon);
        createCarouselItem(pokemon)
    })
    .catch(function(error){
        console.log(error);
    });
}

function getTypes(pokemonJSON) {
    let types  = [];
    for (let type of pokemonJSON.types) {
        types.push(type.type.name);
    }
    return types;
}

function getMoves(pokemonJSON) {
    let moves = [];
    for (let move of pokemonJSON.moves) {
        moves.push(move.move.name);
    }
    return moves;
}

function getAbilities(pokemonJSON) {
    let abilities = [];
    for (let ability of pokemonJSON.abilities) {
        abilities.push(ability.ability.name);
    }
    return abilities;
}

function createCarouselItem(pokemon) {
    //div with class carousel-item//
    //inside the div we have an image with class "d-block w-100"//  
    let carouselItem = document.createElement(`div`);
    carouselItem.setAttribute("class", "carousel-item");

    let carouselImage = document.createElement("img");
    carouselImage.setAttribute("class", "d-block w-50");
    carouselImage.src = pokemon.image;

    carouselItem.appendChild(carouselImage);

    let carouselInner = document.getElementsByClassName("carousel-inner")[0];
    carouselInner.appendChild(carouselItem);
    for (let i = 1; i < carouselInner.childNodes.length; i++) {
        carouselInner.childNodes[i].classList.remove("active");
    }
    carouselInner.childNodes[1].classList.add("active")
}

function createPokemonElement(pokemon) {
    //h1 tag for name
    let h1 = document.createElement(`h1`);
    h1.innerHTML = pokemon.name;

    //h2 tag for number
    let h2 = document.createElement(`h2`);
    h2.innerHTML = pokemon.number;
    //p tag for types
    
    let p = document.createElement(`p`);
    for (let type of pokemon.types) {
        p.innerHTML += `${type}` 
    }

    //ul tag for moves
    let moveUL = document.createElement(`ul`);
    for (let move of pokemon.moves) {
        moveUL.innerHTML += `<li>${move}</li>`
    }

    //ul tag for abilities
    let abilityUL = document.createElement('ul');
    for (let ability of pokemon.abilities) {
        abilityUL.innerHTML += `<li>${ability}</li>`
    }

    //img tag for image
    let img = document.createElement(`img`);
    img.src = pokemon.image;

    // div container for our pokemon element
    let div = document.createElement(`div`);
    div.append(h1, h2, p, moveUL, abilityUL, img);
    fluidContainer.appendChild(div);
}

