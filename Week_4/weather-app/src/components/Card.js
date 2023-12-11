import "../styles/Card.css"; // Import the CSS file for MainContainer

export default function Card(props) {
    return (
        <div className="card">
            <h3 className="future-date"> {props.date} </h3>
            <img className="future-icon" 
            src={require(`../icons/${props.future.weather[0].icon}.svg`)}
            alt="future-weather-icon"></img>
            <h2 className="future-temp"> {Math.round(props.future.main.temp_max) + "° to " + Math.round(props.future.main.temp_min) + "°"} </h2>
        </div>
    );
}
