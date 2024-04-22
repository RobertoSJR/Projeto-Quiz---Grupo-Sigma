// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
  {
    question: 'O que significa CSS?',
    answers: [
      {
        answer: 'Cascading Style Sheets',
        correct: true,
      },
      {
        answer: 'Creative Style Sheets',
        correct: false,
      },
      {
        answer: 'Computer Style Sheets',
        correct: false,
      },
      {
        answer: 'Colorful Style Sheets',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é a forma correta de aplicar estilos CSS a um elemento HTML?',
    answers: [
      {
        answer: 'Usando o atributo `style` no elemento HTML.',
        correct: false,
      },
      {
        answer: 'Criando uma tag `<css>` dentro do elemento HTML.',
        correct: false,
      },
      {
        answer: 'Utilizando um arquivo externo CSS com a tag `<link>` no `<head>` do HTML.',
        correct: false,
      },
      {
        answer: 'Todas as anteriores.',
        correct: true,
      },
    ],
  },
  {
    question: 'Qual propriedade CSS é usada para alterar a cor do texto?',
    answers: [
      {
        answer: '`text-color`',
        correct: false,
      },
      {
        answer: '`font-color`',
        correct: false,
      },
      {
        answer: '`color`',
        correct: true,
      },
      {
        answer: '`background-color`',
        correct: false,
      },
    ],
  },
  {
    question: 'Como se aplica um estilo CSS para todos os elementos `<p>` em uma página?',
    answers: [
      {
        answer: '`p { style: ... }`',
        correct: true,
      },
      {
        answer: '`paragraph { style: ... }`',
        correct: false,
      },
      {
        answer: '`.p-style { style: ... }`',
        correct: false,
      },
      {
        answer: '`#p { style: ... }`',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual propriedade CSS é usada para definir a largura de um elemento?',
    answers: [
      {
        answer: '`size`',
        correct: false,
      },
      {
        answer: '`width`',
        correct: true,
      },
      {
        answer: '`height`',
        correct: false,
      },
      {
        answer: '`length`',
        correct: false,
      },
    ],
  },
];

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 2000);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados tela de sucesso
  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// mostra ou esonde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  //zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();