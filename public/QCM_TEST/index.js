const answers = {
  q1: 'b',
  q2: 'c',
  q3: 'b',
  q4: 'b',
  q5: 'c'
};

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let score = 0;
  let total = Object.keys(answers).length;

  for (let key in answers) {
    const selected = document.querySelector(`input[name="${key}"]:checked`);
    if (selected && selected.value === answers[key]) {
      score++;
    }
  }

  document.getElementById("result").textContent =
    `Vous avez obtenu ${score} / ${total}`;
});
