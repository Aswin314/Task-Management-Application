export const getTaskPriority = (title) => {
  const text = title.toLowerCase();

  const highKeywords = [
    "urgent",
    "today",
    "asap",
    "now",
    "immediately",
    "tomorrow",
    "exam",
    "interview",
    "deadline",
    "submit",
  ];

  const mediumKeywords = [
    "this week",
    "meeting",
    "prepare",
    "project",
    "assignment",
  ];

  if (highKeywords.some((word) => text.includes(word))) {
    return "High";
  }

  if (mediumKeywords.some((word) => text.includes(word))) {
    return "Medium";
  }

  return "Low";
};