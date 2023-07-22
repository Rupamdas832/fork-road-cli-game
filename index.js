const { Command } = require("commander");
const inquirer = require("inquirer");
const forkRoad = require("./forkRoad.json");
const dragonFight = require("./dragonFight.json");

const story = dragonFight;

const prompt = inquirer.createPromptModule();

async function playGame(option) {
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

const program = new Command();

program
  .command("start")
  .description(
    "Simple RPG game having choices to make to proceed through the game"
  )
  .action(() => {
    console.log("called");
    playGame("start");
  });

program.parse(process.argv);
