const puppeteer = require('puppeteer');

(async () => {
  // Iniciar o browser e abrir uma nova página
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Função para escutar e tratar diálogos de alerta
  const handleDialog = async (dialog, expectedMessage, successMessage, failMessage) => {
    const message = dialog.message();
    if (message === expectedMessage) {
      console.log(successMessage);
    } else {
      console.log(failMessage);
    }
    await dialog.accept(); // Aceita o diálogo
  };

  // Escutador de diálogo único
  page.on('dialog', async dialog => {
    const message = dialog.message();
    if (message === 'Login successful!') {
      await handleDialog(dialog, 'Login successful!', 'Teste com credenciais corretas: Passou', 'Teste com credenciais corretas: Falhou');
    } else if (message === 'Invalid email or password') {
      await handleDialog(dialog, 'Invalid email or password', 'Teste com credenciais incorretas: Passou', 'Teste com credenciais incorretas: Falhou');
    }
  });

  // Medir o tempo total do teste
  console.time('Tempo total do teste');

  // Acessar a página de login da aplicação Next.js
  await page.goto('http://localhost:3000'); // Substitua pela URL correta se necessário

  // Teste com credenciais corretas
  await page.waitForSelector('#email');
  await page.type('#email', 'admin@example.com');
  await page.type('#password', 'password123');
  await page.click('button[type="submit"]');

  // Esperar pelo alerta de sucesso de login
  await new Promise(resolve => setTimeout(resolve, 500)); // Aguarda 1 segundo


  // Recarregar a página para o segundo teste
  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });

  // Teste com credenciais incorretas
  await page.waitForSelector('#email');
  await page.type('#email', 'admin@example.com');
  await page.type('#password', 'wrongpassword');
  await page.click('button[type="submit"]');

  // Esperar pelo alerta de erro de login
  await new Promise(resolve => setTimeout(resolve, 500)); // Aguarda 1 segundo


  // Fim do teste total
  console.timeEnd('Tempo total do teste');

  // Fechar o browser
  await browser.close();
})();

