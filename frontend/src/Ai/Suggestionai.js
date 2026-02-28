export const getSuggestion = (tasks, score) => {
  const pending = tasks.filter((task) => task.status === "Pending").length;

  if (pending > 5) {
    return "You have too many pending tasks!";
  }

  if (score < 40) {
    return "Try completing an easy task today!";
  }

  if (score >= 40 && score <= 70) {
    return "You're doing okay. Keep progressing!";
  }

  if (score > 70) {
    return "Great productivity! Keep going!";
  }
};
