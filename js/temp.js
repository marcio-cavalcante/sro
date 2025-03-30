// Função para configurar os listeners da seção de tarifas pendentes
function setupTarifasPendentesListeners() {
    const tarifasPendentes = document.getElementById('tarifasPendentes');
    const tarifasInputs = document.getElementById('tarifasInputs');
    const addTarifaRow = document.getElementById('addTarifaRow');
    
    if (!tarifasPendentes || !tarifasInputs || !addTarifaRow) {
        console.warn("Elementos de tarifas pendentes não encontrados");
        return;
    }
    
    // Evento para o checkbox tarifasPendentes
    tarifasPendentes.addEventListener('change', function() {
        const isChecked = this.checked;
        
        // Obter as linhas de tarifa
        const rows = tarifasInputs.querySelectorAll('.tarifaRow');
        
        // Obter os inputs de tarifas
        const allInputs = tarifasInputs.querySelectorAll('input[type="text"]');
        
        if (isChecked) {
            // Desabilitar e limpar os inputs existentes
            allInputs.forEach(input => {
                input.disabled = true;
                input.value = '';
            });
            
            // Ocultar o botão de adicionar
            addTarifaRow.style.display = 'none';
        } else {
            // Habilitar os inputs
            allInputs.forEach(input => {
                input.disabled = false;
            });
            
            // Mostrar o botão de adicionar
            addTarifaRow.style.display = '';
        }
    });
    
    // Evento para o botão de adicionar linha de tarifa
    addTarifaRow.addEventListener('click', function() {
        // Criar nova linha
        const novaTarifaRow = document.createElement('div');
        novaTarifaRow.className = 'tarifaRow';
        
        // Criar elementos da linha
        const descLabel = document.createElement('label');
        descLabel.textContent = 'Descrição:';
        
        const descInput = document.createElement('input');
        descInput.type = 'text';
        descInput.className = 'tarifaPendDesc';
        descInput.name = 'tarifaPendDesc';
        
        const valorLabel = document.createElement('label');
        valorLabel.textContent = 'Valor:';
        
        const valorInput = document.createElement('input');
        valorInput.type = 'text';
        valorInput.name = 'tarifaPendValor';
        
        // Adicionar elementos à linha
        novaTarifaRow.appendChild(descLabel);
        novaTarifaRow.appendChild(descInput);
        novaTarifaRow.appendChild(valorLabel);
        novaTarifaRow.appendChild(valorInput);
        
        // Adicionar linha ao container
        tarifasInputs.appendChild(novaTarifaRow);
    });
}