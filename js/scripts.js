// Seleção de Elementos
const tarefaForm = document.querySelector('#tarefa-form');
const tarefaInput = document.querySelector('#tarefa-input');
const tarefaList = document.querySelector('#tarefa-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;

// Funções
const salvarTarefa = (text) => {

  const tarefa = document.createElement('div');
  tarefa.classList.add('tarefa');

  const tarefaTitle = document.createElement('h3');
  tarefaTitle.innerText = text;
  tarefa.appendChild(tarefaTitle);

  const prontoBtn = document.createElement('button');
  prontoBtn.classList.add('tarefa-finalizada')
  prontoBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  tarefa.appendChild(prontoBtn)

  const editBtn = document.createElement('button');
  editBtn.classList.add('editar-tarefa')
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  tarefa.appendChild(editBtn)

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('deletar-tarefa')
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  tarefa.appendChild(deleteBtn);

  tarefaList.appendChild(tarefa);

  tarefaInput.value = '';
  tarefaInput.focus();
};

const toggleForms = () => {
  editForm.classList.toggle('hide');
  tarefaForm.classList.toggle('hide');
  tarefaList.classList.toggle('hide');
};

const updateTarefa = (text) => {

  const tarefas = document.querySelectorAll('.tarefa');

  tarefas.forEach((tarefa) => {

    let tarefaTitle = tarefa.querySelector('h3');

    if (tarefaTitle.innerText === oldInputValue) {
      tarefaTitle.innerText = text;
    }
  });
};

// Eventos
tarefaForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = tarefaInput.value;

  if (inputValue) {
    salvarTarefa(inputValue);
  }
});

document.addEventListener('click', (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest('div');
  let tarefaTitle;

  if (parentEl && parentEl.querySelector('h3')) {
    tarefaTitle = parentEl.querySelector('h3').innerText;
  }

  if (targetEl.classList.contains('tarefa-finalizada')) {
    parentEl.classList.toggle('pronto');
  }

  if (targetEl.classList.contains('deletar-tarefa')) {
    parentEl.remove();
  }

  if (targetEl.classList.contains('editar-tarefa')) {
    toggleForms();

    editInput.value = tarefaTitle;
    oldInputValue = tarefaTitle;
  }
});

cancelEditBtn.addEventListener('click', (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const editInputValue = editInput.value

  if (editInputValue) {
    updateTarefa(editInputValue)
  }

  toggleForms();
});