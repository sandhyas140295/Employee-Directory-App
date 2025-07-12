document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employee-form");
  const idField = document.getElementById("employee-id");
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const emailInput = document.getElementById("email");
  const departmentInput = document.getElementById("department");
  const roleInput = document.getElementById("role");

  const employeeId = new URLSearchParams(window.location.search).get("id");

  let employees = JSON.parse(localStorage.getItem("employees")) || [];


  if (employeeId) {
    const employee = employees.find(emp => emp.id === parseInt(employeeId));
    if (employee) {
      document.getElementById("form-title").innerText = "Edit Employee";
      idField.value = employee.id;
      firstNameInput.value = employee.firstName;
      lastNameInput.value = employee.lastName;
      emailInput.value = employee.email;
      departmentInput.value = employee.department;
      roleInput.value = employee.role;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = idField.value ? parseInt(idField.value) : Date.now();
    const employeeData = {
      id,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      department: departmentInput.value,
      role: roleInput.value
    };

    const existingIndex = employees.findIndex(emp => emp.id === id);
    if (existingIndex !== -1) {
      employees[existingIndex] = employeeData; 
    } else {
      employees.push(employeeData); 
    }

    localStorage.setItem("employees", JSON.stringify(employees));
    window.location.href = "dashboard.html?reload=true";
  });
});


function goBack() {
  window.location.href = "dashboard.html";
}

