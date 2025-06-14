const token = localStorage.getItem('token');

async function registrar(tipo) {
  const horario = document.getElementById('horarioSelecionado').value;

  if (!horario) {
    document.getElementById('mensagemRetorno').innerText = 'Selecione um horário.';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/ponto/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ tipo, hora: horario })
    });

    const data = await res.json();
    document.getElementById('mensagemRetorno').innerText = data.message;
  } catch (err) {
    console.error('Erro registrar ponto:', err);
    document.getElementById('mensagemRetorno').innerText = 'Erro de conexão.';
  }
}
