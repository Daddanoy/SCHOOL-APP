filteredQuestions = [
  { _id: 1, category: "Math", text: "Question 1" },
  { _id: 2, category: "Science", text: "Question 2" },
  { _id: 3, category: "Math", text: "Question 3" }
];

const uniqueCategories = [...new Set(
  filteredQuestions.map(question => question.category)
)];
console.log(uniqueCategories); // Output: ["Math", "Science"]