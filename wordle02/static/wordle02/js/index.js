let attempts = 0;
let index = 0;
// const 정답 = "APPLE";
let timer;

function appStart() {
  const goodDisplayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "정답! EUNJU 😁";
    div.style =
      "color:white; display:flex; justify-content: center; align-items: center; position:absolute; top:300px; left:-25px; font-size:22px; background-color: black; width:160px; height:40px; border-radius: 10px;";
    document.querySelector(".header-logo").appendChild(div);
  };

  const bedDisplayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "Game Over";
    div.style =
      "color:white; display:flex; justify-content: center; align-items: center; position:absolute; top:300px; left:-25px; font-size:22px; background-color: black; width:160px; height:40px; border-radius: 10px;";
    document.querySelector(".header-logo").appendChild(div);
  };

  const nextLine = () => {
    attempts += 1;
    index = 0;
    if (attempts === 6) return bedGameOver();
  };

  const goodGameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    goodDisplayGameOver();
    clearInterval(timer);
  };

  const bedGameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    bedDisplayGameOver();
    clearInterval(timer);
  };

  const handleKeyColor01 = (입력한_글자) => {
    const KeyBlock = document.querySelector(
      `.key-column[data-key='${입력한_글자}']`
    );
    KeyBlock.style.backgroundColor = "#6aaa64";
    KeyBlock.style.color = "white";
  };

  const handleKeyColor02 = (입력한_글자) => {
    const KeyBlock = document.querySelector(
      `.key-column[data-key='${입력한_글자}']`
    );
    KeyBlock.style.backgroundColor = "#c9b458";
    KeyBlock.style.color = "white";
  };

  const handleKeyColor03 = (입력한_글자) => {
    const KeyBlock = document.querySelector(
      `.key-column[data-key='${입력한_글자}']`
    );
    KeyBlock.style.backgroundColor = "#9fa4a6";
    KeyBlock.style.color = "white";
  };

  const handleEnterKey = async () => {
    let 맞은_개수 = 0;
    const 응답 = await fetch("/answer");
    const 정답 = await 응답.json();

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 !== 정답_글자) {
        handleKeyColor03(입력한_글자);
      }
      if (입력한_글자 === 정답_글자) {
        맞은_개수 += 1;
        block.style.background = "#6aaa64";
        handleKeyColor01(입력한_글자);
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#c9b458";
        handleKeyColor02(입력한_글자);
      } else block.style.background = "#787c7e";
      block.style.color = "white";
    }

    if (맞은_개수 === 5) goodGameOver();
    else nextLine();
  };

  const handleBackspace = (event) => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const handleKeyclick = (event) => {
    const boardBlock = event.srcElement.dataset.key;
    // const keyElement = event.target;
    // const boardBlock = event.target.innerText;
    const text = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (boardBlock === "지우기") {
      handleBackspace();
    } else if (index === 5) {
      if (boardBlock === "ENTER") {
        handleEnterKey();
      } else return;
    } else if (boardBlock !== "ENTER") {
      text.innerText = boardBlock;
      index += 1;
      // keyElement.style.background = "#6aaa64";
    }
  };

  const keyBoard = document.querySelectorAll(".key-column");
  keyBoard.forEach((key) => {
    key.addEventListener("click", handleKeyclick);
    // key.addEventListener("click", handleKeyColor);
  });

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, 0);
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, 0);
      const timeH2 = document.querySelector("#timer");
      timeH2.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();

// const keyBoard = document.querySelectorAll(".key-column");
// keyBoard.forEach((key) => {
//   if (입력한_글자 === key.innerText) {
//     key.classList.add("correct");
//   }
// });

// const handleKeyColor = (event) => {
//   const keyElement = event.target;
//   keyElement.style.background = "#6aaa64";
// };

// const keyBoard = document.querySelectorAll(".key-column");
// keyBoard.forEach((key) => {
//   if (key.dataset.key.toUpperCase() === 입력한_글자) {
//     // 대문자로 변환하여 비교
//     key.classList.add("correct");
//   }
// });
