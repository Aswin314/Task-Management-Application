export const productivityScore = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;

  const completed = tasks.filter((task) => task.status === "Completed").length;

  const score = Math.round((completed / tasks.length) * 100);

  return score;
};
