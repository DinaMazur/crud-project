import { getStudentsAPI } from "./api/getStudents.js";
import { addStudentAPI } from "./api/addStudent.js";
import { updateStudentAPI } from "./api/updateStudent.js";
import { deleteStudentAPI } from "./api/deleteStudent.js";

const tableBody = document.querySelector("#students-table tbody");
const form = document.getElementById("add-student-form");
const getBtn = document.getElementById("get-students-btn");

let editId = null;

function showStudents(students) {
  tableBody.innerHTML = "";
  students.forEach(student => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(", ")}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "Так" : "Ні"}</td>
      <td>
        <button class="edit" data-id="${student.id}">✏️</button>
        <button class="delete" data-id="${student.id}">🗑️</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function loadStudents() {
  getStudentsAPI().then(showStudents);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const student = {
    name: form.elements.name.value,
    age: Number(form.elements.age.value),
    course: form.elements.course.value,
    skills: form.elements.skills.value.split(",").map(s => s.trim()),
    email: form.elements.email.value,
    isEnrolled: form.elements.isEnrolled?.checked || false
  };

  if (editId) {
    updateStudentAPI(editId, student).then(() => {
      editId = null;
      form.reset();
      loadStudents();
    });
  } else {
    addStudentAPI(student).then(() => {
      form.reset();
      loadStudents();
    });
  }
});

tableBody.addEventListener("click", (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("edit")) {
    getStudentsAPI().then(data => {
      const student = data.find(s => s.id == id);

      form.elements.name.value = student.name;
      form.elements.age.value = student.age;
      form.elements.course.value = student.course;
      form.elements.skills.value = student.skills.join(", ");
      form.elements.email.value = student.email;
      form.elements.isEnrolled.checked = student.isEnrolled;
      editId = student.id;
    });
  }

  if (e.target.classList.contains("delete")) {
    deleteStudentAPI(id).then(() => {
      if (editId == id) {
        form.reset();
        editId = null;
      }
      loadStudents();
    });
  }
});

getBtn.addEventListener("click", loadStudents);
