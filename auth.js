const supabaseClient = window.supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_PUBLISHABLE_KEY
);

async function requireAuth() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    window.location.href = "login.html";
    return null;
  }
  return session;
}

async function getProfile(userId) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

async function signOut() {
  await supabaseClient.auth.signOut();
  window.location.href = "login.html";
}

window.supabaseClient = supabaseClient;
window.requireAuth = requireAuth;
window.getProfile = getProfile;
window.signOut = signOut;
