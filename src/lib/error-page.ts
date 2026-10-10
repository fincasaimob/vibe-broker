export function renderErrorPage(): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Erro - Vibe Broker</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #fff;
          }

          .error-container {
            text-align: center;
            padding: 2rem;
            max-width: 600px;
          }

          .error-code {
            font-size: 4rem;
            font-weight: bold;
            color: #ff9800;
            margin-bottom: 1rem;
          }

          .error-title {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .error-message {
            font-size: 1.1rem;
            color: #ccc;
            margin-bottom: 2rem;
            line-height: 1.6;
          }

          .error-link {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.75rem 2rem;
            background-color: #ff9800;
            color: #1a1a1a;
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: background-color 0.3s;
          }

          .error-link:hover {
            background-color: #ffb74d;
          }
        </style>
      </head>
      <body>
        <div class="error-container">
          <div class="error-code">500</div>
          <h1 class="error-title">Erro no Servidor</h1>
          <p class="error-message">
            Desculpe, algo deu errado no nosso servidor.
            <br />
            Por favor, tente novamente em alguns momentos.
          </p>
          <a href="/" class="error-link">Voltar ao Início</a>
        </div>
      </body>
    </html>
  `;
}
