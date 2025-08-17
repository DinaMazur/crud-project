
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
        <button class="edit" data-id="${student.id}">Update</button>
        <button class="delete" data-id="${student.id}">delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

async function addStudentAPI(student) {
  try {
    const response = await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
    return await response.json();
  } catch (error) {
    console.error("Помилка при додаванні студента:", error);
  }
}

 async function getStudentsAPI() {
  try {
    const response = await fetch("http://localhost:3000/students");
    return await response.json();
  } catch (error) {
    console.error("Помилка при отриманні студентів:", error);
    return [];
  }
}
 async function deleteStudentAPI(id) {
  try {
    const response = await fetch(`http://localhost:3000/students/${id}`, {
      method: "DELETE"
    });
    return await response.json();
  } catch (error) {
    console.error("Помилка при видаленні студента:", error);
  }
}


async function updateStudentAPI(id, student) {
  try {
    const response = await fetch(`http://localhost:3000/students/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
    return await response.json();
  } catch (error) {
    console.error("Помилка при оновленні студента:", error);
  }
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
