import "./Comment.scss"
import {useState} from "react";
import {authFetch} from "../../../utils/utils";

export default function Comment(props) {
    const [text, setText] = useState(props.initialText);

    async function saveText() {
        await authFetch("/users/recipeComment", true, {
            method: "PUT",
            body: new URLSearchParams([
                ["recipeId", props.recipeId],
                ["index", props.index],
                ["text", text]
            ]),
        });
    }

    async function deleteComment() {
        props.onDelete(props.index);
        await authFetch("/users/recipeComment", true, {
            method: "DELETE",
            body: new URLSearchParams([
                ["recipeId", props.recipeId],
                ["index", props.index],
            ]),
        });
    }

    const initialTextLines = props.initialText.split("\n");
    return (
        <div className="recipeComment">
            <span className="marker"/>
            <div className="comment">
                <div className="textInput" contentEditable="true" onInput={e => setText(e.currentTarget.innerText)} onBlur={saveText}>
                    { initialTextLines.slice(1).reduce((curr, next) => curr.concat(<div>{next}</div>), [initialTextLines[0]]) }
                </div>
                <button className="deleteBtn" onClick={deleteComment}>
                    <img src="/img/close.svg" alt="close"/>
                </button>
            </div>
        </div>
    )
}
