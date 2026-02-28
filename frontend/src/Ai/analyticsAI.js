export const getWeeklyStats = (tasks) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const stats = [0, 0, 0, 0, 0, 0, 0];

  tasks.forEach((task) => {
    if (task.status === "Completed") {
      const date = new Date(task.updatedAt);
      const day = date.getDay();
      stats[day]++;
    }
  });

  return {
    labels: days,
    data: stats,
  };
};
