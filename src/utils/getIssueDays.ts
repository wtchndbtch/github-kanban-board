export const getIssueDays = (date: string) => {
  const today = new Date();
  const issueDate = new Date(date);
  // TODO: test year difference and think about other edge cases
  const daysOld = today.getDate() - issueDate.getDate();

  switch (daysOld) {
    case 0:
      return "today";
    case 1:
      return "yesterday";

    default:
      return `${daysOld} days ago`;
  }
};
