const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn"); 

// Function to fetch Pokémon data
let getPokedata = () => {
  // Generate a random Pokémon ID between 1 and 150
  let id = Math.floor(Math.random() * 150) + 1;

  const finalurl = url + id; // Complete API endpoint for the specific Pokémon
  fetch(finalurl)
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      generateCard(data); // Pass the Pokémon data to generateCard
    });
};

// Function to generate the Pokémon card
let generateCard = (data) => {
  console.log(data); // Log the Pokémon data for debugging

  // Extract Pokémon details
  const hp = data.stats[0].base_stat; // Pokémon HP
  const imgSrc = data.sprites.other.dream_world.front_default; // Image URL
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1); // Capitalized Pokémon name
  const statAttack = data.stats[1].base_stat; // Attack stat
  const statDefense = data.stats[2].base_stat; // Defense stat
  const statSpeed = data.stats[5].base_stat; // Speed stat

  const themecolor = typeColor[data.types[0].type.name]; // Background color based on the Pokémon's first type
  console.log(themecolor); // Log theme color for debugging

  // Update the card's HTML content
  card.innerHTML = `
        <p class="hp">
          <span>HP</span>
            ${hp}
        </p>
        <img src=${imgSrc} alt="${pokeName}" />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types"></div>
        <div class="stats">
          <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
          </div>
        </div>
  `;
  appendTypes(data.types); // Add the Pokémon's types
  styleCard(themecolor); // Style the card with the theme color
};

// Function to append Pokémon types to the card
let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement("span"); // Create a span for each type
    span.textContent = item.type.name; // Set the text to the type name
    document.querySelector(".types").appendChild(span); // Append span to the types container
  });
};

// Function to style the card
let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`; // Background gradient
  card.querySelectorAll(".types span").forEach((typeElement) => {
    typeElement.style.backgroundColor = color; // Set background color for each type
  });
};

// Event listeners
btn.addEventListener("click", getPokedata); // Fetch Pokémon data on button click
window.addEventListener("load", getPokedata); // Fetch Pokémon data when the page loads
