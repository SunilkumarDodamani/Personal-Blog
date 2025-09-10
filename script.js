// ===== Theme Toggle =====
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  // Apply saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "light" ? "🌙" : "☀️";

  themeToggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";

    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Update button icon
    themeToggle.textContent = newTheme === "light" ? "🌙" : "☀️";
  });
}

// ===== Navbar Hamburger =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ===== Comments Handling =====
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");
if (commentForm && commentList) {
  let savedComments = JSON.parse(localStorage.getItem("comments") || "[]");

  // Load existing comments
  savedComments.forEach(addCommentToDOM);

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email.includes("@") || !message) {
      alert("Please fill all fields with valid data.");
      return;
    }

    const comment = { name, email, message };
    addCommentToDOM(comment);

    savedComments.push(comment);
    localStorage.setItem("comments", JSON.stringify(savedComments));

    commentForm.reset();
  });
}

// ===== Utility: Add Comment to DOM =====
function addCommentToDOM(comment) {
  const div = document.createElement("div");
  div.classList.add("comment");

  // Escape content to prevent XSS
  const safeName = document.createTextNode(comment.name);
  const safeMessage = document.createTextNode(comment.message);

  const strong = document.createElement("strong");
  strong.appendChild(safeName);

  const p = document.createElement("p");
  p.appendChild(safeMessage);

  div.appendChild(strong);
  div.appendChild(p);

  commentList.appendChild(div);
}
