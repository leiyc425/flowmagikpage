const USER_ROUTE = [
  { match: /^client1(\b|_)/i, target: "client1.portal.html" },
  { match: /^client2(\b|_)/i, target: "client2.portal.html" },
];

function pickTarget(username){
  const u = (username || "").trim();
  for (const r of USER_ROUTE){
    if (r.match.test(u)) return r.target;
  }
  return null;
}

function qs(sel){ return document.querySelector(sel); }

document.addEventListener("DOMContentLoaded", () => {
  const form = qs("#portalForm");
  if(!form) return;

  const err = qs("#err");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    err.textContent = "";

    const username = qs("#username").value;
    const password = qs("#password").value; // demo only
    const target = pickTarget(username);

    if(!username || !password){
      err.textContent = "Please enter username and password.";
      return;
    }
    if(!target){
      err.textContent = "User not recognized. Please check your username.";
      return;
    }

    sessionStorage.setItem("portal_user", username.trim());
    window.location.href = target;
  });
});