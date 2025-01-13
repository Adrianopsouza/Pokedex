// Seleciona elementos HTML onde serão exibidos os dados do Pokémon
const pokemonName = document.querySelector('.pokemon__name'); // Nome do Pokémon
const pokemonNumber = document.querySelector('.pokemon__number'); // Número do Pokémon
const pokemonImage = document.querySelector('.pokemon__image'); // Imagem do Pokémon

// Seleciona elementos para interação do usuário
const form = document.querySelector('.form'); // Formulário para pesquisa
const input = document.querySelector('.input__search'); // Campo de entrada para o nome ou número do Pokémon
const buttonPrev = document.querySelector('.btn-prev'); // Botão para Pokémon anterior
const buttonNext = document.querySelector('.btn-next'); // Botão para próximo Pokémon

// Define o Pokémon inicial a ser exibido (ID 1)
let searchPokemon = 1;

// Função assíncrona para buscar dados do Pokémon da API
const fetchPokemon = async (pokemon) => {
  // Faz uma chamada à API com o nome ou ID do Pokémon
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  // Verifica se a resposta foi bem-sucedida
  if (APIResponse.status === 200) {
    const data = await APIResponse.json(); // Converte a resposta para JSON
    return data; // Retorna os dados do Pokémon
  }
}

// Função assíncrona para renderizar o Pokémon na interface
const renderPokemon = async (pokemon) => {
  // Exibe mensagem de carregamento enquanto busca os dados
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  // Obtém os dados do Pokémon
  const data = await fetchPokemon(pokemon);

  // Caso os dados sejam encontrados
  if (data) {
    pokemonImage.style.display = 'block'; // Exibe a imagem do Pokémon
    pokemonName.innerHTML = data.name; // Nome do Pokémon
    pokemonNumber.innerHTML = data.id; // Número do Pokémon
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // URL da imagem animada
    input.value = ''; // Limpa o campo de entrada
    searchPokemon = data.id; // Atualiza o ID do Pokémon atual
  } else {
    // Caso os dados não sejam encontrados
    pokemonImage.style.display = 'none'; // Oculta a imagem
    pokemonName.innerHTML = 'Not found :c'; // Mensagem de erro
    pokemonNumber.innerHTML = '';
  }
}

// Adiciona evento ao formulário para tratar a submissão
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o comportamento padrão do formulário
  renderPokemon(input.value.toLowerCase()); // Renderiza o Pokémon com base no valor do campo de entrada
});

// Adiciona evento ao botão "Anterior"
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) { // Garante que não volte antes do ID 1
    searchPokemon -= 1; // Decrementa o ID
    renderPokemon(searchPokemon); // Renderiza o Pokémon anterior
  }
});

// Adiciona evento ao botão "Próximo"
buttonNext.addEventListener('click', () => {
  searchPokemon += 1; // Incrementa o ID
  renderPokemon(searchPokemon); // Renderiza o próximo Pokémon
});

// Renderiza o primeiro Pokémon ao carregar a página
renderPokemon(searchPokemon);
