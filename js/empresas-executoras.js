// Função para carregar as empresas do CSV
function carregarEmpresasExecutoras() {
    // Obter o número da operação do campo
    const operacaoValue = document.getElementById('operation').value;
    const operacao = operacaoValue.split('-')[0];
    
    if (!operacao) {
        console.log("Operação não encontrada no campo");
        return;
    }
    
    // Tentar carregar do CSV
    fetch('Empresas_Executoras.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar arquivo CSV: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            try {              
                // Primeiro, tente usar o separador |
                let linhas = data.trim().split('\n');
                let cabecalho = linhas[0].split('|');
                
                // Verificar se o cabeçalho tem pelo menos 4 colunas
                if (cabecalho.length < 4) {
                    // Tente com separador de vírgula
                    cabecalho = linhas[0].split(',');
                    if (cabecalho.length < 4) {
                        // Tente com separador de ponto e vírgula
                        cabecalho = linhas[0].split(';');
                        if (cabecalho.length < 4) {
                            throw new Error("Não foi possível determinar o separador do CSV");
                        } else {
                            // Usar ponto e vírgula como separador
                            linhas = data.trim().split('\n').map(linha => linha.split(';'));
                        }
                    } else {
                        // Usar vírgula como separador
                        linhas = data.trim().split('\n').map(linha => linha.split(','));
                    }
                } else {
                    // Usar pipe como separador
                    linhas = data.trim().split('\n').map(linha => linha.split('|'));
                }
                
                // Mapear cabeçalhos conhecidos para vários formatos possíveis
                const operacaoCabecalhos = ['operacaoctef', 'operacao', 'numero_operacao', 'num_operacao', 'operacao_num'];
                const ctefCabecalhos = ['ctefctef', 'ctef', 'contrato', 'num_contrato', 'numero_contrato'];
                const cnpjCabecalhos = ['cnpjctef', 'cnpj', 'cnpj_empresa', 'cnpjempresa'];
                const empresaCabecalhos = ['empresactef', 'empresa', 'nome_empresa', 'razao_social', 'nome'];
                
                // Encontrar índices dos campos no cabeçalho
                let operacaoIndex = -1;
                let ctefIndex = -1;
                let cnpjIndex = -1;
                let empresaIndex = -1;
                
                // Encontrar os índices de acordo com possíveis nomes de cabeçalho
                for (let i = 0; i < cabecalho.length; i++) {
                    const coluna = cabecalho[i].trim().toLowerCase();
                    
                    if (operacaoCabecalhos.includes(coluna)) operacaoIndex = i;
                    if (ctefCabecalhos.includes(coluna)) ctefIndex = i;
                    if (cnpjCabecalhos.includes(coluna)) cnpjIndex = i;
                    if (empresaCabecalhos.includes(coluna)) empresaIndex = i;
                }
                
                // Se não conseguiu encontrar algum campo, tentar determinar pela posição
                if (operacaoIndex === -1) operacaoIndex = 0;
                if (ctefIndex === -1) ctefIndex = 1;
                if (cnpjIndex === -1) cnpjIndex = 2;
                if (empresaIndex === -1) empresaIndex = 3;
                                
                // Processar os dados
                const empresas = [];
                
                // Começar a partir da linha 1 (pular cabeçalho)
                for (let i = 1; i < linhas.length; i++) {
                    // Verificar se a linha tem dados
                    if (!linhas[i] || !linhas[i].length) continue;
                    
                    // Para o caso de linhas que já estão divididas
                    const valores = Array.isArray(linhas[i]) ? linhas[i] : linhas[i].split('|');
                    
                    // Verificar se tem o mínimo de colunas
                    if (valores.length <= Math.max(operacaoIndex, ctefIndex, cnpjIndex, empresaIndex)) {
                        console.warn(`Linha ${i} não tem colunas suficientes:`, valores);
                        continue;
                    }
                    
                    // Verificar se a operação corresponde
                    if (valores[operacaoIndex] && valores[operacaoIndex].trim() === operacao) {
                        empresas.push({
                            operacao: valores[operacaoIndex].trim(),
                            ctef: valores[ctefIndex].trim(),
                            cnpj: valores[cnpjIndex].trim(),
                            empresa: valores[empresaIndex].trim()
                        });
                    }
                }
                                
                if (empresas.length > 0) {
                    preencherSelectEmpresas(empresas);
                } else {
                    console.warn(`Nenhuma empresa encontrada para a operação ${operacao}`);
                    // Se não encontrou empresas, cria uma opção vazia
                    preencherSelectEmpresas([]);
                }
            } catch (error) {
                console.error("Erro ao processar CSV:", error);
                // Se houver erro, deixar dropdown vazio
                preencherSelectEmpresas([]);
            }
        })
        .catch(error => {
            console.error("Erro ao carregar CSV:", error);
            // Se houver erro no carregamento, deixar dropdown vazio
            preencherSelectEmpresas([]);
        });
}

// Função para preencher o select com as empresas
function preencherSelectEmpresas(empresas) {
    // Obter todos os selects de empresas
    const selects = document.querySelectorAll('.select-empresa');
    
    selects.forEach(select => {
        // Limpar as opções atuais
        select.innerHTML = '<option value="" selected disabled>Escolha uma empresa</option>';
        
        // Se não houver empresas, apenas adicionar mensagem
        if (empresas.length === 0) {
            const option = document.createElement('option');
            option.value = "";
            option.disabled = true;
            option.textContent = "Nenhuma empresa encontrada";
            select.appendChild(option);
            return;
        }
        
        // Adicionar as novas opções
        empresas.forEach(empresa => {
            const option = document.createElement('option');
            option.value = empresa.ctef || empresa.ctefctef;
            option.dataset.cnpj = empresa.cnpj || empresa.cnpjctef;
            
            // Texto de exibição com CTEF e nome da empresa
            const nomeEmpresa = empresa.empresa || empresa.empresactef || empresa.nome;
            const textoExibicao = `${nomeEmpresa} - CNPJ ${option.dataset.cnpj}`;
            option.textContent = textoExibicao;
            
            select.appendChild(option);
        });
    });
}

// Função para adicionar uma nova linha de empresa
function adicionarLinhaEmpresa() {
    const container = document.getElementById('empresas-container');
    const novaLinha = document.createElement('div');
    novaLinha.className = 'empresa-row';
    
    // ID único para o novo select
    const novoId = 'ctefDesbloqueio-' + (container.children.length + 1);
    
    novaLinha.innerHTML = `
        <div class="empresa-select-container">
            <label for="${novoId}"><b>Selecione o CTEF:</b></label>
            <select id="${novoId}" class="select-empresa" name="${novoId}">
                <option value="" selected disabled>Escolha uma empresa</option>
            </select>
            <label for="valorCtef-${container.children.length + 1}">Valor:</label>
            <input type="text" id="valorCtef-${container.children.length + 1}" class="valor-ctef" name="valorCtef-${container.children.length + 1}" value="">
            <button type="button" class="remover-empresa">Remover</button>
        </div>
    `;
    
    container.appendChild(novaLinha);
    
    // Adicionar evento para remover a linha
    novaLinha.querySelector('.remover-empresa').addEventListener('click', function() {
        novaLinha.remove();
    });
    
    // Recarregar as empresas para o novo select
    carregarEmpresasExecutoras();
}

// Função para inicializar o componente
function inicializarSelecaoEmpresas() {
    // Verificar se os elementos existem
    const selectOriginal = document.getElementById('ctefDesbloqueio');
    const valorOriginal = document.getElementById('valorCtef');
    
    if (!selectOriginal || !valorOriginal) {
        console.error("Elementos necessários não encontrados!");
        return;
    }
    
    // Criar container para as linhas de empresas
    const container = document.createElement('div');
    container.id = 'empresas-container';
    
    // Criar a primeira linha (original)
    const primeiraLinha = document.createElement('div');
    primeiraLinha.className = 'empresa-row';
    primeiraLinha.innerHTML = `
        <div class="empresa-select-container">
            <label for="ctefDesbloqueio"><b>Selecione o CTEF:</b></label>
            <select id="ctefDesbloqueio" class="select-empresa" name="ctefDesbloqueio">
                <option value="" selected disabled>Escolha uma empresa</option>
            </select>
            <label for="valorCtef">Valor:</label>
            <input type="text" id="valorCtef" class="valor-ctef" name="valorCtef" value="">
        </div>
    `;
    
    container.appendChild(primeiraLinha);
    
    // Substituir o select original pelo container
    selectOriginal.parentNode.insertBefore(container, selectOriginal);
    selectOriginal.parentNode.removeChild(selectOriginal);
    valorOriginal.parentNode.removeChild(valorOriginal);
    
    // Adicionar botão para adicionar novas linhas
    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.type = 'button';
    botaoAdicionar.id = 'adicionar-empresa';
    botaoAdicionar.textContent = 'Adicionar Empresa';
    botaoAdicionar.className = 'adicionar-empresa';
    container.parentNode.insertBefore(botaoAdicionar, container.nextSibling);
    
    // Adicionar evento ao botão
    botaoAdicionar.addEventListener('click', adicionarLinhaEmpresa);
    
    // Evento para quando uma operação é carregada
    document.getElementById('operacaoForm').addEventListener('submit', function(event) {
        // Esperar um pouco para que os outros campos sejam preenchidos primeiro
        setTimeout(carregarEmpresasExecutoras, 500);
    });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarSelecaoEmpresas);