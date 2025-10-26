const USERS_KEY = 'users_cherry';
const SESSION_KEY = 'session_cherry';
const RESET_KEY = 'reset_tokens_cherry';

function loadUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [{ email: 'demo@cherry.com', password: '1234' }];
}
function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

function loginUser(email, password) {
  const users = loadUsers();
  const found = users.find(u => u.email === email && u.password === password);
  if (found) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
    return true;
  }
  return false;
}

function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "index.html";
}

function registerUser(email, password) {
  const users = loadUsers();
  if (users.find(u => u.email === email)) return false;
  users.push({ email, password });
  saveUsers(users);
  return true;
}

function currentUser() {
  const s = JSON.parse(localStorage.getItem(SESSION_KEY));
  return s ? s.email : null;
}

function adjustNavbarForAuth() {
  const email = currentUser();
  const perfilLinks = document.querySelectorAll('.nav-perfil');

  perfilLinks.forEach(a => {
    if (email) {
      a.textContent = 'Perfil';
      a.href = 'perfil.html';
    } else {
      a.textContent = 'Iniciar Sesión';
      a.href = 'login.html';
    }
  });

  const navLogout = document.querySelector('.nav-logout');
  if (navLogout) {
    navLogout.style.display = email ? 'inline-block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', adjustNavbarForAuth);
