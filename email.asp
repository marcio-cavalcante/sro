<%
' Configurar os dados do e-mail
Dim remetente, destinatario, assunto, corpo
remetente = "marcio_acc@hotmail.com"
destinatario = "marcio.cavalcante@outlok.com"
assunto = "Assunto do E-mail"
corpo = "Olá, este é o corpo do e-mail."

' Gerar o link mailto com os dados
Dim mailtoLink
mailtoLink = "mailto:" & destinatario & "?subject=" & Replace(Server.URLEncode(assunto), "+", "%20") & "&body=" & Replace(Server.URLEncode(corpo), "+", "%20")
%>

<!DOCTYPE html>
<html>
<head>
    <title>Abrir e-mail no Outlook</title>
</head>
<body>
    <!-- Botão para abrir o e-mail -->
    <a href="<%= mailtoLink %>">
        <button type="button">Abrir E-mail no Outlook</button>
    </a>
</body>
</html>
