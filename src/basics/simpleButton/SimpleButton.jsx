import "./SimpleButton.scss";

export default function SimpleButton(props) {
	return (
		<button type="button" className={props.className + " simpleButton"} onClick={props.onClick}>
			{props.children}
		</button>
	);
}
