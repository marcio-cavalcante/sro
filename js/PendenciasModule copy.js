// PendenciasModule.js
export class PendenciasModule {
    constructor() {
        this.pendencias = [];
        this.elements = {};
        this.textosPorGrupo = {
            "pendenciasOfSolicitacaoDesbl": {
                "Faltando": "Apresentar Ofício de Solicitação de Desbloqueio",
                "Assinatura Desconforme": "Assinar corretamente o Ofício de Solicitação de Desbloqueio",
                "Assinatura Não Autenticável": "Corrigir assinatura não autenticável no Ofício de Solicitação de Desbloqueio",
                "Informações Incompletas": "Completar informações faltantes no Ofício de Solicitação de Desbloqueio",
                "Nº do CR Incorreto": "Corrigir número do CR no Ofício de Solicitação de Desbloqueio",
                "Outra": "DIGITAR O APONTAMENTO: Ofício de Solicitação de Desbloqueio"
            },
            "pendenciasRreDesbl": {
                "Faltando": "Apresentar o RRE - Relatório Resumo do Empreendimento",
                "Assinatura Desconforme": "Assinar corretamente o RRE",
                "Assinatura Não Autenticável": "Corrigir assinatura não autenticável no RRE",
                "Informações Incompletas": "Completar informações faltantes no RRE",
                "Nº do CR Incorreto": "Corrigir número do CR no RRE",
                "Dados do CTEF Incorretos": "Corrigir dados do CTEF no RRE",
                "ART Incorreta": "Corrigir ART no RRE",
                "Assinaturas Digital e Física": "Corrigir assinaturas digital e física no RRE",
                "Outra": "DIGITAR O APONTAMENTO: RRE"
            },
            "pendenciasRelFornecedoresDesbl": {
                "Faltando": "Apresentar a Relação de Fornecedores",
                "Assinatura Desconforme": "Assinar corretamente a Relação de Fornecedores",
                "Assinatura Não Autenticável": "Corrigir assinatura não autenticável na Relação de Fornecedores",
                "Informações Incompletas": "Completar informações faltantes na Relação de Fornecedores",
                "Nº do CR Incorreto": "Corrigir número do CR na Relação de Fornecedores",
                "Dados do CTEF Incorretos": "Corrigir dados do CTEF na Relação de Fornecedores",
                "Outra": "DIGITAR O APONTAMENTO: Relação de Fornecedores"
            },
            "pendenciasPleBmDesbl": {
                "Faltando": "Apresentar o PLE/BM",
                "Assinatura Desconforme": "Assinar corretamente o PLE/BM",
                "Assinatura Não Autenticável": "Corrigir assinatura não autenticável no PLE/BM",
                "Nº do CR Incorreto": "Corrigir número do CR no PLE/BM",
                "Assinaturas Digital e Física": "Corrigir assinaturas digital e física no PLE/BM",
                "Outra": "DIGITAR O APONTAMENTO: PLE/BM"
            },
            "pendenciasPlacaObraDesbl": {
                "Faltando": "Apresentar o Relatório Fotográfico da Placa de Obra",
                "Documento Desconforme": "Corrigir Relatório Fotográfico da Placa de Obra desconforme",
                "Outra": "DIGITAR O APONTAMENTO: Relatório Fotográfico da Placa de Obra"
            }
        };
        this.mensagensRadios = {
            "manifestacaoAmbiental": {
                conforme: "",
                inexistente: "Apresentar manifestação do Órgão Ambiental competente.",
                vencida: "- A execução dos serviços da medição atual ocorreu em prazo cuja Manifestação Ambiental estava vencida, por previsão normativa não poderão ser realizados desbloqueios sem a documentação válida."
            },
            "pcpParcelaAnterior": {
                aprovado: "",
                faltando: "- Registrar/anexar no Transferegov.br a comprovação da execução financeira referente à última autorização de saque.",
                reprovado: "- A comprovação da execução financeira referente à última autorização de saque possui pendências a serem sanadas antes do desbloqueio.",
                naPcp: ""
            },
            "apontamentosReuni": {
                sem: "",
                com: "- Atender demais apontamentos listados no Relatório Anexo."
            },
            "temParecerTgov": {
                simParecerTgov: "",
                naoParecerTgov: "- CR sem solicitação de prorrogação de execução financeira, tal prazo pode ser prorrogado, desde que o pedido contenha a motivação e justificativa e que não fique caracterizada culpa do Convenente e comprove benefício da execução do objeto."
            },
            "temArtFiscalizacao": {
                simArtFiscRegistradaReuni: "",
                simArtFiscNaoRegistradaReuni: "",
                naoArtFiscalizacao: "- Deverá ser apresentada ART/RRT do(a) responsável pela fiscalização da obra."
            },
            "temArtExecucao": {
                simArtExecRegistradaReuni: "",
                simArtExecNaoRegistradaReuni: "",
                naoArtExecucao: "- Deverá ser apresentada ART/RRT do(a) responsável pela execução da obra."
            },
            "temAprovProjAcessib": {
                simAprovProjAcessib: "",
                naoAprovProjAcessib: "- Apresentar declaração que o Convenente recebeu e aprovou o Projeto Executivo de Acessibilidade e que sua execução se dará de forma a garantir o cumprimento dos itens previstos na Lista de Verificação de Acessibilidade, para desbloqueio da primeira parcela de CR vinculados aos exercícios financeiros a partir de 2018, conforme IN MPDG nº 002/2017.",
                naAprovProjAcessib: ""
            },
            "ordemServico": {
                simOrdemServico: "",
                naoOrdemServico: "- Apresentar Ordem de Serviço/Compra para o fornecedor, para solicitação de desbloqueio da primeira parcela do CTEF."
            },
            "laudoConfAcessib": {
                simLaudoConfAcessib: "",
                naoLaudoConfAcessib: "- Apresentar Laudo de Conformidade em Acessibilidade, para solicitação de desbloqueio da última parcela de CR vinculados aos exercícios financeiros a partir de 2018 (IN MPDG nº 002/2018).",
                naLaudoConfAcessib: ""
            },
            "docRecObj": {
                simDocRecObj: "",
                naoDocRecObj: "- Apresentar documento que comprove o recebimento do objeto do CR, por parte do Convenente, para solicitação de desbloqueio da última parcela de CR vinculados aos exercícios financeiros a partir de 2018 (IN MPDG nº 002/2018 e suas alterações).",
                naDocRecObj: ""
            },
            "controleTecnologico": {
                simControleTecnologico: "",
                naoControleTecnologico: "- Apresentar o Laudo Técnico de Controle Tecnológico, com os resultados dos ensaios realizados em cada etapa dos serviços conforme exigências normativas do DNIT.",
                naControleTecnologico: ""
            },
            "placaObra": {
                simPlacaObra: "",
                naoPlacaObra: "- Apresentar relatório fotográfico comprovando a instalação da placa de obra em conformidade com o manual do Governo Federal vigente. Reforçando que o Contratado deve afixar a placa de obra em local visível, e mantê-la em bom estado de conservação obrigatoriamente durante todo o período de execução da obra."
            },
            "placaInauguracao": {
                simPlacaInauguracao: "",
                naoPlacaInauguracao: "- Apresentar declaração do Representante Legal do Convenente informando que não haverá instalação de placa de inauguração de obra ou, caso o Convenente opte pela instalação de placa, apresentar registro fotográfico georreferenciado que demonstre a conformidade da placa com o Manual Visual de Placas e Adesivos de Obras."
            },
            "relatorioExecucao": {
                simRelatorioExecucao: "",
                naoRelatorioExecucao: "Gerar o Relatório de Execução 'Documentos de Liquidação incluídos'."
            },
            "depositoCp": {
                simDepositoCp: "",
                naoDepositoCp: "Depositar a contrapartida referente a parcela a ser desbloqueada, conforme discriminado acima, realizando a respectiva classificação no TransfereGov.",
                parcialDepositoCp: "Depositar o valor complementar da contrapartida, de xxxx,xxx e classificar para possibilitar o desbloqueio da parcela.",
                naDepositoCp: ""
            }
        };
        this.gruposDeSelecao = [
            {
                nomeGrupoRadio: "ofSolicitacaoDesbl",
                idDropdown: "pendenciasOfSolicitacaoDesbl",
                radioComPendencia: "pendOfSolicitacaoDesbl"
            },
            {
                nomeGrupoRadio: "rreDesbl",
                idDropdown: "pendenciasRreDesbl",
                radioComPendencia: "pendRreDesbl"
            },
            {
                nomeGrupoRadio: "relFornecedoresDesbl",
                idDropdown: "pendenciasRelFornecedoresDesbl",
                radioComPendencia: "pendRelFornecedoresDesbl"
            },
            {
                nomeGrupoRadio: "pleBmDesbl",
                idDropdown: "pendenciasPleBmDesbl",
                radioComPendencia: "pendPleBmDesbl"
            },
            {
                nomeGrupoRadio: "placaObraDesbl",
                idDropdown: "pendenciasPlacaObraDesbl",
                radioComPendencia: "PlacaObraDesbl"
            }
        ];
    }

    init() {
        this.cacheElements();
        this.configuraGruposDeSelecao();
        this.configuraRadiosEspecificos();
        this.configuraSelects();
    }

    configuraSelects() {
        // Array com todas as configurações (nome do grupo, id do radio "Com pendência", id do dropdown)
        const configuracoes = [
            { 
                nomeGrupo: "ofSolicitacaoDesbl", 
                radioComPendencia: "pendOfSolicitacaoDesbl", 
                dropdownId: "pendenciasOfSolicitacaoDesbl" 
            },
            { 
                nomeGrupo: "rreDesbl", 
                radioComPendencia: "pendRreDesbl", 
                dropdownId: "pendenciasRreDesbl" 
            },
            { 
                nomeGrupo: "relFornecedoresDesbl", 
                radioComPendencia: "pendRelFornecedoresDesbl", 
                dropdownId: "pendenciasRelFornecedoresDesbl" 
            },
            { 
                nomeGrupo: "pleBmDesbl", 
                radioComPendencia: "pendPleBmDesbl", 
                dropdownId: "pendenciasPleBmDesbl" 
            },
            { 
                nomeGrupo: "placaObraDesbl", 
                radioComPendencia: "pendPlacaObraDesbl", 
                dropdownId: "pendenciasPlacaObraDesbl" 
            }
        ];
    
        // Configurar cada grupo
        configuracoes.forEach(config => {
            const dropdown = document.getElementById(config.dropdownId);
            
            if (!dropdown) {
                console.warn(`Dropdown ${config.dropdownId} não encontrado`);
                return;
            }
            
            // Configurar o radio "Com pendência"
            const radioPendencia = document.getElementById(config.radioComPendencia);
            if (radioPendencia) {
                radioPendencia.addEventListener('change', () => {
                    dropdown.disabled = false;
                });
                
                // Verificar estado inicial
                if (radioPendencia.checked) {
                    dropdown.disabled = false;
                }
            } else {
                console.warn(`Radio ${config.radioComPendencia} não encontrado`);
            }
            
            // Configurar todos os outros radios do mesmo grupo para desabilitar o dropdown
            const todosRadiosDoGrupo = document.getElementsByName(config.nomeGrupo);
            Array.from(todosRadiosDoGrupo).forEach(radio => {
                if (radio.id !== config.radioComPendencia) {
                    radio.addEventListener('change', () => {
                        dropdown.disabled = true;
                    });
                }
            });
        });
    }

    cacheElements() {
        this.elements.textareaApontamento = document.getElementById('apontamentoDesbloqueio');
        this.elements.radiosAptoDesbl = document.getElementsByName('aptoDesbl');
        this.elements.valorSolicitado = document.getElementById('valorSolicitado');
        this.elements.repasseSolicitado = document.getElementById('repasseSolicitado');
        this.elements.contrapartidaSolicitado = document.getElementById('contrapartidaSolicitado');
        this.elements.repasseAjustado = document.getElementById('repasseAjustado');
        this.elements.contrapartidaAjustado = document.getElementById('contrapartidaAjustado');
        this.elements.repasseAjusteManual = document.getElementById('repasseAjusteManual');
        this.elements.contrapartidaAjusteManual = document.getElementById('contrapartidaAjusteManual');
        this.elements.objDesbloqueio = document.getElementById('objDesbloqueio');
        this.elements.instrumentoNumero = document.getElementById('instrumentoNumero');
        this.elements.primeiroDesbloq = document.getElementById('primeiroDesbloq');
        this.elements.intermediarioDesbloq = document.getElementById('intermediarioDesbloq');
        this.elements.ultimoDesbloq = document.getElementById('ultimoDesbloq');
        this.elements.parcelaNumero = document.getElementById('parcelaNumero');
        this.elements.viExecVigente = document.getElementById('viExecVigente');
        this.elements.tarifasPendentes = document.getElementById('tarifasPendentes');
        this.elements.pendenciasOfSolicitacaoDesbl = document.getElementById('pendenciasOfSolicitacaoDesbl');
    }

    configuraGruposDeSelecao() {
        this.gruposDeSelecao.forEach(grupo => {
            this.togglePendenciasDropdown(grupo.nomeGrupoRadio, grupo.idDropdown, grupo.radioComPendencia);
            this.handlePendenciasDropdown(grupo.idDropdown);
        });
    }

    configuraRadiosEspecificos() {
        Object.keys(this.mensagensRadios).forEach(nomeGrupo => {
            const mensagens = this.mensagensRadios[nomeGrupo];
            const radios = document.getElementsByName(nomeGrupo);

            radios.forEach(radio => {
                // Remover listeners existentes
                const newRadio = radio.cloneNode(true);
                radio.parentNode.replaceChild(newRadio, radio);
                
                // Adicionar novo listener ao elemento clonado
                newRadio.addEventListener("change", () => this.verificarRadios(nomeGrupo, mensagens));
            });

            // Verificar estado inicial
            const radioAtivo = Array.from(document.getElementsByName(nomeGrupo)).find(radio => radio.checked);
            if (radioAtivo && mensagens[radioAtivo.value]) {
                this.verificarRadios(nomeGrupo, mensagens);
            }
        });

        // Configurar listeners para medição apta a desbloqueio
        if (this.elements.radiosAptoDesbl) {
            Array.from(this.elements.radiosAptoDesbl).forEach(radio => {
                const newRadio = radio.cloneNode(true);
                radio.parentNode.replaceChild(newRadio, radio);
                newRadio.addEventListener('change', () => this.atualizarTextarea());
            });
            // Atualizar a referência após a clonagem
            this.elements.radiosAptoDesbl = document.getElementsByName('aptoDesbl');
        }

        // Configurar listener para valor solicitado
        if (this.elements.valorSolicitado) {
            const newElement = this.elements.valorSolicitado.cloneNode(true);
            this.elements.valorSolicitado.parentNode.replaceChild(newElement, this.elements.valorSolicitado);
            newElement.addEventListener('change', () => this.atualizarTextarea());
            this.elements.valorSolicitado = newElement;
        }

        // Configurar listeners para outros campos
        this.configureEventListener(this.elements.objDesbloqueio, 'change', () => this.atualizarTextarea());
        this.configureEventListener(this.elements.instrumentoNumero, 'change', () => this.atualizarTextarea());
        this.configureEventListener(this.elements.primeiroDesbloq, 'change', () => this.atualizarTextarea());
        this.configureEventListener(this.elements.intermediarioDesbloq, 'change', () => this.atualizarTextarea());
        this.configureEventListener(this.elements.ultimoDesbloq, 'change', () => this.atualizarTextarea());
        this.configureEventListener(this.elements.parcelaNumero, 'change', () => this.atualizarTextarea());
    }

    configureEventListener(element, eventType, callback) {
        if (element) {
            const newElement = element.cloneNode(true);
            element.parentNode.replaceChild(newElement, element);
            newElement.addEventListener(eventType, callback);
            
            // Atualizar a referência no objeto elements para o elemento clonado
            Object.keys(this.elements).forEach(key => {
                if (this.elements[key] === element) {
                    this.elements[key] = newElement;
                }
            });
            return newElement;
        }
        return null;
    }

    verificarRadios(nomeDoGrupo, mensagens) {
        // Remove pendências antigas relacionadas ao grupo atual
        const chavesMensagens = Object.values(mensagens);
        this.pendencias = this.pendencias.filter(pendencia => !chavesMensagens.includes(pendencia));

        // Adiciona nova pendência com base na seleção atual
        const selecionado = Array.from(document.getElementsByName(nomeDoGrupo)).find(radio => radio.checked);
        if (selecionado && mensagens[selecionado.value]) {
            const novaPendencia = mensagens[selecionado.value];
            if (novaPendencia) {
                this.pendencias.push(novaPendencia);
            }
        }

        this.atualizarTextarea();
        return this.pendencias;
    }

    handlePendenciasDropdown(idDropdown) {
        const selectPendencias = document.getElementById(idDropdown);
        if (!selectPendencias) {
            console.warn(`Dropdown ${idDropdown} não encontrado`);
            return;
        }

        // Remover event listeners existentes
        const clonedSelect = selectPendencias.cloneNode(true);
        selectPendencias.parentNode.replaceChild(clonedSelect, selectPendencias);

        // Adicionar evento de change ao dropdown clonado
        clonedSelect.addEventListener("change", () => {
            // Obter os textos específicos deste grupo
            const textosDesteGrupo = this.textosPorGrupo[idDropdown] || {};
            const valoresTexto = Object.values(textosDesteGrupo);

            // Remover apenas as pendências relacionadas a este dropdown específico
            this.pendencias = this.pendencias.filter(pendencia => !valoresTexto.includes(pendencia));

            // Adicionar nova pendência baseada na seleção
            const valorSelecionado = clonedSelect.value;
            if (valorSelecionado && this.textosPorGrupo[idDropdown] && this.textosPorGrupo[idDropdown][valorSelecionado]) {
                const textoPendencia = this.textosPorGrupo[idDropdown][valorSelecionado];
                this.pendencias.push(textoPendencia);
            }

            this.atualizarTextarea();
        });
    }

    togglePendenciasDropdown(nomeGrupoRadio, idDropdown, radioComPendencia) {
        // Obter todos os elementos diretamente, sem cache
        const radios = document.getElementsByName(nomeGrupoRadio);
        const pendenciasDropdown = document.getElementById(idDropdown);
        
        if (!radios.length) {
            console.error(`ERRO: Radios '${nomeGrupoRadio}' não encontrados!`);
            return;
        }
        
        if (!pendenciasDropdown) {
            console.error(`ERRO: Dropdown '${idDropdown}' não encontrado!`);
            return;
        }
                
        // Remover todos os event listeners anteriores
        const newRadios = [];
        radios.forEach(radio => {
            // Criar uma cópia do radio original
            const newRadio = radio.cloneNode(true);
            // Substituir o original pela cópia
            radio.parentNode.replaceChild(newRadio, radio);
            // Guardar a referência para a cópia
            newRadios.push(newRadio);
        });
        
        // Adicionar novos event listeners
        newRadios.forEach(radio => {
            // Usar uma função anônima para manter o contexto 'this'
            radio.addEventListener('change', (e) => {                
                if (radio.value === radioComPendencia && radio.checked) {
                    pendenciasDropdown.disabled = false;
                } else {
                    pendenciasDropdown.disabled = true;
                }
            });
        });
        
        // Verificar e aplicar o estado inicial dos radios
        const radioChecked = Array.from(newRadios).find(r => r.checked);
        if (radioChecked) {
            if (radioChecked.value === radioComPendencia) {
                pendenciasDropdown.disabled = false;
            } else {
                pendenciasDropdown.disabled = true;
            }
        } else {
            pendenciasDropdown.disabled = true;
        }
    }
    
    atualizarTextarea() {
        if (!this.elements.textareaApontamento) return;

        // Obter o radio selecionado
        const radioSelecionado = Array.from(document.getElementsByName('aptoDesbl') || []).find(radio => radio.checked);

        if (radioSelecionado && radioSelecionado.value === "naoAptoDesbl") {
            // Obter o valor da medição do campo adequado
            const valorSolicitado = this.elements.valorSolicitado || { value: "R$ --" };
            const valorMedicao = valorSolicitado.value || "R$ --";
            const repasseSolicitado = this.elements.repasseSolicitado || { value: "R$ --" };
            const valorRepasseMedicao = repasseSolicitado.value || "R$ --";
            const contrapartidaSolicitado = this.elements.contrapartidaSolicitado || { value: "R$ --" };
            const valorContrapartidaMedicao = contrapartidaSolicitado.value || "R$ --";

            const repasseAjustado = this.elements.repasseAjustado || { value: "R$ --" };
            const valorRpAjustadoMedicao = repasseAjustado.value || "R$ --";
            const contrapartidaAjustado = this.elements.contrapartidaAjustado || { value: "R$ --" };
            const valorCpAjustadoMedicao = contrapartidaAjustado.value || "R$ --";

            const repasseAjusteManual = this.elements.repasseAjusteManual || { value: "R$ --" };
            const valorRpAjusteManualMedicao = repasseAjusteManual.value || "R$ --";
            const contrapartidaAjusteManual = this.elements.contrapartidaAjusteManual || { value: "R$ --" };
            const valorCpAjusteManualMedicao = contrapartidaAjusteManual.value || "R$ --";

            let repasseApontamento = 0;
            let contrapartidaApontamento = 0;
            if (parseFloat(valorRpAjusteManualMedicao) > 0) {
                repasseApontamento = valorRpAjusteManualMedicao;
            } else if (parseFloat(valorRpAjustadoMedicao) > 0) {
                repasseApontamento = valorRpAjustadoMedicao;
            } else if (parseFloat(valorRepasseMedicao) > 0) {
                repasseApontamento = valorRepasseMedicao;
            }
            if (parseFloat(valorCpAjusteManualMedicao) > 0) {
                contrapartidaApontamento = valorCpAjusteManualMedicao;
            } else if (parseFloat(valorCpAjustadoMedicao) > 0) {
                contrapartidaApontamento = valorCpAjustadoMedicao;
            } else if (parseFloat(valorContrapartidaMedicao) > 0) {
                contrapartidaApontamento = valorContrapartidaMedicao;
            }

            const ctefsValores = this.capturarCtefsNomesValores();

            let textoFinal = `Recebemos a Medição no valor de ${valorMedicao}, para desbloqueio, desde que atendidas as seguintes condições:\n`;

            if (this.pendencias.length > 0) {
                this.pendencias.forEach(pendencia => {
                    textoFinal += "- " + pendencia + "\n";
                });
            } else {
                textoFinal += "Sem pendências registradas.\n";
            }

            const dadosMedicaoMsg = "\nDados da medição:\n"
            let dadosMedicaoMsgValores = `Repasse: ${repasseApontamento} - Contrapartida: ${contrapartidaApontamento}\n`

            // Ordem do Desbloqueio
            let ordemDesbloqueioValue = '';
            if (this.elements.primeiroDesbloq && this.elements.primeiroDesbloq.checked) {
                ordemDesbloqueioValue = 'Primeiro';
            } else if (this.elements.intermediarioDesbloq && this.elements.intermediarioDesbloq.checked) {
                ordemDesbloqueioValue = 'Intermediário';
            } else if (this.elements.ultimoDesbloq && this.elements.ultimoDesbloq.checked) {
                ordemDesbloqueioValue = 'Último';
            }
            const parcelaNumeroValue = this.elements.parcelaNumero ? this.elements.parcelaNumero.value : '';

            let percentEvolucao = 0;
            if (this.elements.valorSolicitado && this.elements.viExecVigente) {
                const valorSolicitadoValue = parseFloat((this.elements.valorSolicitado.value).replace(/[^\d,-]/g, '').replace(',', '.'));
                const viExecVigenteValue = parseFloat((this.elements.viExecVigente.textContent).replace(/[^\d,-]/g, '').replace(',', '.'));

                if (!isNaN(valorSolicitadoValue) && !isNaN(viExecVigenteValue) && viExecVigenteValue !== 0) {
                    percentEvolucao = (valorSolicitadoValue / viExecVigenteValue) * 100;
                }
            }

            const percentEvolucaoFormatada = percentEvolucao.toFixed(2);
            const objDesbloqueioValue = this.elements.objDesbloqueio ? this.elements.objDesbloqueio.value : '';
            const instrumentoNumeroValue = this.elements.instrumentoNumero ? this.elements.instrumentoNumero.value : '';

            textoFinal += dadosMedicaoMsg + dadosMedicaoMsgValores

            if (ctefsValores.length > 0) {
                textoFinal += "Beneficiário(s):\n";
                ctefsValores.forEach(empresa => {
                    textoFinal += `- ${empresa.nomeEmpresa} - Valor: R$${empresa.valor}\n`;
                });
            } else {
                textoFinal += "Nenhuma CTEF/Valor informado.\n";
            }
            textoFinal += `Ordem do Desbloqueio: ${ordemDesbloqueioValue} - Parcela nº: ${parcelaNumeroValue}\n`;

            textoFinal += `Instrumento de desbloqueio: ${objDesbloqueioValue} ${instrumentoNumeroValue}, com evolução de ${percentEvolucaoFormatada}%\n`;

            // Verificar se há tarifas pendentes
            if (!this.elements.tarifasPendentes || !this.elements.tarifasPendentes.checked) {
                // Obter todas as linhas de tarifas
                const tarifaRows = document.querySelectorAll('.tarifaRow');
                let tarifasText = '';

                // Verificar se há pelo menos uma tarifa com descrição e valor
                let hasTarifas = false;
                tarifaRows.forEach(row => {
                    const descInput = row.querySelector('input[name="tarifaPendDesc"]');
                    const valorInput = row.querySelector('input[name="tarifaPendValor"]');

                    if (descInput && valorInput && descInput.value.trim() && valorInput.value.trim()) {
                        hasTarifas = true;
                        tarifasText += `- ${descInput.value} - Valor: R$ ${valorInput.value}\n`;
                    }
                });

                // Adicionar o texto de tarifas pendentes se houver pelo menos uma tarifa
                if (hasTarifas) {
                    textoFinal += "\nAtentar para o recolhimento da(s) tarifa(s) pendente(s):\n";
                    textoFinal += tarifasText;
                }
            }

            textoFinal += "\nTão logo solucionadas, de forma consolidada, informar a GIGOV para continuidade do processo.";

            this.elements.textareaApontamento.value = textoFinal;
        } else if (radioSelecionado && radioSelecionado.value === "simAptoDesbl") {
            // Se "Sim" for selecionado, limpar a textarea ou definir texto padrão de aprovação
            this.elements.textareaApontamento.value = "Medição aprovada para desbloqueio.";
        } else {
            // Estado inicial ou indefinido
            this.elements.textareaApontamento.value = "";
        }
    }

    capturarCtefsNomesValores() {
        const empresasContainer = document.getElementById('empresas-container');
        if (!empresasContainer) {
            console.warn('Container de empresas não encontrado.');
            return [];
        }

        const empresas = [];
        // Itera sobre cada linha de empresa no container
        for (let i = 0; i < empresasContainer.children.length; i++) {
            const linha = empresasContainer.children[i];

            // Encontra o select e o input de valor dentro da linha
            const selectCtef = linha.querySelector('.select-empresa');
            const inputValor = linha.querySelector('.valor-ctef');

            // Verifica se os elementos foram encontrados
            if (selectCtef && inputValor) {
                const ctef = selectCtef.value;
                // Obtém o nome da empresa do texto exibido na opção selecionada
                const nomeEmpresa = selectCtef.options[selectCtef.selectedIndex].text;
                const valor = inputValor.value;

                // Adiciona o CTEF e o valor ao array de empresas
                empresas.push({
                    ctef: ctef,
                    nomeEmpresa: nomeEmpresa,
                    valor: valor
                });
            } else {
                console.warn('Select de CTEF ou input de valor não encontrados na linha ' + (i + 1));
            }
        }

        return empresas;
    }

    getPendencias() {
        return this.pendencias;
    }
}