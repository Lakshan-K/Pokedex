
const pokemonCount = 350;
var pokedex = {}; // {1 : {name : "pokemon name", img, url, type : {type, type, type}, description : ...}}

window.onload = async function() {
    getPokemon(1);

    for(let i = 1; i<= pokemonCount; i++){
        await getPokemon(i);
        let pokemon = document.createElement("div");
         pokemon.id = i;
         pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
         pokemon.classList.add("pokemon-name");
        document.getElementById("pokemon-list").append(pokemon);
    }

    

    console.log(pokedex);
}

async function getPokemon(num){
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    //console.log(pokemon);

    let pokeName = pokemon["name"];
    let pokeType = pokemon["types"];
    let pokeImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokeDesc = await res.json();

    //console.log(pokeDesc);
    pokeDesc = pokeDesc["flavor_text_entries"][9]["flavor_text"];

    pokedex[num] = {"name" : pokeName, "img" : pokeImg, "types" : pokeType, "desc" : pokeDesc};
}