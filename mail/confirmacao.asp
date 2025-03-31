<%@ Language="VBScript" %>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de Dados</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f5f5f5;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        h1, h2 {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
        }

        .dados-email {
            margin-bottom: 30px;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }

        .info-item {
            margin-bottom: 15px;
        }

        .info-item strong {
            display: inline-block;
            width: 120px;
            font-weight: 600;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }

        table th, table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        table th {
            background-color: #f2f2f2;
            font-weight: 600;
        }

        .btn {
            background-color: #4a90e2;
            color: white;
            border: none;
            padding: 12px 25px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            display: block;
            width: 250px;
            margin: 0 auto;
            text-align: center;
        }

        .btn:hover {
            background-color: #3a7bc8;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Confirmação de Dados</h1>

        <div class="dados-email">
            <h2>Dados do Email</h2>
            <div class="info-item"><strong>Remetente:</strong> <span id="remetenteInfo"></span></div>
            <div class="info-item"><strong>Destinatário:</strong> <span id="destinatarioInfo"></span></div>
            <div class="info-item"><strong>Assunto:</strong> <span id="assuntoInfo"></span></div>
        </div>

        <h2>Dados Pessoais</h2>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                </tr>
            </thead>
            <tbody id="tabelaPessoas">
                <!-- Será preenchido via JavaScript -->
            </tbody>
        </table>

        <button id="enviarEmail" class="btn">Enviar pelo Outlook</button>
    </div>

    <script>
        // Recuperando os dados do localStorage
        const formData = JSON.parse(localStorage.getItem('formData'));
        
        // Preenchendo as informações de email
        document.getElementById('remetenteInfo').textContent = formData.remetente;
        document.getElementById('destinatarioInfo').textContent = formData.destinatario;
        document.getElementById('assuntoInfo').textContent = formData.assunto;
        
        // Preenchendo a tabela de pessoas
        const tabelaPessoas = document.getElementById('tabelaPessoas');
        formData.pessoas.forEach(pessoa => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${pessoa.nome}</td>
                <td>${pessoa.idade}</td>
            `;
            tabelaPessoas.appendChild(tr);
        });
        
        // Função para enviar o email pelo Outlook
        document.getElementById('enviarEmail').addEventListener('click', function() {
            // Criando o corpo do email em formato HTML
            let corpoEmail = `
                <html>
                <head>
                    <style>
                        table {
                            border-collapse: collapse;
                            width: 100%;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h2>Dados Pessoais</h2>
                    <table>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                        </tr>
            `;
            
            // Adicionando as pessoas à tabela no corpo do email
            formData.pessoas.forEach(pessoa => {
                corpoEmail += `
                    <tr>
                        <td>${pessoa.nome}</td>
                        <td>${pessoa.idade}</td>
                    </tr>
                `;
            });
            
            corpoEmail += `
                    </table>
                </body>
                </html>
            `;
            
            // Preparando o mailto com todos os dados
            let mailtoLink = `mailto:${formData.destinatario}?subject=${encodeURIComponent(formData.assunto)}&body=${encodeURIComponent(corpoEmail)}`;
            
            // Abrindo o Outlook com o email em modo rascunho
            window.location.href = mailtoLink;
        });
    </script>
</body>
</html>