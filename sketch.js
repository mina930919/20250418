let questions = [
  { question: "5 + 3 = ?", options: [6, 7, 8, 9], answer: 8 },
  { question: "12 - 4 = ?", options: [6, 7, 8, 9], answer: 8 },
  { question: "6 * 2 = ?", options: [10, 11, 12, 13], answer: 12 }
];

let currentQuestion = 0;
let feedback = "";
let feedbackColor = 0; // 回饋文字顏色
let selectedOption = -1;

function setup() {
  createCanvas(windowWidth, windowHeight); // 畫布布滿整個視窗
  textSize(24); // 調整文字大小
  textAlign(CENTER, CENTER); // 文字置中對齊
}

function draw() {
  background(220);

  if (currentQuestion < questions.length) {
    // 顯示問題，將位置稍微往上移
    fill(0); // 確保題目顏色為黑色
    text(questions[currentQuestion].question, width / 2, height / 5); // 題目位置稍微往上移

    // 顯示選項
    for (let i = 0; i < 4; i++) {
      let y = height / 3.5 + i * 50; // 選項整體往上移
      if (i === selectedOption) {
        fill(200, 200, 255); // 高亮選中的選項
        rect(width / 2 - 150, y - 20, 300, 40);
        fill(0);
      } else {
        fill(200);
        rect(width / 2 - 150, y - 20, 300, 40);
        fill(0);
      }
      text(questions[currentQuestion].options[i], width / 2, y);
    }

    // 顯示回饋文字，放在最後一個選項的下方
    fill(feedbackColor); // 使用動態顏色
    text(feedback, width / 2, height / 3.5 + 4 * 50 + 20); // 放在最後一個選項下方
  } else {
    // 顯示測驗結束訊息
    fill(0); // 確保文字顏色為黑色
    text("Quiz Finished!", width / 2, height / 2 - 50);
    text("Refresh to try again.", width / 2, height / 2 + 50);
  }
}

function mousePressed() {
  if (currentQuestion < questions.length) {
    for (let i = 0; i < 4; i++) {
      let y = height / 3.5 + i * 50; // 與選項位置保持一致
      if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > y - 20 && mouseY < y + 20) {
        checkAnswer(i);
      }
    }
  }
}

function checkAnswer(selectedOption) {
  let selectedAnswer = questions[currentQuestion].options[selectedOption];
  if (selectedAnswer === questions[currentQuestion].answer) {
    feedback = "Correct!"; // 答對回饋
    feedbackColor = color(0, 128, 0); // 深綠色文字
    // 進入下一題
    setTimeout(() => {
      feedback = ""; // 清空回饋
      currentQuestion++;
    }, 1000); // 1 秒後進入下一題
  } else {
    feedback = "Wrong! Try again."; // 答錯回饋
    feedbackColor = color(255, 0, 0); // 紅色文字
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布隨視窗大小調整
}
