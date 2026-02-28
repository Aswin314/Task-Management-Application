export const getPriority = (deadline, title) => {
  if (!deadline) return "Low";

  const today = new Date();
  const dueDate = new Date(deadline);

  const diffTime = dueDate - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const lowerTitle = title.toLowerCase();

  if (
    lowerTitle.includes("urgent") ||
    lowerTitle.includes("important") ||
    lowerTitle.includes("asap")
  ) {
    return "High";
  }

  if (daysLeft <= 1) return "High";
  if (daysLeft <= 3) return "Medium";

  return "Low";
};
