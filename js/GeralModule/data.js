// data.js - Store the table data here
const tableData = [
    {
        titulo: "APOSTILAMENTO",
        ocorrencia: "COMUNICAÇÃO DE ADESÃO À PC 33/23 - TERMO DE APOSTILAMENTO",
        acao: "APONTAMENTO",
        texto: "Considerando realização de apostilamento para adesão as regras da PORTARIA CONJUNTA MGI/MF/CGU Nº 33, DE 30 DE AGOSTO DE 2023, informamos que o prazo para comprovação de execução financeira atual é de 05/04/2025."
    },
    {
        titulo: "ASSINATURA",
        ocorrencia: "ASSINATURA COLADA",
        acao: "APONTAMENTO",
        texto: "A assinatura do documento está em desconformidade com as exigências normativas. Solicitamos correção da inconformidade."
    },
    {
        titulo: "CLÁUSULA SUSPENSIVA",
        ocorrencia: "SOLICITAÇÃO DE PRORROGAÇÃO - NÃO COMPROVAÇÃO DE INÍCIO DOS PROCEDIMENTOS PARA SANEAMENTO DA CONDIÇÃO",
        acao: "APONTAMENTO",
        texto: "Em atenção ao Ofício nº 011-E/2024, de 20/08/24, solicitando prorrogação da Cláusula Suspensiva, temos a informar que para seu atendimento faz-se necessária, além da apresentação do pedido pelo Convenente em até 45 dias antes da data limite estabelecida em cláusula específica, a comprovação de que iniciou os procedimentos para o saneamento da condição suspensiva.\n§ 4º Para fins do disposto no inciso III do § 3º, a solicitação de prorrogação deverá:\nI - ser apresentada pelo convenente em até 45 (quarenta e cinco) dias antes da data limite estabelecida em cláusula específica, conforme disposto no inciso I do § 3º" // Note: \n can represent line breaks if needed
    },
    {
        titulo: "CLÁUSULA SUSPENSIVA",
        ocorrencia: "SOLICITAÇÃO DE PRORROGAÇÃO - SOLICITAÇÃO FORA DO PRAZO",
        acao: "APONTAMENTO",
        texto: "Ainda em referência ao presente CR, também não foi constatada comprovação de que iniciou os procedimentos para o saneamento da condição suspensiva. (PC 33/2023, art. 24, § 4º)"
    },
    {
        titulo: "CONTRAPARTIDA",
        ocorrencia: "CP DEPOSITADA A MAIOR",
        acao: "APONTAMENTO",
        texto: "Realizado depósito em duplicidade da contrapartida solicitada para desbloqueio da medição 02.\nPara CR que opera por OBTV e está em fase de execução físico-financeira, a devolução dos recursos é realizada no módulo \"Execução\", aba \"Devolução de Recursos\", conforme os Manuais Operacionais do Transferegov.br, nos casos em que tenha ocorrido depósito indevido de CP."
    },
    {
        titulo: "CONTRATAÇÃO",
        ocorrencia: "CLAUSULA SUSPENSIVA PAC HIS TRABALHO SOCIAL - INCLUSÃO DO ITEM NA MINUTA CONTRATUAL",
        acao: "ITEM NA MINUTA CONTRATUAL / TA",
        texto: "VI – Projeto de Trabalho Técnico Social, nos termos do Anexo I, da Portaria MCID nº 1416, de 06/11/2023."
    },
     {
        titulo: "CTEF",
        ocorrencia: "DOCUMENTO COM ASSINATURA DIGITAL E MANUAL",
        acao: "APONTAMENTO",
        texto: "CTEF anexado no Transferegov.br não é válido, pois foi assinado usando assinatura digital e manual ao mesmo tempo.\nOs documentos assinados eletronicamente somente possuem validade:\n- Enquanto digitais, de modo que não há validade jurídica em documentos assinados por uma parte de forma eletrônica e por outra de forma física; e\n- Após a assinatura de todas as partes, sendo o início da vigência do instrumento a data da assinatura do partícipe que assinou por último."
    },
    {
        titulo: "CTEF",
        ocorrencia: "CONTRATO CTEF VENCIDO",
        acao: "APONTAMENTO",
        texto: "Apresentar Termo Aditivo contemplando vigência válida do CTEF. A vigência do CTEF ou do instrumento que o substitua deve conter, no mínimo, o prazo para execução da intervenção conforme cronograma vigente do Contrato de Repasse. Documento deve ser inserido no módulo \"Instrumentos Contratuais\", aba \"Termos Aditivos\", no Transferegov."
    },
    {
        titulo: "DECLARAÇÃO EXTRAÇÃO",
        ocorrencia: "DECLARAÇÃO DE EXTRAÍDOS",
        acao: "ANOTAÇÃO",
        texto: "Declaro que sou responsável pela consulta e extração do documento realizadas em xx/xx/xxxx a partir da aba Anexos do PT do Transferegov.br, para fins de composição de dossiê digital."
    },
    {
        titulo: "DESBLOQUEIO - PRIMEIRO",
        ocorrencia: "INEXISTÊNCIA DE EXECUÇÃO FINANCEIRA APÓS 180 DIAS DO CRÉDITO DA 1ª PARCELA",
        acao: "APONTAMENTO",
        texto: "Em atenção a medição apresentada no Transferegov.br, informamos que Contratos de Repasse, a partir de 2017, quando não houver execução financeira, após 180 dias da liberação da primeira parcela de recursos, deverão ser rescindidos.\nTal prazo poderá ser prorrogado, desde que o pedido de prorrogação contenha a motivação e a justificativa do atraso e que não fique caracterizada culpa ou inércia do Convenente e comprove que a prorrogação dar-se-á em benefício da execução do objeto, nas situações dispostas a seguir:\n- aquisições de equipamentos que necessitem de adequação;\n- aquisições de bens, cuja entrega tenha sido retardada por algum outro aspecto justificado;\n- execução de obras que não foram iniciadas por algum aspecto justificado;\n- execução de obras que foram paralisadas por eventos climáticos."
    },
    {
        titulo: "DESBLOQUEIO - PRIMEIRO",
        ocorrencia: "INEXISTÊNCIA DE EXECUÇÃO FINANCEIRA APÓS 180 DIAS DO CRÉDITO DA 1ª PARCELA",
        acao: "APONTAMENTO",
        texto: "Em atenção a medição apresentada no Transferegov.br, informamos que Contratos de Repasse, a partir de 2017, quando não houver execução financeira, após 180 dias da liberação da primeira parcela de recursos, deverão ser rescindidos.\nTal prazo poderá ser prorrogado, desde que o pedido de prorrogação contenha a motivação e a justificativa do atraso e que não fique caracterizada culpa ou inércia do Convenente e comprove que a prorrogação dar-se-á em benefício da execução do objeto, nas situações dispostas a seguir:\n- aquisições de equipamentos que necessitem de adequação;\n- aquisições de bens, cuja entrega tenha sido retardada por algum outro aspecto justificado;\n- execução de obras que não foram iniciadas por algum aspecto justificado;\n- execução de obras que foram paralisadas por eventos climáticos."
    },
    {
        titulo: "DESBLOQUEIO - PRIMEIRO",
        ocorrencia: "INEXISTÊNCIA DE EXECUÇÃO FINANCEIRA APÓS 180 DIAS DO CRÉDITO DA 1ª PARCELA",
        acao: "SITUAÇÃO ATUAL",
        texto: "Medição no Transferegov apresentada após 180 dias da liberação da primeira parcela de recursos, sendo impeditivo para continuidade do processo."
    },
    {
        titulo: "DESBLOQUEIO - PRIMEIRO",
        ocorrencia: "AUSÊNCIA DA DECLARAÇÃO DE APROVAÇÃO DO PROJETO DE ACESSIBILIDADE",
        acao: "APONTAMENTO",
        texto: "Apresentar declaração que o Convenente recebeu e aprovou o Projeto Executivo de Acessibilidade e que sua execução se dará de forma a garantir o cumprimento dos itens previstos na Lista de Verificação de Acessibilidade, para desbloqueio da primeira parcela de CR vinculados aos exercícios financeiros a partir de 2018, conforme IN MPDG nº 002/2017."
    },
    {
        titulo: "DESBLOQUEIO - PRIMEIRO",
        ocorrencia: "DESPACHO PARA ENGENHARIA - VERIFICAÇÃO DE ARTS",
        acao: "DESPACHO",
        texto: "Solicito verificar ARTS de Fiscalização e de Execução, inseridos no Acompanhamento de Obras do TGov, com a devida atualização do REUNI.\nPeço, também, devolução do protocolo após análise para continuidade do processo de desbloqueio."
    },
    {
        titulo: "DESBLOQUEIO - PRIMEIRO",
        ocorrencia: "DESPACHO PARA ENGENHARIA - VERIFICAÇÃO DE ARTS E MANIFESTAÇÃO AMBIENTAL",
        acao: "DESPACHO",
        texto: "Solicito verificar ARTS de Fiscalização e de Execução e Manifestação ambiental, inseridos no Acompanhamento de Obras do TGov, com a devida atualização do REUNI. Peço, também, devolução do protocolo após análise para continuidade do processo de desbloqueio."
    },
    {
        titulo: "DESBLOQUEIO - ÚLTIMO",
        ocorrencia: "AUSÊNCIA DE PLACA DE INAUGURAÇÃO",
        acao: "APONTAMENTO",
        texto: "Apresentar declaração do Representante Legal do Convenente informando que não haverá instalação de placa de inauguração de obra ou, caso o Convenente opte pela instalação de placa, apresentar registro fotográfico georreferenciado que demonstre a conformidade da placa com o Manual Visual de Placas e Adesivos de Obras"
    },
    {
        titulo: "DESBLOQUEIO - ÚLTIMO",
        ocorrencia: "AUSÊNCIA DE PLACA DE OBRA",
        acao: "APONTAMENTO",
        texto: "Deverá ser realizada a comprovação da existência de Placa de Obra. Reforçando que o Contratado deve afixar a placa de obra em local visível, e mantê-la em bom estado de conservação obrigatoriamente durante todo o período de execução da obra."
    },
    {
        titulo: "DESBLOQUEIO - ÚLTIMO",
        ocorrencia: "AUSÊNCIA DO LAUDO DE CONTROLE TECNOLÓGICO PARA PAVIMENTAÇÃO ASFÁLTICA",
        acao: "APONTAMENTO",
        texto: "Para pavimentos asfálticos: O controle tecnológico das obras de pavimentação executadas com recursos desse Programa será obrigatório. O ente federativo contratante deverá exigir da construtora, um Laudo Técnico de Controle Tecnológico, e apensado a ele virão os resultados dos ensaios realizados em cada etapa dos serviços conforme exigências normativas do DNIT. Esses resultados serão entregues obrigatoriamente à CAIXA. O Laudo Técnico e os resultados dos ensaios farão parte da documentação técnica do contrato de repasse com a CAIXA, possibilitando, quando do aparecimento de problemas precoces no pavimento, a identificação dos mesmos a fim de subsidiar os reparos de responsabilidade do ente contratado, bem como da responsabilidade solidária da empresa executora dos serviços de pavimentação e controle tecnológico."
    },
    {
        titulo: "DESBLOQUEIO - ÚLTIMO",
        ocorrencia: "AUSÊNCIA DO LAUDO DE ACESSIBILIDADE",
        acao: "APONTAMENTO",
        texto: "Apresentar Laudo de Conformidade em Acessibilidade, para desbloqueio da última parcela de CR vinculados aos exercícios financeiros a partir de 2018 (IN MPDG nº 002/2018)."
    },
    {
        titulo: "DESBLOQUEIO - ÚLTIMO",
        ocorrencia: "PLACA DE INAUGURAÇÃO - PERÍODO ELEITORAL - DEMAIS GESTORES",
        acao: "APONTAMENTO",
        texto: "Apresentar declaração do Representante Legal do Convenente informando que não haverá instalação de placa de inauguração de obra ou, caso o Convenente opte pela instalação de placa, durante o período eleitoral, apresentar declaração do Representante Legal do Convenente informando que a referida placa, de acordo com o padrão estabelecido no Manual Visual de Placas e Adesivos de Obras, será instalada somente após o defeso eleitoral."
    },
    {
        titulo: "DESBLOQUEIO - ÚLTIMO",
        ocorrencia: "PLACA DE INAUGURAÇÃO - PERÍODO ELEITORAL - MTUR",
        acao: "APONTAMENTO",
        texto: "Apresentar declaração do Representante Legal do Convenente informando que a referida placa, de acordo com o padrão estabelecido no Manual Visual de Placas e Adesivos de Obras, será instalada somente após o defeso eleitoral."
    },
    {
        titulo: "DESBLOQUEIO - ÚLTIMO",
        ocorrencia: "TERMO DE RECEBIMENTO DO OBJETO",
        acao: "APONTAMENTO",
        texto: "Apresentar documento que comprove o recebimento do objeto do CR, por parte do Convenente, para solicitação de desbloqueio da última parcela de CR vinculados aos exercícios financeiros a partir de 2018 (IN MPDG nº 002/2018 e suas alterações)"
    },
    {
        titulo: "EGT",
        ocorrencia: "EGT 06",
        acao: "ANOTAÇÃO",
        texto: "Objeto concluído com valor menor que VI contratado. Vistoria final realizada por empresa terceirizada."
    },
    {
        titulo: "INCOM",
        ocorrencia: "LISTA DE CPF INCOM",
        acao: "LISTA",
        texto: "MONICA - 08258833774\nSURAMA - 05301571796\nKARINA - 70334668115\nROGER FERLINI - 05852434418"
    },
    {
        titulo: "MANIFESTAÇÃO AMBIENTAL",
        ocorrencia: "MANIFESTAÇÃO AMBIENTAL VENCIDA",
        acao: "APONTAMENTO",
        texto: "A execução dos serviços da medição atual ocorreu em prazo cuja Manifestação Ambiental estava vencida, por previsão normativa não poderão ser realizados desbloqueios sem a documentação válida, motivo pelo qual deverá ser verificado junto ao Órgão responsável a urgência necessária."
    },
    {
        titulo: "MEDIÇÃO",
        ocorrencia: "DIVERGENCIA NOS VALORES CONTRATADOS E OS INFORMADOS NA MEDIÇÃO",
        acao: "APONTAMENTO",
        texto: "Corrigir os dados relativos à valores contratados em toda documentação de medição:\nValores vigentes do Contrato de Repasse\nRepasse: R$xxx\nContrapartida: R$xxx\nValores do CTEF\nRepasse: R$xxx\nContrapartida: R$xxx\nSaldo a reprogramar: R$xxxx"
    },
    {
        titulo: "MEDIÇÃO",
        ocorrencia: "MEDIÇÃO INSERIDA NO ANEXOS DO PT INDEVIDAMENTE",
        acao: "APONTAMENTO",
        texto: "Em atenção ao pedido de desbloqueio RRE XX, inserido no Transferegov na aba Anexos do PT, informamos que tendo em vista que as medições estão de acordo com as parcelas aprovadas na fase da VRPL, faz-se necessário que a inclusão da medição seja realizada diretamente na aba Acompanhamento de Obras, com ateste do Convenente. Ressaltamos, inclusive, necessidade da inserção mínima do Ofício de solicitação de desbloqueio e do RRE na sub-aba anexos ainda desta aba principal."
    },
    {
        titulo: "MEDIÇÃO",
        ocorrencia: "MEDIÇÃO NÃO INSERIDA NO ACOMP. OBRAS",
        acao: "APONTAMENTO",
        texto: "Em atenção ao pedido de desbloqueio RRE XX, solicitamos a inserção mínima do Ofício de solicitação de desbloqueio e do RRE na sub-aba OBSERVAÇÕES do Acompanhamento de Obras no TransfereGov."
    },
    {
        titulo: "MEDIÇÃO",
        ocorrencia: "VALOR ATESTADO EM VISTORIA MENOR QUE LIBERADO ANTERIORMENTE",
        acao: "APONTAMENTO",
        texto: "Tendo em vista inexecução, parcial, de serviços atestados pela fiscalização do Contratado e já desbloqueados, quando da realização de vistoria, solicitamos esclarecimentos quanto à glosa ocorrida no valor de R$XX.XXX,XX. Valores já desbloqueados R$XXX.XXX,XX e valores atestados Caixa R$XXX.XXX,XX.\nEsclarecimento deve ser prestado no Transferegov.br, funcionalidade \"Esclarecimentos\", do módulo \"Acompanhamento e Fiscalização\"\nPrazo: XX/XX/XXXX (30 DIAS)"
    },
    {
        titulo: "MEDIÇÃO",
        ocorrencia: "VALOR ATESTADO EM VISTORIA MENOR QUE LIBERADO ANTERIORMENTE - REITERAÇÃO",
        acao: "APONTAMENTO",
        texto: "Em relação à glosa apresentada, solicitamos atender ao pedido de Esclarecimento 1/2023 no TransfereGov.\nO quadro de glosas encontra-se anexo à solicitação.\nEsclarecimento deve ser prestado no Transferegov.br, funcionalidade \"Esclarecimentos\", do módulo \"Acompanhamento e Fiscalização\"\nPrazo: 30/06/2023 (30 DIAS)"
    },
    {
        titulo: "MEDIÇÃO",
        ocorrencia: "VALORES DO KIT DE MEDIÇÃO INCOMPATÍVEIS COM O REGISTRADO NO ACOMPANHAMENTO DE OBRAS",
        acao: "APONTAMENTO",
        texto: "Observar a correta inclusão da documentação no TRANSFEREGOV por ocasião da solicitação de desbloqueio de recursos:\n1) O BM ou a PLE deverá ser registrado no módulo \"Acompanhamento de Obras\";\n2) O ofício de solicitação e RRE (MO 41.211 v.011) devem ser inseridos na aba \"Observações\" da medição no referido módulo;\nO ofício de solicitação e RRE apresentados no valor de R$ 60.192,77, PLE no valor de R$60.596,63 devem compatibilizados com o valor registrado no TRANSFEREGOV, aba Acompanhamento de Obras e PLE inserida de R$ 60.596,57.\nEventual impossibilidade de registrar a medição correta diretamente no Módulo Acompanhamento de Obras, o kit de medição deverá ser inserido nos Anexos do PT, juntamente com a devida justificativa da não utilização daquele módulo.\nSalientamos que alcançado o marco de vistoria o valor acumulado da medição deverá ser compatível com o cronograma aprovado na VRPL, sob pena de haver a necessidade de reprogramação de cronograma/eventograma previamente à vistoria e com o devido recolhimento de tarifa de prestação de Serviço Extraordinário."
    },
    {
        titulo: "MEDIÇÃO",
        ocorrencia: "RECEBIMENTO DE BM PARA VISTORIA",
        acao: "SITUAÇÃO ATUAL",
        texto: "Obra em andamento, com apresentação de Boletim de Medição e solicitação de desbloqueio de recursos em ... Em tratamento pela área de engenharia/operacional da GIGOV."
    },
    {
        titulo: "PDF/A",
        ocorrencia: "ALTERAÇÃO / ADULTERAÇÃO DE DOCUMENTOS SALVOS EM PDF/A",
        acao: "APONTAMENTO",
        texto: "Solicitamos manter o padrão de PDF/A do documento, não devendo ser habilitada a edição do documento, bastando efetivar a respective assinatura do mesmo."
    },
    {
        titulo: "PERÍODO ELEITORAL",
        ocorrencia: "NÃO CUMPRIMENTO DOS PRAZOS PARA COMPROVAÇÃO DE INÍCIO",
        acao: "APONTAMENTO",
        texto: "Em atenção a Medição 01, encaminhada à Caixa em 21/08/24, temos a informar que pelo não cumprimento do regramento do período eleitoral, seu desbloqueio não poderá ser realizado nesse momento.\n- Não houve apresentação da Declaração do Início de Obra, conforme orientação anterior, assinada até o dia 05/07/2024.\nTal restrição será mantida até a data de realização da votação do primeiro turno (06/10/2024), ou até a realização do segundo turno (27/10/2024), caso se realize."
    },
    {
        titulo: "TERMO ADITIVO",
        ocorrencia: "EXTRATO TERMO ADITIVO - ALTERAÇÃO CL. 19 - II E ALTERAÇÃO DE CP",
        acao: "ITEM NA MINUTA CONTRATUAL / TA",
        texto: "V - DESCRIÇÃO FINANCEIRA E ORÇAMENTÁRIA\nRecursos da Contrapartida aportada pelo CONTRATADO R$ 179.404,06 (cento e setenta e nove mil e quatrocentos e quatro reais e seis centavos).\nValor do Investimento (VI - Repasse + Contrapartida) R$ 418.154,06 (quatrocentos e dezoito mil e cento e cinquenta e quatro reais e seis centavos).\n19 – Ao CONTRATADO é vedado:\nII. Realizar reprogramações decorrentes de ajustes ou adequações nos projetos de engenharia ou nos termos de referência de serviços de engenharia dos instrumentos enquadrados nos Níveis I e I-A, conforme o disposto no §4º e no §8º do Art. 6º da Portaria Interministerial MPDG/MF/CGU nº 424, de 30 de dezembro de 2016 e suas alterações;\nA vedação disposta no item II não abrange alterações para:\na) atualização dos preços, sem alteração de meta ou etapa; ou\nb) repactuação de metas e etapas, em razão de insuficiência dos recursos originalmente pactuados, desde que observadas a funcionalidade do objeto e a sua fruição.”"
    },
    {
        titulo: "TERMO ADITIVO",
        ocorrencia: "EXTRATO TERMO ADITIVO - ALTERAÇÃO CL. 19 - II E ALTERAÇÃO DE CP",
        acao: "EXTRATO",
        texto: "Altera contrap: R$ 179.404,06 e inclusão abrangência vedação item II Cláusula 19"
    },
    {
        titulo: "TERMO ADITIVO",
        ocorrencia: "EXTRATO TERMO ADITIVO - ALTERAÇÃO CL. 19 - II E ALTERAÇÃO DE CP",
        acao: "OBJETO",
        texto: "Altera contrap: R$xxx,xx e inclusão abrangência vedação item II Cláusula 19\nAltera redação do Inciso II da Cláusula 19"
    },
    {
        titulo: "TITULARIDADE",
        ocorrencia: "APRESENTAÇÃO DE DECLARAÇÃO DE BEM DE USO COMUM DO POVO QUANDO DEVERIA SER APRESENTADA CERTIDÃO DE INTEIRO TEOR",
        acao: "APONTAMENTO",
        texto: "Considerando que o objeto da intervenção não se enquadra na definição de bem de uso comum do povo que seriam praças, praias, ruas, etc, solicitamos que seja apresentada a certidão atualizada do registro do imóvel."
    },
    {
        titulo: "TITULARIDADE",
        ocorrencia: "DOCUMENTAÇÃO PARA COMPROVAÇÃO DE TITULARIDADE DE IMÓVEL",
        acao: "APONTAMENTO",
        texto: "Esclarecemos que a comprovação de Titularidade da Área de Intervenção em nome do Proponente/Contratado é efetuada mediante certidão emitida pelo Cartório de Registro de Imóveis competente, cuja validade é de 30 dias a contar da data de sua emissão.\nSolicitamos que seja apresentada uma certidão devidamente atualizada."
    },
    {
        titulo: "TITULARIDADE",
        ocorrencia: "ENVIO DE PROJETO PARA ANÁLISE SEM LOCALIZAÇÃO DE DOCUMENTAÇÃO DE TITULADADE",
        acao: "APONTAMENTO",
        texto: "Não localizamos, na aba anexos do Projeto Básico/Termo de referência do Transferegov, a documentação referente à titularidade da área de intervenção.\nAguardamos a inclusão dos documentos pertinentes para que possamos prosseguir na análise para a retirada da cláusula suspensiva."
    },
    {
        titulo: "TITULARIDADE",
        ocorrencia: "APRESENTADA DECLARAÇÃO DE POSSE DE ÁREA SOB PENAS DO ART. 299 COD. CIVIL",
        acao: "APONTAMENTO",
        texto: "Apresentada declaração sob as penas do art 299, código civil, de que a/o prefeitura/governo é detentora da posse da área de intervenção referente à área destinada a execução do objeto \"DISCRIMINAR O OBJETO DO CONTRATO\" e que a sua regularização formal será comprovada até o final da execução do objeto do Termo de Compromisso."
    },
    {
        titulo: "VRPL",
        ocorrencia: "AUSENCIA DE PUBLICAÇÃO EM JORNAL DIÁRIO DE GRANDE CIRCULAÇÃO",
        acao: "APONTAMENTO",
        texto: "Apresentar publicação do aviso de licitação em jornal diário de grande circulação, em conformidade à Lei 14.133/2021.\nAinda referente à comprovação do extrato do edital para as licitações ocorridas no âmbito da Lei nº 14.133/2021, a CAIXA, em caráter excepcional, poderá realizar o aceite do processo licitatório ainda que não tenha sido apresentada a publicação em jornal diário de grande circulação, desde que os demais itens tenham sido integralmente atendidos e que seja apresentada manifestação jurídica da Procuradoria do Convenente esclarecendo que a ausência de publicação em jornal diário de grande circulação não comprometeu o caráter competitivo do certame, não cabendo avaliação quanto aos aspectos jurídicos da manifestação apresentada."
    },
    {
        titulo: "VRPL",
        ocorrencia: "COMPROVAÇÃO DO INÍCIO DE PROCESSO LICITATÓRIO - PI 424/16",
        acao: "APONTAMENTO",
        texto: "Aceita a comprovação do início do Processo Licitatório, o qual foi realizado dentro do prazo estabelecido no Art. 50, §3º da Portaria 424/2016 (Aviso de Licitação - Tomada de Preços XX/20XX - DOU de XX/XX/20XX)."
    },
    {
        titulo: "VRPL",
        ocorrencia: "COMPROVAÇÃO DO INÍCIO DE PROCESSO LICITATÓRIO - PC 33/23",
        acao: "APONTAMENTO",
        texto: "Aceita a comprovação do início do Processo Licitatório, o qual foi realizado dentro do prazo estabelecido no Art. 52, §2º da Portaria 33/2023 (Aviso de Licitação - Tomada de Preços XX/20XX - DOU de XX/XX/20XX)."
    },
    {
        titulo: "VRPL",
        ocorrencia: "FALTA DE COMPROVAÇÃO DO INÍCIO DE PROCESSO LICITATÓRIO",
        acao: "APONTAMENTO",
        texto: "Informamos impossibilidade de aceite do processo licitatório, pois não houve comprovação do início do processo licitatório dentro do prazo regulamentado ou pedido de prorrogação, bem como não houve justificativa a ocorrência inserida no TransfereGov."
    },
    {
        titulo: "VRPL",
        ocorrencia: "VRPL HÍBRIDA APÓS INÍCIO DO OBJETO E MÓDULO NOVO COM APOSTILAMENTO",
        acao: "APONTAMENTO",
        texto: "Realizado apostilamento do Processo de Execução TP 007/2023, em 29/08/23, cabendo nesse momento ao Convenente entrar na aba “Execução Convenente” - \"Processo de Execução\" e \"enviar para Aceite\" o respectivo processo.\nRessaltamos que na referida aba, deverão ser inseridos todos os arquivos do resultado da licitação, inclusive CTEF e sua publicação.\nA partir do aceite da licitação nesse módulo o contrato passará a ser tratado pela sistemática Híbrida, não sendo mais possível a utilização das abas \"VRPL\", \"Instrumentos Contratuais\" e \"Acompanhamento de Obras\", sendo tratado pela metodologia antiga.\nAção sujeita a cobrança de tarifa extraordinária conforme previsto na minuta contratual."
    }
];