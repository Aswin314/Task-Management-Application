const Deadline2 = (title) => {
  const text = title.toLowerCase();
  const today = new Date();
  let predictedDate = null;

  if (text.includes("today")) {
    predictedDate = today;
  } else if (text.includes("tomorrow")) {
    predictedDate = new Date(today);
    predictedDate.setDate(today.getDate() + 1);
  } else if (text.includes("this week")) {
    predictedDate = new Date(today);
    predictedDate.setDate(today.getDate() + 7);
  }

  if (predictedDate) {
    return predictedDate.toISOString().split("T")[0];
  }

  return null;
};
export default Deadline2;
