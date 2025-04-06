// script_usuarios.js - Handles user table rendering and filtering logic

// Get DOM elements
const globalSearchInput = document.getElementById('globalSearch');
const filterMatriculaInput = document.getElementById('filterMatricula');
const filterNomeInput = document.getElementById('filterNome');
const filterFuncaoInput = document.getElementById('filterFuncao');
const filterAtuacaoInput = document.getElementById('filterAtuacao');
const filterEquipeInput = document.getElementById('filterEquipe');
const filterCoordenadorInput = document.getElementById('filterCoordenador');
const filterFuncaoChefiaInput = document.getElementById('filterFuncaoChefia');
const filterEmailInput = document.getElementById('filterEmail');
const tableBodyUsuarios = document.getElementById('dataTableBodyUsuarios');

// --- Function to render the table rows ---
function renderTable(dataToRender) {
    // Clear existing table rows
    tableBodyUsuarios.innerHTML = '';

    if (!dataToRender || dataToRender.length === 0) {
        // Display a message if no data matches the filters
        const row = tableBodyUsuarios.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 8; // Span across all 8 columns
        cell.textContent = 'Nenhum usuário encontrado.';
        cell.classList.add('no-results');
        return;
    }

    // Populate table with data
    dataToRender.forEach(user => {
        const row = tableBodyUsuarios.insertRow();

        // Add cells in the correct order based on the table headers
        row.insertCell().textContent = user.matricula || '';
        row.insertCell().textContent = user.nome || '';
        row.insertCell().textContent = user.funcao || '';
        row.insertCell().textContent = user.atuacao || '';
        row.insertCell().textContent = user.equipe || '';
        row.insertCell().textContent = user.coordenador || '';
        row.insertCell().textContent = user.funcaoChefia || '';
        row.insertCell().textContent = user.email || '';
    });
}

// --- Function to filter data based on input values ---
function filterAndRender() {
    const globalSearchTerm = globalSearchInput.value.toLowerCase().trim();
    const matriculaFilter = filterMatriculaInput.value.toLowerCase().trim();
    const nomeFilter = filterNomeInput.value.toLowerCase().trim();
    const funcaoFilter = filterFuncaoInput.value.toLowerCase().trim();
    const atuacaoFilter = filterAtuacaoInput.value.toLowerCase().trim();
    const equipeFilter = filterEquipeInput.value.toLowerCase().trim();
    const coordenadorFilter = filterCoordenadorInput.value.toLowerCase().trim();
    const funcaoChefiaFilter = filterFuncaoChefiaInput.value.toLowerCase().trim();
    const emailFilter = filterEmailInput.value.toLowerCase().trim();

    const filteredData = userData.filter(user => {
        // Prepare data fields for case-insensitive comparison
        const matricula = (user.matricula || '').toLowerCase();
        const nome = (user.nome || '').toLowerCase();
        const funcao = (user.funcao || '').toLowerCase();
        const atuacao = (user.atuacao || '').toLowerCase();
        const equipe = (user.equipe || '').toLowerCase();
        const coordenador = (user.coordenador || '').toLowerCase();
        const funcaoChefia = (user.funcaoChefia || '').toLowerCase();
        const email = (user.email || '').toLowerCase();

        // --- Global Search ---
        const matchesGlobalSearch = globalSearchTerm === '' ||
            matricula.includes(globalSearchTerm) ||
            nome.includes(globalSearchTerm) ||
            funcao.includes(globalSearchTerm) ||
            atuacao.includes(globalSearchTerm) ||
            equipe.includes(globalSearchTerm) ||
            coordenador.includes(globalSearchTerm) ||
            funcaoChefia.includes(globalSearchTerm) ||
            email.includes(globalSearchTerm);

        // --- Column Filters ---
        const matchesMatricula = matriculaFilter === '' || matricula.includes(matriculaFilter);
        const matchesNome = nomeFilter === '' || nome.includes(nomeFilter);
        const matchesFuncao = funcaoFilter === '' || funcao.includes(funcaoFilter);
        const matchesAtuacao = atuacaoFilter === '' || atuacao.includes(atuacaoFilter);
        const matchesEquipe = equipeFilter === '' || equipe.includes(equipeFilter);
        const matchesCoordenador = coordenadorFilter === '' || coordenador.includes(coordenadorFilter);
        const matchesFuncaoChefia = funcaoChefiaFilter === '' || funcaoChefia.includes(funcaoChefiaFilter);
        const matchesEmail = emailFilter === '' || email.includes(emailFilter);

        // Row must match global search AND all active column filters
        return matchesGlobalSearch &&
               matchesMatricula &&
               matchesNome &&
               matchesFuncao &&
               matchesAtuacao &&
               matchesEquipe &&
               matchesCoordenador &&
               matchesFuncaoChefia &&
               matchesEmail;
    });

    renderTable(filteredData);
}

// --- Event Listeners ---
// Add event listeners to all filter inputs
globalSearchInput.addEventListener('input', filterAndRender);
filterMatriculaInput.addEventListener('input', filterAndRender);
filterNomeInput.addEventListener('input', filterAndRender);
filterFuncaoInput.addEventListener('input', filterAndRender);
filterAtuacaoInput.addEventListener('input', filterAndRender);
filterEquipeInput.addEventListener('input', filterAndRender);
filterCoordenadorInput.addEventListener('input', filterAndRender);
filterFuncaoChefiaInput.addEventListener('input', filterAndRender);
filterEmailInput.addEventListener('input', filterAndRender);

// --- Initial Render ---
// Render the full table when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typeof userData !== 'undefined' && Array.isArray(userData)) {
         renderTable(userData);
    } else {
        console.error("Error: userData is not defined or not an array. Check data_usuarios.js");
        tableBodyUsuarios.innerHTML = '<tr><td colspan="8">Erro ao carregar dados dos usuários.</td></tr>';
    }
});