import React, { useState } from "react";
import "./App.css"

const App = () => {
  const defaultProps = {
    keypad: [
      [".,!1", "1", ".,!"],
      ["abc2", "2", "abc"],
      ["def3", "3", "def"],
      ["ghi4", "4", "ghi"],
      ["jkl5", "5", "jkl"],
      ["mno6", "6", "mno"],
      ["pqrs7", "7", "pqrs"],
      ["tuv8", "8", "tuv"],
      ["wxyz9", "9", "wxyz"],
      ["*", "*"],
      ["0", "0"],
      ["#", "#"],
    ],
  };

  const [text, setText] = useState("")
  const [click, setClick] = useState(0)
  const [startTime, setStartTime] = useState(new Date().getTime())
  const [mouseDownTime, setMouseDownTime] = useState(0)
  const [mouseUpTime, setMouseUpTime] = useState(0)


  const mouseDown = () => {
    const current = new Date().getTime();
    setMouseDownTime(current);
  };

  const mouseUp = () => {
    const current = new Date().getTime();
    setMouseUpTime(current);
  };
  const myRef = React.useRef()
  const handleInputChange = (e) => {
    setText(e.currentTarget.value)
  };

  const inputText = (characters, mouseDownTime, mouseUpTime) => {
    setClick(click + 1)

    const currentTime = new Date().getTime();
    const myText = text;
    const lastChar = myText[myText.length - 1];
    const isButtonSame = characters.includes(lastChar);
    let newText = text;

    if (mouseUpTime - mouseDownTime >= 600) {
      setClick(1);
      newText = newText.concat(characters[characters.length - 1]);
      setStartTime(new Date().getTime());
    }

    else if (currentTime - startTime > 1000 || !isButtonSame) {
      setClick(1);
      newText = newText.concat(characters[0]);
      setStartTime(new Date().getTime());
    }

    else {
      newText = newText.slice(0, newText.length - 1);
      newText = newText.concat(characters[click % characters.length]);
      setStartTime(new Date().getTime());
    }
    setText(newText)
  };
  //Function to clear last entered character


  return (
    <div className="App">
      <div className="container">
        <div className="input-box">
          <input ref={myRef} onChange={(e) => handleInputChange(e)} id="result" value={text ? text : ""} type="text" />
        </div>
        <div className="button-container">
          {defaultProps.keypad.map((key, index) => (
            <button
              key={index}
              onMouseDown={() => mouseDown()}
              onMouseUp={() => mouseUp()}
              onClick={() => inputText(key[0], mouseDownTime, mouseUpTime)}
              className="button-each"
            >
              {key[1]}
              <br />
              {key[2]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;