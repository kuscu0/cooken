import "./DropDown.scss";
import {useState} from "react";

export default function DropDown(props) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className={"dropDown" + (isExpanded ? " expanded" : "")}>
			<div className="expander" onClick={() => setIsExpanded(!isExpanded)}>
				{props["expanderChildren"]}
			</div>
			<div className="dropDownArea">
				{props["dropDownChildren"]}
			</div>
		</div>
	)
}
