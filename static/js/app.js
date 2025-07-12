document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("employee-list-container");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const itemsPerPageSelect = document.getElementById("items-per-page");
  const paginationControls = document.getElementById("pagination-controls");
  const filterToggleBtn = document.getElementById("filter-toggle");
  const sidebar = document.getElementById("filter-sidebar");

  const filterFirstName = document.getElementById("filter-first-name");
  const filterDepartment = document.getElementById("filter-department");
  const filterRole = document.getElementById("filter-role");
  const applyFilterBtn = document.getElementById("apply-filter-btn");
  const resetFilterBtn = document.getElementById("reset-filter-btn");

  let allEmployees = [];
  let filteredEmployees = [];
  let currentPage = 1;
  let itemsPerPage = 10;

  function getEmployeesFromStorage() {
    return JSON.parse(localStorage.getItem("employees")) || [];
  }

  function paginate(array, page, perPage) {
    const start = (page - 1) * perPage;
    return array.slice(start, start + perPage);
  }

  function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationControls.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = i === currentPage ? "active" : "";
      btn.addEventListener("click", () => {
        currentPage = i;
        renderEmployees();
      });
      paginationControls.appendChild(btn);
    }
  }

  function renderEmployees() {
    container.innerHTML = "";
    const employeesToShow = paginate(filteredEmployees, currentPage, itemsPerPage);

    employeesToShow.forEach(emp => {
      const card = document.createElement("div");
      card.className = "employee-card";
      card.innerHTML = `
        <h3>${emp.firstName} ${emp.lastName}</h3>
        <p>ID: ${emp.id}</p>
        <p>Email: ${emp.email}</p>
        <p>Department: ${emp.department}</p>
        <p>Role: ${emp.role}</p>
        <button type="button" class="edit-btn" data-id="${emp.id}">Edit</button>
        <button type="button" class="delete-btn" data-id="${emp.id}">Delete</button>
      `;
      container.appendChild(card);
    });

    attachEventListeners();
    renderPagination(filteredEmployees.length);
  }

  function attachEventListeners() {
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        allEmployees = allEmployees.filter(emp => emp.id !== id);
        localStorage.setItem("employees", JSON.stringify(allEmployees));
        applyAllFilters();
      });
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        window.location.href = `add-edit-form.html?editId=${id}`;
      });
    });
  }

  function applyAllFilters() {
    allEmployees = getEmployeesFromStorage(); 
    const searchText = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    filteredEmployees = allEmployees.filter(emp =>
      emp.firstName.toLowerCase().includes(searchText) ||
      emp.lastName.toLowerCase().includes(searchText) ||
      emp.email.toLowerCase().includes(searchText)
    );

    if (filterFirstName.value) {
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.firstName.toLowerCase().includes(filterFirstName.value.toLowerCase())
      );
    }

    if (filterDepartment.value) {
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.department.toLowerCase().includes(filterDepartment.value.toLowerCase())
      );
    }

    if (filterRole.value) {
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.role.toLowerCase().includes(filterRole.value.toLowerCase())
      );
    }

    if (sortValue) {
      filteredEmployees.sort((a, b) =>
        a[sortValue].localeCompare(b[sortValue])
      );
    }

    currentPage = 1;
    renderEmployees();
  }

 
  searchInput.addEventListener("input", applyAllFilters);
  sortSelect.addEventListener("change", applyAllFilters);
  itemsPerPageSelect.addEventListener("change", (e) => {
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderEmployees();
  });

  filterToggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });

  applyFilterBtn.addEventListener("click", applyAllFilters);
  resetFilterBtn.addEventListener("click", () => {
    filterFirstName.value = "";
    filterDepartment.value = "";
    filterRole.value = "";
    applyAllFilters();
  });

 
  applyAllFilters();
});
