async function initFarmApp() {
  const session = await requireAuth();
  if (!session) return null;
  const profile = await getProfile(session.user.id);
  document.querySelectorAll("[data-user-name]").forEach(el => el.textContent = profile.name || "Usuário");
  document.querySelectorAll("[data-user-role]").forEach(el => el.textContent = profile.role === "admin" ? "Administradora" : "Equipe");
  document.querySelectorAll("[data-signout]").forEach(el => el.addEventListener("click", (e) => { e.preventDefault(); signOut(); }));
  return { session, profile };
}

window.initFarmApp = initFarmApp;
