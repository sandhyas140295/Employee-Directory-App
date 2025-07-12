document.addEventListener("DOMContentLoaded", () => {
  const firstNameInput = document.getElementById("filter-first-name");
  const departmentInput = document.getElementById("filter-department");
  const roleInput = document.getElementById("filter-role");
  const applyFilterBtn = document.getElementById("apply-filter-btn");
  const resetFilterBtn = document.getElementById("reset-filter-btn");

  function applyFilter() {
    const firstName = firstNameInput.value.toLowerCase();
    const department = departmentInput.value.toLowerCase();
    const role = roleInput.value.toLowerCase();

    filteredEmployees = mockEmployees.filter(emp => {
      return (
        (!firstName || emp.firstName.toLowerCase().includes(firstName)) &&
        (!department || emp.department.toLowerCase().includes(department)) &&
        (!role || emp.role.toLowerCase().includes(role))
      );
    });

    currentPage = 1;
    renderEmployees();
  }

  function resetFilter() {
    firstNameInput.value = "";
    departmentInput.value = "";
    roleInput.value = "";

    filteredEmployees = [...mockEmployees];
    currentPage = 1;
    renderEmployees();
  }

  applyFilterBtn.addEventListener("click", applyFilter);
  resetFilterBtn.addEventListener("click", resetFilter);
});