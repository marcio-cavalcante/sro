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
        // Configurar apenas os event listeners essenciais para a interface do usuário
        this.configuraVisibilidadeCampos();
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

    configuraVisibilidadeCampos() {
        // Configurar a visibilidade dos dropdowns de pendências com base nos radios
        this.gruposDeSelecao.forEach(grupo => {
            const radios = document.getElementsByName(grupo.nomeGrupoRadio);
            const dropdown = document.getElementById(grupo.idDropdown);
            
            if (radios.length && dropdown) {
                radios.forEach(radio => {
                    radio.addEventListener('change', () => {
                        dropdown.disabled = (radio.value !== grupo.radioComPendencia);
                    });
                });
                
                // Estado inicial
                const radioAtivo = Array.from(radios).find(r => r.checked);
                dropdown.disabled = (!radioAtivo || radioAtivo.value !== grupo.radioComPendencia);
            }
        });
        
        // Configurar visibilidade de checklists baseado na seleção de ordem de desbloqueio
        if (this.elements.primeiroDesbloq && this.elements.ultimoDesbloq) {
            const checklist3 = document.querySelector('.checklist3');
            const checklist4 = document.querySelector('.checklist4');
            
            if (checklist3 && checklist4) {
                const updateChecklists = () => {
                    checklist3.style.display = this.elements.primeiroDesbloq.checked ? 'flex' : 'none';
                    checklist4.style.display = this.elements.ultimoDesbloq.checked ? 'flex' : 'none';
                };
                
                this.elements.primeiroDesbloq.addEventListener('change', updateChecklists);
                this.elements.intermediarioDesbloq.addEventListener('change', updateChecklists);
                this.elements.ultimoDesbloq.addEventListener('change', updateChecklists);
                
                // Estado inicial
                updateChecklists();
            }
        }
        
        // Configurar visibilidade de checklists baseado na seleção de RRE/RAE
        const rreRadio = document.getElementById('rre');
        const raeRadio = document.getElementById('rae');
        
        if (rreRadio && raeRadio) {
            const checklist5 = document.querySelector('.checklist5');
            const checklist6 = document.querySelector('.checklist6');
            
            if (checklist5 && checklist6) {
                const updateRreRae = () => {
                    checklist5.style.display = rreRadio.checked ? 'block' : 'none';
                    checklist6.style.display = raeRadio.checked ? 'block' : 'none';
                };
                
                rreRadio.addEventListener('change', updateRreRae);
                raeRadio.addEventListener('change', updateRreRae);
                
                // Estado inicial
                updateRreRae();
            }
        }
        
        // Configurar visibilidade de tarifas pendentes
        if (this.elements.tarifasPendentes) {
            const tarifasInputs = document.getElementById('tarifasInputs');
            const tarifaPendDesc = document.getElementById('tarifaPendDesc');
            const tarifaPendValor = document.getElementById('tarifaPendValor');
            
            if (tarifasInputs && tarifaPendDesc && tarifaPendValor) {
                this.elements.tarifasPendentes.addEventListener('change', () => {
                    const isChecked = this.elements.tarifasPendentes.checked;
                    tarifaPendDesc.disabled = isChecked;
                    tarifaPendValor.disabled = isChecked;
                    
                    if (isChecked) {
                        tarifaPendDesc.value = '';
                        tarifaPendValor.value = '';
                        
                        // Limpar todas as linhas adicionais
                        const rows = tarifasInputs.querySelectorAll('.tarifaRow:not(:first-child)');
                        rows.forEach(row => row.remove());
                    }
                });
            }
        }
    }

    // CORRIGIDO: Método para verificar todas as pendências de uma vez
    verificarTodasPendencias() {
        // Limpar array de pendências antes de começar
        this.pendencias = [];
        
        // 1. Verificar os radios específicos primeiro
        Object.keys(this.mensagensRadios).forEach(nomeGrupo => {
            const radios = document.getElementsByName(nomeGrupo);
            // Se não encontrou os radios, pular
            if (!radios || radios.length === 0) return;
            
            const selecionado = Array.from(radios).find(radio => radio.checked);
            if (selecionado && this.mensagensRadios[nomeGrupo][selecionado.value]) {
                const novaPendencia = this.mensagensRadios[nomeGrupo][selecionado.value];
                if (novaPendencia && novaPendencia.trim() !== '') {
                    this.pendencias.push(novaPendencia);
                }
            }
        });
        
        // 2. Verificar os dropdowns de pendências
        this.gruposDeSelecao.forEach(grupo => {
            const radios = document.getElementsByName(grupo.nomeGrupoRadio);
            // Se não encontrou os radios, pular
            if (!radios || radios.length === 0) return;
            
            const dropdown = document.getElementById(grupo.idDropdown);
            // Se não encontrou o dropdown, pular
            if (!dropdown) return;
            
            // Verificar se o radio "com pendência" está selecionado
            const radioComPend = Array.from(radios).find(r => r.checked && r.value === grupo.radioComPendencia);
            
            // Se o radio está selecionado e o dropdown tem um valor
            if (radioComPend && dropdown.value) {
                const textoPendencia = this.textosPorGrupo[grupo.idDropdown][dropdown.value];
                if (textoPendencia && textoPendencia.trim() !== '') {
                    this.pendencias.push(textoPendencia);
                }
            }
        });
        
        // 3. Atualizar textarea com as pendências coletadas
        this.atualizarTextarea();
        
        console.log("Pendências encontradas:", this.pendencias);
        return this.pendencias;
    }

    atualizarTextarea() {
        if (!this.elements.textareaApontamento) {
            console.error("Textarea de apontamento não encontrada!");
            return;
        }

        // Obter o radio selecionado
        const radioSelecionado = Array.from(this.elements.radiosAptoDesbl || []).find(radio => radio.checked);

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

            let repasseApontamento = "";
            let contrapartidaApontamento = "";
            
            // Verificar valores para determinar qual usar (Manual > Ajustado > Solicitado)
            if (valorRpAjusteManualMedicao && valorRpAjusteManualMedicao !== "R$ --" && parseFloat(valorRpAjusteManualMedicao.replace(/[^\d,-]/g, '').replace(',', '.')) > 0) {
                repasseApontamento = valorRpAjusteManualMedicao;
            } else if (valorRpAjustadoMedicao && valorRpAjustadoMedicao !== "R$ --" && parseFloat(valorRpAjustadoMedicao.replace(/[^\d,-]/g, '').replace(',', '.')) > 0) {
                repasseApontamento = valorRpAjustadoMedicao;
            } else if (valorRepasseMedicao && valorRepasseMedicao !== "R$ --" && parseFloat(valorRepasseMedicao.replace(/[^\d,-]/g, '').replace(',', '.')) > 0) {
                repasseApontamento = valorRepasseMedicao;
            } else {
                repasseApontamento = "0,00";
            }
            
            if (valorCpAjusteManualMedicao && valorCpAjusteManualMedicao !== "R$ --" && parseFloat(valorCpAjusteManualMedicao.replace(/[^\d,-]/g, '').replace(',', '.')) > 0) {
                contrapartidaApontamento = valorCpAjusteManualMedicao;
            } else if (valorCpAjustadoMedicao && valorCpAjustadoMedicao !== "R$ --" && parseFloat(valorCpAjustadoMedicao.replace(/[^\d,-]/g, '').replace(',', '.')) > 0) {
                contrapartidaApontamento = valorCpAjustadoMedicao;
            } else if (valorContrapartidaMedicao && valorContrapartidaMedicao !== "R$ --" && parseFloat(valorContrapartidaMedicao.replace(/[^\d,-]/g, '').replace(',', '.')) > 0) {
                contrapartidaApontamento = valorContrapartidaMedicao;
            } else {
                contrapartidaApontamento = "0,00";
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
                const valorSolicitadoValue = parseFloat((this.elements.valorSolicitado.value || "0,00").replace(/[^\d,-]/g, '').replace(',', '.'));
                const viExecVigenteValue = parseFloat((this.elements.viExecVigente.textContent || "0,00").replace(/[^\d,-]/g, '').replace(',', '.'));

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
            // Se "Sim" for selecionado, definir texto padrão de aprovação
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
                const nomeEmpresa = selectCtef.options[selectCtef.selectedIndex] ? 
                                  selectCtef.options[selectCtef.selectedIndex].text : 
                                  'Empresa não selecionada';
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