// ============================================================
//  SISTEM LOGIN - WALET FINISHGOOD STOCK MANAGER
// ============================================================
//
//  DAFTAR AKUN:
//  ┌──────────────┬──────────────┬─────────────────────────────────────────┐
//  │ Username     │ Password     │ Hak Akses                               │
//  ├──────────────┼──────────────┼─────────────────────────────────────────┤
//  │ admin        │ walet2025    │ ADMIN - Akses penuh (edit, hapus, input) │
//  │ viewer       │ lihat123     │ VIEWER - Hanya lihat data (read-only)   │
//  │ gudang       │ gudang456    │ VIEWER - Hanya lihat data (read-only)   │
//  └──────────────┴──────────────┴─────────────────────────────────────────┘
//
//  CARA MENAMBAH USER BARU:
//  Tambahkan baris baru di objek USERS di bawah ini.
//  Role: "admin" = akses penuh, "viewer" = hanya lihat
// ============================================================

const USERS = {
  "admin": {
    password: "walet2025",
    role: "admin",
    displayName: "Administrator",
    avatar: "A"
  },
  "viewer": {
    password: "lihat123",
    role: "viewer",
    displayName: "Viewer Umum",
    avatar: "V"
  },
  "gudang": {
    password: "gudang456",
    role: "viewer",
    displayName: "Staff Gudang",
    avatar: "G"
  }
};

// Simpan session di sessionStorage (hilang saat tab ditutup)
const SESSION_KEY = "walet_auth_session";

// ─── Cek apakah sudah login ──────────────────────────────────
function getSession() {
  try {
    const data = sessionStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function setSession(username, userInfo) {
  const session = {
    username,
    role: userInfo.role,
    displayName: userInfo.displayName,
    avatar: userInfo.avatar,
    loginTime: new Date().toISOString()
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

// ─── Fungsi Login ────────────────────────────────────────────
function attemptLogin(username, password) {
  const user = USERS[username.trim().toLowerCase()];
  if (!user) return { success: false, message: "Username tidak ditemukan." };
  if (user.password !== password) return { success: false, message: "Password salah." };
  const session = setSession(username.trim().toLowerCase(), user);
  return { success: true, session };
}

// ─── Fungsi Logout ───────────────────────────────────────────
function logout() {
  clearSession();
  showLoginScreen();
}

// ─── Tampilkan / sembunyikan layar login ─────────────────────
function showLoginScreen() {
  document.getElementById("login-overlay").style.display = "flex";
  document.getElementById("app-container").style.display = "none";
  document.getElementById("login-error").style.display = "none";
  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";
  // Reset tombol
  const btn = document.getElementById("login-btn");
  btn.disabled = false;
  btn.innerHTML = `<span>Masuk</span>
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
      <polyline points="10 17 15 12 10 7"/>
      <line x1="15" y1="12" x2="3" y2="12"/>
    </svg>`;
}

let _appInitialized = false;

function showAppScreen(session) {
  document.getElementById("login-overlay").style.display = "none";
  document.getElementById("app-container").style.display = "flex";

  // Tampilkan info user di sidebar
  updateUserInfo(session);

  // Terapkan pembatasan akses sesuai role
  applyRoleRestrictions(session.role);

  // Inisialisasi aplikasi utama SEKALI SAJA
  if (!_appInitialized && typeof initApp === "function") {
    _appInitialized = true;
    initApp();
  }
}

// ─── Tampilkan info user di sidebar ─────────────────────────
function updateUserInfo(session) {
  const avatarEl = document.getElementById("user-avatar");
  const nameEl   = document.getElementById("user-name");
  const roleEl   = document.getElementById("user-role-badge");

  if (avatarEl) avatarEl.textContent = session.avatar;
  if (nameEl)   nameEl.textContent   = session.displayName;
  if (roleEl) {
    roleEl.textContent  = session.role === "admin" ? "Admin" : "Viewer";
    roleEl.className    = `user-role-badge ${session.role === "admin" ? "role-admin" : "role-viewer"}`;
  }
}

// ─── Terapkan pembatasan berdasarkan role ────────────────────
function applyRoleRestrictions(role) {
  const isViewer = role === "viewer";

  // Elemen-elemen yang hanya bisa digunakan admin
  const adminOnlyIds = [
    "btn-add-item",      // Tombol Input Lot Baru
    "btn-merge-action",  // Tombol Gabung Outspek
  ];

  adminOnlyIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = isViewer ? "none" : "";
    }
  });

  // Sembunyikan tombol Impor, Ekspor JSON untuk viewer (tapi biarkan ekspor CSV)
  if (isViewer) {
    // Sembunyikan Import JSON
    const importBtn = document.querySelector("button[onclick='triggerImport()']");
    if (importBtn) importBtn.style.display = "none";
    
    // Sembunyikan Export JSON
    const exportJsonBtn = document.querySelector("button[onclick='exportJSON()']");
    if (exportJsonBtn) exportJsonBtn.style.display = "none";

    // Tambahkan banner info
    const existingBanner = document.getElementById("viewer-banner");
    if (!existingBanner) {
      const banner = document.createElement("div");
      banner.id = "viewer-banner";
      banner.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Mode <strong>Viewer</strong> — Anda hanya dapat melihat data. Hubungi Admin untuk mengubah data.
      `;
      banner.className = "viewer-banner";
      const header = document.querySelector(".header");
      if (header) header.parentNode.insertBefore(banner, header.nextSibling);
    }
  } else {
    // Hapus banner jika ada (mode admin)
    const existingBanner = document.getElementById("viewer-banner");
    if (existingBanner) existingBanner.remove();
  }

  // Simpan role di state global agar bisa dicek di app.js
  window.currentUserRole = role;
}

// ─── Init Autentikasi (dipanggil saat halaman load) ──────────
function initAuth() {
  const session = getSession();

  // Handle submit form login
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      handleLoginSubmit();
    });
  }

  // Handle Enter key
  document.getElementById("login-password")?.addEventListener("keydown", function(e) {
    if (e.key === "Enter") handleLoginSubmit();
  });

  // Handle tombol toggle password (show/hide)
  document.getElementById("toggle-password")?.addEventListener("click", function() {
    const pwInput = document.getElementById("login-password");
    const eyeIcon = document.getElementById("eye-icon");
    if (pwInput.type === "password") {
      pwInput.type = "text";
      eyeIcon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>`;
    } else {
      pwInput.type = "password";
      eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>`;
    }
  });

  if (session) {
    showAppScreen(session);
  } else {
    showLoginScreen();
  }
}

function handleLoginSubmit() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const errorEl  = document.getElementById("login-error");
  const btn      = document.getElementById("login-btn");

  if (!username || !password) {
    document.getElementById("login-error-text").textContent = "Username dan password harus diisi.";
    errorEl.style.display = "flex";
    return;
  }

  // Animasi loading
  btn.disabled = true;
  btn.innerHTML = `<div class="spinner"></div><span>Memverifikasi...</span>`;

  // Simulasi delay agar terasa natural
  setTimeout(() => {
    const result = attemptLogin(username, password);
    if (result.success) {
      errorEl.style.display = "none";
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"/></svg><span>Berhasil!</span>`;
      setTimeout(() => showAppScreen(result.session), 600);
    } else {
      btn.disabled = false;
      btn.innerHTML = `<span>Masuk</span>
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
          <polyline points="10 17 15 12 10 7"/>
          <line x1="15" y1="12" x2="3" y2="12"/>
        </svg>`;
      document.getElementById("login-error-text").textContent = result.message;
      errorEl.style.display = "flex";
      // Animasi shake pada card
      const card = document.querySelector(".login-card");
      card.classList.add("shake");
      setTimeout(() => card.classList.remove("shake"), 500);
    }
  }, 800);
}
