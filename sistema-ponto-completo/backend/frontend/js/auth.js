const API_URL = "http://localhost:3000/api";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const matricula = document.getElementById("matricula").value;
  const senha = document.getElementById("senha").value;
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ matricula, senha }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("perfil", data.perfil);
    if (data.perfil === "admin") window.location.href = "admin.html";
    else window.location.href = "funcionario.html";
  } else {
    document.getElementById("mensagemErro").innerText = data.message;
  }
});