let characters_section = document.querySelector("#characters-section");

let selected_character_section = document.querySelector("#selected-character-section");

let available_to_attack_section = document.querySelector("#available-to-attack-section");

let defender = document.querySelector(".character-section");

let defender_id = document.querySelector("#defender-id");

let game_message = document.querySelector("#game-message");

const newWars = (name, img, health) => {
  let character = document.createElement("div");
  character.classList.add("character");

  let character_name = document.createElement("h3");
  character_name.innerHTML = name;
  character_name.classList.add("character-name");

  let character_img = document.createElement("img");
  character_img.src = img;
  character_img.classList.add("character-image");

  let character_health = document.createElement("p");
  character_health.innerHTML = health;
  character_health.classList.add("character-health");

  character.append(character_name, character_img, character_health);
  characters_section.append(character);
};

newWars("Obi-Wan Kenobi", "./assets/images/obi-wan.jpg", 120);
newWars("Luke Skywalker", "./assets/images/luke-skywalker.jpg", 100);
newWars("Darth Sidious", "./assets/images/darth-sidious.png", 150);
newWars("Darth Maul", "./assets/images/darth-maul.jpg", 180);

let characters = document.querySelectorAll("#characters-section .character");
for (let i = 0; i < characters.length; i++) {
  characters[i].addEventListener("click", function () {
    for (let j = 0; j < characters.length; j++) {
      if (characters[i] === characters[j]) {
        characters[j].id = "selected-character";
        selected_character_section.append(characters[j]);
      } else {
        available_to_attack_section.append(characters[j]);
      }
    }
    characters = [];
    characters_section.remove();
    let attack_character = document.querySelectorAll(
      "#available-to-attack-section .character"
    );
    for (const a_character of attack_character) {
      let defenders = document.querySelectorAll("#defender .character");
      a_character.addEventListener("click", () => {
        if (defender_id.children.length === 0) {
          a_character.id = "defender";
          document.querySelector("#defender-id").append(a_character);
        }
      });
    }
  });
}

const myRandomAttack = () => {
  var random_attack = Math.floor(Math.random() * (80 - 5) + 5);
  return random_attack;
};

const enemyRandomAttack = () => {
  var random_attack = Math.floor(Math.random() * (20 - 5) + 5);
  return random_attack;
};

game_message.innerHTML = "";
const restartBtn = () => {
  let btn = document.createElement("button");
  btn.innerHTML = "Restart";
  game_message.append(btn);
  btn.addEventListener("click", () => {
    window.location.reload(true);
  });
};~

document.querySelector("#attack-button").addEventListener("click", function () {
  let myAttack = document.querySelector("#selected-character p");
  let enemyAttack = document.querySelector("#defender p");
  let attackSection = document.querySelectorAll(
    "#available-to-attack-section .character"
  );

  if (myAttack && enemyAttack) {
    let enemyName = document.querySelector("#defender h3").innerHTML;
    let myHealth = parseInt(myAttack.innerHTML);
    let enemyHealth = parseInt(enemyAttack.innerHTML);
    myAttack.innerHTML = myHealth - enemyRandomAttack();
    enemyAttack.innerHTML = enemyHealth - myRandomAttack();
    game_message.innerHTML = `<p>You attacked ${enemyName} for ${myRandomAttack()} damage</p>
       <p>${enemyName} attacked you for ${enemyRandomAttack()} damage</p>`;
    if (parseInt(enemyAttack.innerHTML) <= 0) {
      document.querySelector("#defender").remove();
      game_message.innerHTML = `<p>You have defeated ${enemyName},you can choose to fight another enemy</p>`
    }
    if (parseInt(enemyAttack.innerHTML) <= 0 && attackSection.length === 0) {
      game_message.innerHTML = `<p>You Won this game!</p>`;
      restartBtn();
    }
    else if(parseInt(myAttack.innerHTML) <= 0) {
      document.querySelector('#selected-character').remove();
      game_message.innerHTML = '<p>Unfortunately, You Lost</p>'
    }
  }
});