export default function Die(props) {
  return (
    <button
      onClick={() => props.hold(props.id)}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, 
      ${props.isHeld ? "held" : "not held"}`}
      style={{ backgroundColor: props.isHeld ? "#59E391" : null }}
    >
      {props.value}
    </button>
  );
}
