//logout function

export default function handleLogout() {
  localStorage.removeItem("first_name");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  localStorage.removeItem("slug");
  window.location.href = "/";
}