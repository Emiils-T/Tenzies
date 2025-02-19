import Die from "./Die";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  /**
   * Challenge: Update the `rollDice` function to not just roll
   * all new dice, but instead to look through the existing dice
   * to NOT role any that are being `held`.
   *
   * Hint: this will look relatively similiar to the `hold`
   * function below. When we're "rolling" a die, we're really
   * just updating the `value` property of the die object.
   */

  const [dice, setDice] = useState(generateNewDice());

  function hold(id) {
    setDice((prevState) =>
      prevState.map((item) => {
        return item.id == id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }

  const diceElements = dice.map((diceObj) => (
    <Die
      key={diceObj.id}
      value={diceObj.value}
      isHeld={diceObj.isHeld}
      hold={hold}
      id={diceObj.id}
    />
  ));

  function generateNewDice() {
    let diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceArray;
  }
  function reroll() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld == false
          ? { ...die, value: Math.ceil(Math.random() * 6) }
          : die;
      })
    );
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>

      <button className="reroll" onClick={reroll}>
        Roll
      </button>


    </main>
  );
}
