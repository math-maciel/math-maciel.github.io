const URL_JSON = 'https://raw.githubusercontent.com/math-maciel/math-maciel.github.io/main/books.json';
let livros = [];

async function carregarLivros() {
  try {
    const resposta = await fetch(URL_JSON);
    if (!resposta.ok) throw new Error('Erro ao carregar JSON');
    const dados = await resposta.json();
    livros = dados.books;
    exibirLivros(livros);
  } catch (erro) {
    document.getElementById('listaLivros').innerHTML = 'Erro ao carregar livros.';
    console.error(erro);
  }
}

function exibirLivros(lista) {
  const ul = document.getElementById('listaLivros');
  ul.innerHTML = '';

  if (lista.length === 0) {
    ul.innerHTML = '<li>Nenhum livro encontrado.</li>';
    return;
  }

  const livrosReservados = JSON.parse(localStorage.getItem('livrosReservados') || '[]');

  lista.forEach((livro, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-index', index);

    const reservado = livrosReservados.includes(livro.title);
    li.classList.toggle('reservado', reservado);

    li.innerHTML = `
      <strong>${livro.title}</strong> (${livro.year})<br>
      Autor: ${livro.author}<br>
      Gênero: ${livro.genre}<br>
      ${reservado
        ? `<span class="info-reservado">Livro reservado</span>`
        : `<button onclick="reservarLivro(${index})">Reservar</button>`
      }
    `;

    ul.appendChild(li);
  });
}

function reservarLivro(index) {
  const livro = livros[index];
  let livrosReservados = JSON.parse(localStorage.getItem('livrosReservados') || '[]');

  if (!livrosReservados.includes(livro.title)) {
    livrosReservados.push(livro.title);
    localStorage.setItem('livrosReservados', JSON.stringify(livrosReservados));
  }

  exibirLivros(livros); // Atualiza visualmente a lista
}

carregarLivros();

function filtrarLivros() {
  const termo = document.getElementById('filtroAutor').value.toLowerCase();
  const filtrados = livros.filter(l => l.author.toLowerCase().includes(termo));
  exibirLivros(filtrados);
}
