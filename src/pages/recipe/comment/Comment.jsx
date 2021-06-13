import "./Comment.scss"
import {useEffect, useState} from "react";
import {authFetch} from "../../../utils/utils";

export default function Comment(props) {
    const [text, setText] = useState(props.initialText);
    const [hasBeenSaved, setHasBeenSaved] = useState(false);

    useEffect(() => {
        if (!hasBeenSaved && text === "")
            textInput.focus();
    }, []);

    async function saveText() {
        if (!hasBeenSaved && text === "") {
            deleteComment();
            return;
        }
        await authFetch("/users/recipeComment", true, {
            method: "PUT",
            body: new URLSearchParams([
                ["recipeId", props.recipeId],
                ["index", props.index],
                ["text", text]
            ]),
        });
        setHasBeenSaved(true);
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

    let textInput;
    const initialTextLines = props.initialText.split("\n");
    return (
        <div className="recipeComment">
            <span className="marker"/>
            <div className="comment">
                <div
                    className="textInput"
                    contentEditable="true"
                    onInput={e => setText(e.currentTarget.innerText)}
                    onBlur={saveText}
                    ref={(input) => { textInput = input }}
                >
                    { initialTextLines.slice(1).reduce((curr, next) => curr.concat(<div>{next}</div>), [initialTextLines[0]]) }
                </div>
                <button className="deleteBtn" onClick={deleteComment}>
                    <img src="/img/close.svg" alt="close"/>
                </button>
            </div>
        </div>
    )
}
