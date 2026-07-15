const API_URL = "http://localhost:5500/api";

function scrollToRegister() {
  const selectedCountry = document.getElementById("searchCountry")?.value;
  const selectedCourse = document.getElementById("searchCourse")?.value;

  document.getElementById("register").scrollIntoView({
    behavior: "smooth"
  });

  setTimeout(() => {
    if (selectedCountry && selectedCountry !== "Select Country") {
      document.getElementById("country").value = selectedCountry;
    }

    if (selectedCourse && selectedCourse !== "Select Course") {
      document.getElementById("course").value = selectedCourse;
    }
  }, 500);
}




const registerStudent = async () => {
  const data = {
    name: document.getElementById("name").value.trim(),
    email : document.getElementById("email").value.trim(),



    phone: iti.getNumber(),

    country: document.getElementById("country").value,
    course: document.getElementById("course").value
  };

  if (
    !data.name ||
    !data.email ||
    !data.phone 
    
  ) {
    alert("Please fill name, email, phone ");
    return;
  }


      const email = document.getElementById("email").value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Invalid email format");
            return;
        }

  if (!iti.isValidNumber()) {
    alert("Please enter a valid phone number.");
    return;
  }

  console.log(data);

  // axios/fetch request here

  try {
    const response = await fetch(`${API_URL}/student/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert("Student registered successfully");
      window.location.href = "home.html";
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert("Server error. Please check backend is running.");
  }
};

const loginStudent = async () => {
  const data = {
    email: document.getElementById("studentEmail").value.trim(),
    password: document.getElementById("studentPassword").value.trim()
  };

  if (!data.email || !data.password) {
    alert("Please fill email and password");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/student/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("studentToken", result.token);
      alert("Student login successful");
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert("Server error. Please check backend is running.");
  }
};

const loginAdmin = async () => {
  const data = {
    email: document.getElementById("adminEmail").value.trim(),
    password: document.getElementById("adminPassword").value.trim()
  };

  if (!data.email || !data.password) {
    alert("Please fill admin email and password");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("adminToken", result.token);
      window.location.href = "adminDashboard.html";
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert("Server error. Please check backend is running.");
  }
};

const getStudents = async () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    alert("Please login as admin first");
    window.location.href = "adminLogin.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/admin/students`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const students = await response.json();

    if (!response.ok) {
      alert(students.message);
      return;
    }

    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student) => {
      table.innerHTML += `
        <tr>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.phone}</td>
          <td>${student.country}</td>
          <td>${student.course}</td>
          <td>${student.status}</td>
          <td>
            <select onchange="updateStatus('${student._id}', this.value)">
              <option value="">Change</option>
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </td>
          <td>
            <button class="delete-btn" onclick="deleteStudent('${student._id}')">
              Delete
            </button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    alert("Server error. Please check backend is running.");
  }
};

const updateStatus = async (id, status) => {
  if (!status) return;

  const token = localStorage.getItem("adminToken");

  try {
    const response = await fetch(`${API_URL}/admin/students/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Status updated");
      getStudents();
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert("Server error. Please check backend is running.");
  }
};

const deleteStudent = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this student?");

  if (!confirmDelete) return;

  const token = localStorage.getItem("adminToken");

  try {
    const response = await fetch(`${API_URL}/admin/students/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const result = await response.json();

    if (response.ok) {
      alert("Student deleted");
      getStudents();
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert("Server error. Please check backend is running.");
  }
};


//herosection
const hero = document.querySelector(".hero");

const images = [
  "img/img1.jpg",
  "img/img2.jpg",
  "img/img3.jpg"
];

let index = 0;

function showImage() {
  hero.style.backgroundImage = `url(${images[index]})`;
}

function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}

showImage();

setInterval(nextImage, 5000);