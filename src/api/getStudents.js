export function getStudentsAPI() {
  return fetch("http://localhost:3000/students")
    .then(response => response.json())
    .catch(error => {
      console.error("Помилка при отриманні студентів:", error);
      return [];
    });
}
