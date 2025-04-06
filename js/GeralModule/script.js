// script.js - Handles table rendering and filtering logic

// Get DOM elements
const globalSearchInput = document.getElementById('globalSearch');
const filterTituloInput = document.getElementById('filterTitulo');
const filterOcorrenciaInput = document.getElementById('filterOcorrencia');
const filterAcaoInput = document.getElementById('filterAcao');
const tableBody = document.getElementById('dataTableBody');

// Function to render the table rows
function renderTable(dataToRender) {
    // Clear existing table rows
    tableBody.innerHTML = '';

    if (dataToRender.length === 0) {
        // Display a message if no data matches the filters
        const row = tableBody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 4; // Span across all columns
        cell.textContent = 'Nenhum resultado encontrado.';
        cell.classList.add('no-results'); // Apply styling
        return;
    }

    // Populate table with data
    dataToRender.forEach(item => {
        const row = tableBody.insertRow();

        const cellTitulo = row.insertCell();
        cellTitulo.textContent = item.titulo || ''; // Handle potential undefined values

        const cellOcorrencia = row.insertCell();
        cellOcorrencia.textContent = item.ocorrencia || '';

        const cellAcao = row.insertCell();
        cellAcao.textContent = item.acao || '';

        const cellTexto = row.insertCell();
        cellTexto.textContent = item.texto || '';
    });
}

// Function to filter data based on input values
function filterAndRender() {
    const globalSearchTerm = globalSearchInput.value.toLowerCase().trim();
    const tituloFilter = filterTituloInput.value.toLowerCase().trim();
    const ocorrenciaFilter = filterOcorrenciaInput.value.toLowerCase().trim();
    const acaoFilter = filterAcaoInput.value.toLowerCase().trim();

    const filteredData = tableData.filter(item => {
        const titulo = (item.titulo || '').toLowerCase();
        const ocorrencia = (item.ocorrencia || '').toLowerCase();
        const acao = (item.acao || '').toLowerCase();
        const texto = (item.texto || '').toLowerCase();

        // --- Global Search ---
        // Check if global search term matches any field
        const matchesGlobalSearch = globalSearchTerm === '' ||
            titulo.includes(globalSearchTerm) ||
            ocorrencia.includes(globalSearchTerm) ||
            acao.includes(globalSearchTerm) ||
            texto.includes(globalSearchTerm);

        // --- Column Filters ---
        // Check if column filters match respective fields
        const matchesTitulo = tituloFilter === '' || titulo.includes(tituloFilter);
        const matchesOcorrencia = ocorrenciaFilter === '' || ocorrencia.includes(ocorrenciaFilter);
        const matchesAcao = acaoFilter === '' || acao.includes(acaoFilter);

        // Row must match global search AND all active column filters
        return matchesGlobalSearch && matchesTitulo && matchesOcorrencia && matchesAcao;
    });

    renderTable(filteredData);
}

// --- Event Listeners ---
// Add event listeners to filter inputs to trigger filtering on input change
globalSearchInput.addEventListener('input', filterAndRender);
filterTituloInput.addEventListener('input', filterAndRender);
filterOcorrenciaInput.addEventListener('input', filterAndRender);
filterAcaoInput.addEventListener('input', filterAndRender);

// --- Initial Render ---
// Render the full table when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Ensure data is loaded before initial render if data.js was loaded async
    // In this setup, it's synchronous, so we can call directly.
    if (typeof tableData !== 'undefined') {
         renderTable(tableData);
    } else {
        console.error("Error: tableData is not defined. Check data.js");
        tableBody.innerHTML = '<tr><td colspan="4">Erro ao carregar dados.</td></tr>';
    }
});