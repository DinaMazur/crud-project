export function addStudentAPI(student) {
  return fetch("http://localhost:3000/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  })
    .then(response => response.json())
    .catch(error => {
      console.error("Помилка при додаванні студента:", error);
    });
}
