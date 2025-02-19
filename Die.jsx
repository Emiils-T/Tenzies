export default function Die(props) {
    console.log(props)
    return (
        <button onClick={()=> props.hold(props.id)} style={{backgroundColor: props.isHeld ? '#59E391' :null}}>{props.value}</button>
    )
}