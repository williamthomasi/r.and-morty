const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const content = document.getElementById('content');
const conteinerResult = document.getElementById('result-style');
const image = document.getElementById('img');

const fetchApi = async (value) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${value}`);
  const result = await response.json();
  console.log(result);
  return result;
};

const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];
const newKeys = {
  name: 'Nome',
  status: 'Status',
  species: 'Espécie',
  gender: 'Gênero',
  origin: 'Planeta de origem',
  episode: 'Episódios',
};

const buildResult = (result) => {
  // Limpar conteúdo anterior
  content.innerHTML = '';

  keys.forEach((key) => {
    if (document.getElementById(key).checked) {
      const newElem = document.createElement('p');

      if (Array.isArray(result[key])) {
        newElem.innerHTML = `${newKeys[key]}: ${result[key].join('<br>')}`;
      } else if (key === 'origin') {
        newElem.innerHTML = `${newKeys[key]}: ${result[key].name}`;
      } else {
        newElem.innerHTML = `${newKeys[key]}: ${result[key]}`;
      }

      content.appendChild(newElem);
    }
  });
};

btnGo.addEventListener('click', async (event) => {
  event.preventDefault();

  if (characterId.value === '') {
    return (content.innerHTML = 'É necessário fazer um filtro.');
  }

  const result = await fetchApi(characterId.value);
  conteinerResult.className = 'result-style';
  image.src = result.image;
  buildResult(result);
});

btnReset.addEventListener('click', () => {
  // Limpar campos necessários
  content.innerHTML = '';
  conteinerResult.className = 'result-style';
  image.src = '';
  // Restaurar campos para o estado inicial se necessário
  characterId.value = '';
  keys.forEach((key) => {
    const checkbox = document.getElementById(key);
    checkbox.checked = false;
  });
});
