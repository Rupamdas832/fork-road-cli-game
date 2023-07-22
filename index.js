const { Command } = require("commander");
const inquirer = require("inquirer");
const forkRoad = require("./forkRoad.json");
const dragonFight = require("./dragonFight.json");

const stories = [
  {
    name: "Treasure hunting",
    game: forkRoad,
  },
  {
    name: "Fight the dragon",
    game: dragonFight,
  },
];
let story = {};

const prompt = inquirer.createPromptModule();

async function playGame(option) {
  console.log("\n");
  const currentQuestion = {
    type: "list",
    name: option,
    message: story.scenes[option].description,
    choices: story.scenes[option].choices.map((item) => item.option),
  };

  if (currentQuestion.choices.length === 0) {
    console.log(currentQuestion.message);
    console.log("Game is ended");
    return;
  }

  const result = await prompt(currentQuestion);

  const newOption = story.scenes[option].choices.find(
    (item) => item.option === result[option]
  )?.nextScene;

  await playGame(newOption);
}

async function chooseGame() {
  console.log("\n");
  const question = {
    type: "list",
    name: "choice",
    message: "Choose a game you want to play?",
    choices: stories.map((item) => item.name),
  };
  const selectedOption = await prompt(question);

  const selectedGame = stories.find(
    (item) => item.name === selectedOption.choice
  )?.game;

  story = selectedGame;
  playGame("start");
}

const program = new Command();

program
  .command("start")
  .description(
    "Simple RPG game having choices to make to proceed through the game"
  )
  .action(() => {
    chooseGame();
  });

program.parse(process.argv);
