import "./SimpleButton.scss";

export default function SimpleButton(props) {
	return (
		<button {...props} type="button"  className={(props.className || "") + " simpleButton"}>
			{props.children}
		</button>
	);
}
