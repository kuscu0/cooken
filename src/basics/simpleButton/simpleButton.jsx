import "./_simpleButton.scss";

export default function SimpleButton(props) {
	return (
		<button type="button" className={props.className + " simpleButton"} onClick={props.clicked}>
			{props.children}
		</button>
	);
}
