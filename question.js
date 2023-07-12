
var questions = [{
  number : 1,
  question : "Câu hỏi  :Bạn có 2 ô tô thêm 3 ô tô thì bạn có tổng bằng bao nhiêu ?",
  answer : 0,
  options:[
      "A. Có 5",
      "B. Có 4",
      "C. Có 6",
      "D. Có 7"
  ]
},
{
  number : 2,
  question : "Câu hỏi : 15 *5 bằng bao nhiêu ?" ,
  answer : 1,
  options:[
      "A.  = 65",
      "B. = 75",
      "C.  = 55",
      "D.  = 85"
  ]
},
{
  number : 3,
  question :"Câu hỏi : 4*2 bằng bao nhiêu ?",
  answer : 1,
  options:[
      "A. = 7",
      "B. = 8",
      "C.  = 9",
      "D. = 10"
  ]
},
{
  number : 4,
  question : "Câu hỏi : 2*3 bằng bao nhiêu ?",
  answer : 0,
  options:[
      "A.  = 6",
      "B.  = 7",
      "C. = 8",
      "D. = 9"
  ]
},
{
  number : 5,
  question : "Câu hỏi : 5*5 bằng bao nhiêu ?",
  answer : 3,
  options:[
      "A. = 21",
      "B. = 22",
      "C. = 23",
      "D.  = 25"
  ]
},
{
  number : 6,
  question : "Câu hỏi : 5*6 bằng bao nhiêu ?",
  answer : 1,
  options:[
      "A. = 28",
      "B. = 30",
      "C. = 32",
      "D. = 29"
  ]
},
{
  number : 7,
  question : "Câu hỏi  :7*5 bằng bao nhiêu ?",
  answer : 2,
  options:[
      "A. = 32",
      "B. = 34",
      "C. = 35",
      "D.  = 33"
  ]
},
{
  number : 8,
  question : "Câu hỏi  : 8*5 bằng bao nhiêu ?",
  answer : 1,
  options:[
      "A. = 39",
      "B. = 40",
      "C. = 41",
      "D. = 42"
  ]
}
]
var currentQuestion = 0;
var score = 0 ;
var questionSet = [];

var optionsQuiz = document.getElementById("options");
var optionQuizs = document.getElementsByClassName("option");
var submitBtn = document.getElementById("submit-btn");
var resultQuiz = document.getElementById("result");
var questionQuiz = document.getElementById("question");
var optionInput = document.createElement("input");

function showQuestions() {
  var storedQuestions = JSON.parse(localStorage.getItem('questions'));
console.log(storedQuestions)
  if (storedQuestions && storedQuestions.length === 5) {
    storedQuestions.forEach(storedQuestion => {
      var question = questions.find(q => q.number == storedQuestion.number);
      if (question) {
        var questionElement = document.createElement("div");
        questionElement.textContent = question.question;

        document.body.appendChild(questionElement);

        var optionsElement = document.createElement("ul");

        question.options.forEach((option, index) => {
          var optionItem = document.createElement("li");

          var optionInput = document.createElement("input");
          optionInput.setAttribute("type", "radio");
          optionInput.setAttribute("name", "question_" + question.number);
          optionInput.setAttribute("data-questionId", question.number);
          optionInput.setAttribute("data-answerIndex", index);
          optionInput.setAttribute("id", "option_" + index + "-" + question.number);

          var optionLabel = document.createElement("label");
          optionLabel.setAttribute("for", "option_" + index + "-" + question.number);
          optionLabel.textContent = option;

          optionItem.appendChild(optionInput);
          optionItem.appendChild(optionLabel);
          optionsElement.appendChild(optionItem);
        });

        document.body.appendChild(optionsElement);
      }
    });
  } else {
    var questionIds = [];
    var numberQuestions = 5;

    while (questionIds.length < numberQuestions) {
      var randomId = Math.ceil(Math.random() * questions.length);
      if (!questionIds.includes(randomId)) {
        questionIds.push(randomId);
      }
    }

    var questionData = [];
    questionIds.forEach(questionId => {
      var question = questions.find(q => q.number == questionId);
      if (question) {
        var questionElement = document.createElement("div");
        questionElement.textContent = question.question;

        document.body.appendChild(questionElement);

        var optionsElement = document.createElement("ul");

        question.options.forEach((option, index) => {
          var optionItem = document.createElement("li");

          var optionInput = document.createElement("input");
          optionInput.setAttribute("type", "radio");
          optionInput.setAttribute("name", "question_" + questionId);
          optionInput.setAttribute("data-questionId", +questionId);
          optionInput.setAttribute("data-answerIndex", index);
          optionInput.setAttribute("id", "option_" + index + "-" + questionId);

          var optionLabel = document.createElement("label");
          optionLabel.setAttribute("for", "option_" + index + "-" + questionId);
          optionLabel.textContent = option;

          optionItem.appendChild(optionInput);
          optionItem.appendChild(optionLabel);
          optionsElement.appendChild(optionItem);
        });

        document.body.appendChild(optionsElement);

        var questionDataItem = {
          question: question.question,
          option: question.options,
          number: question.number,
        };
        questionData.push(questionDataItem);
      }
    });

    saveQuestions(questionData);
  }
}


function saveQuestions(questionData) {
  var serializedQuestions = JSON.stringify(questionData);
  localStorage.setItem('questions', serializedQuestions);
}


// function handleSubmit() {
//   var checkedQuestions = document.querySelectorAll('input[type="radio"]:checked');
//   checkedQuestions.forEach((item) => {

//   var questionId = item.getAttribute('data-questionId');
//   console.log("🚀 ~ checkedQuestions.forEach ~ questionId:", questionId)

//   const question = questions.find(q => q.number ==  questionId);
//   console.log("🚀 ~ checkedQuestions.forEach ~ question:", question)
//   var answerIndex = item.getAttribute('data-answerIndex');
//   console.log("🚀 ~ checkedQuestions.forEach ~ questionIndex:", answerIndex)

//   console.log("🚀 ~ checkedQuestions.forEach ~ question.answer:", question.answer)  
  
//   if (question.answer == answerIndex) {
//     score += 1;
//     return score;
//   }

//   });
//   storedAnswerIds = JSON.parse(localStorage.getItem('questions'));

 
//   showResult(score, storedAnswerIds.length);
// }

function handleSubmit() {
  var checkedQuestions = document.querySelectorAll('input[type="radio"]:checked');
  var unansweredQuestions = 0;
  var incorrectAnswers = [];

  checkedQuestions.forEach((item) => {
    var questionId = item.getAttribute('data-questionId');
    const question = questions.find(q => q.number == questionId);
    var answerIndex = item.getAttribute('data-answerIndex');

    if (question.answer == answerIndex) {
      score += 1;
    } else {
      incorrectAnswers.push({
        question: question.question,
        correctAnswer: question.options[question.answer],
      });
    }
  });

  storedAnswerIds = JSON.parse(localStorage.getItem('questions'));

  if (unansweredQuestions === checkedQuestions.length) {
    alert('Bạn chưa trả lời câu hỏi nào. Vui lòng chọn câu trả lời.');
  } else {
    showResult(score, storedAnswerIds.length);
    showIncorrectAnswers(incorrectAnswers);
  }
}

function showIncorrectAnswers(incorrectAnswers) {
  if (incorrectAnswers.length > 0) {
    var notificationContent = 'Câu hỏi bạn trả lời sai:\n\n';
    incorrectAnswers.forEach((incorrectAnswer, index) => {
      notificationContent += `${index + 1}. ${incorrectAnswer.question}\n`;
      notificationContent += `  - Câu trả lời đúng: ${incorrectAnswer.correctAnswer}\n\n`;
    });
    alert(notificationContent);
  } else {
    alert('Bạn đã trả lời đúng tất cả câu hỏi.');
  }
}




function showResult(score, totalQuestions) {
  var resultQuiz = document.getElementById("result");
  submitBtn.disabled = true;
  resultQuiz.textContent = "Điểm: " + score + "/" + totalQuestions;
  console.log("🚀 ~ showResult ~ totalQuestions:", totalQuestions)
}



submitBtn.addEventListener("click", handleSubmit);

showQuestions();

