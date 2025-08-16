export function updateStudentAPI(id, student) {
  return fetch(`http://localhost:3000/students/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  })
    .then(response => response.json())
    .catch(error => {
      console.error("Помилка при оновленні студента:", error);
    });
}
