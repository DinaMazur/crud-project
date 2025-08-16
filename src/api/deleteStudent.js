export function deleteStudentAPI(id) {
  return fetch(`http://localhost:3000/students/${id}`, {
    method: "DELETE"
  })
    .then(response => response.ok)
    .catch(error => {
      console.error("Помилка при видаленні студента:", error);
    });
}
