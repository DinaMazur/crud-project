export const getStudents = () => fetch("http://localhost:3000/students").then(res => res.json());

