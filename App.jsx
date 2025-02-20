import Die from "./Die";
import { useState , useEffect ,useRef  } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
export default function App() {
  const [dice, setDice] = useState(() => generateNewDice());
     
  const buttonReference = useRef(null)

  let gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function hold(id) {
    setDice((prevState) =>
      prevState.map((item) => {
        return item.id == id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }

  useEffect(() =>{
    if(gameWon){
      buttonReference.current.focus()
    }
  },[gameWon])

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
    if (gameWon) {
      setDice(generateNewDice());
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld == false
            ? { ...die, value: Math.ceil(Math.random() * 6) }
            : die;
        })
      );
    }
  }

  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  return (
    <main>
      {gameWon && (
        <Confetti
          width={windowSize.current[0]}
          height={windowSize.current[1]}
        />
      )}
      <div aria-live={"polite"} className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>

      <button className="reroll" onClick={reroll} ref={buttonReference}>
        {gameWon ? "New Game" : "Reroll"}
      </button>
      </main>
        )
      }
