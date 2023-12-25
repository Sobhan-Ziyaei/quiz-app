const formatData = (questionData) => {
  const result = questionData.map((item) => {
    const questionObject = {};
    const answers = [...item.incorrect_answers];
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(correctAnswerIndex, 0, item.correct_answer);
    questionObject.question = item.question;
    questionObject.answers = answers;
    questionObject.correctAnswerIndex = correctAnswerIndex;
    return questionObject;
  });
  return result;
};

export default formatData;
