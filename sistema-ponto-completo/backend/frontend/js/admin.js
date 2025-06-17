const token = localStorage.getItem('token');

// GERA RELATÓRIO
async function gerarRelatorio() {
  const res = await fetch('http://localhost:3000/api/admin/relatorio', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    document.getElementById('mensagemAdmin').innerText = 'Erro ao gerar relatório';
    return;
  }
  const blob = await res.blob();
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'relatorio.pdf';
  link.click();
}

// LISTAR FUNCIONÁRIOS
async function carregarFuncionarios() {
  const res = await fetch('http://localhost:3000/api/admin/funcionarios', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) return;
  const list = await res.json();
  const tbody = document.querySelector('#tabelaFuncionarios tbody');
  tbody.innerHTML = '';
  list.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${f.matricula}</td>
      <td>${f.nome}</td>
      <td>${f.perfil}</td>
      <td><button onclick="removerFuncionario(${f.id})">Remover</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// ABRIR FORMULÁRIO
function abrirFormulario() {
  document.getElementById('formCadastro').style.display = 'block';
}

// CADASTRAR FUNCIONÁRIO

document.getElementById('formFuncionario').addEventListener('submit', function(e) {
  e.preventDefault(); // impede o reload da página
  cadastrarFuncionario();
});

async function cadastrarFuncionario() {
  const matricula = document.getElementById('matricula').value;
  const nome      = document.getElementById('nome').value;
  const senha     = document.getElementById('senha').value;
  const tipo      = document.getElementById('tipo').value;

  try {
    const res = await fetch('http://localhost:3000/api/admin/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ matricula, nome, senha, tipo })
    });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    alert(data.message);
    carregarFuncionarios();
    document.getElementById('formCadastro').style.display = 'none';
  } catch (err) {
    console.error('Erro cadastrarFuncionario:', err);
    alert('Erro ao cadastrar funcionário');
  }
}

// REMOVER FUNCIONÁRIO
async function removerFuncionario(id) {
  if (!confirm('Confirmar remoção?')) return;
  const res = await fetch(`http://localhost:3000/api/admin/funcionarios/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    alert('Erro ao remover');
    return;
  }
  const data = await res.json();
  alert(data.message);
  carregarFuncionarios();
}

document.addEventListener('DOMContentLoaded', carregarFuncionarios);
