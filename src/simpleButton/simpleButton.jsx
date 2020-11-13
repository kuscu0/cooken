import React from "react";
import "./_simpleButton.scss";

export class SimpleButton extends React.Component {
	render() {
		return <button type="button" onClick={this.props.clicked}>{this.props.children}</button>;
	}
}
