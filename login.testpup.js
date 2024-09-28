const puppeteer = require('puppeteer');

(async () => {
  // Iniciar o browser e abrir uma nova página
  const browser = await puppeteer.launch({ headless: false }); // headless: false para visualizar o navegador em ação
  const page = await browser.newPage();

  // Escuta os diálogos de alert
  page.on('dialog', async dialog => {
    const message = dialog.message();
    if (message === 'Login successful!') {
      console.log('Teste com credenciais corretas: Passou');
    } else {
      console.log('Teste com credenciais corretas: Falhou');
    }
    await dialog.accept();
  });

  // Medir o tempo total do teste
  console.time('Tempo total do teste');

  // Acessar a página de login da aplicação Next.js
  await page.goto('http://localhost:3000'); // Substitua pela URL correta se necessário

  // Preencher o campo de email
  await page.type('#email', 'admin@example.com');

  // Preencher o campo de senha
  await page.type('#password', 'password123');

  // Submeter o formulário
  await page.click('button[type="submit"]');

  // Esperar pelo alerta
  await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda 1 segundo

  // Recarregar a página para o segundo teste
  await page.reload();

  // Preencher o campo de email novamente
  await page.type('#email', 'admin@example.com');

  // Preencher o campo de senha incorreta
  await page.type('#password', 'wrongpassword');

  // Submeter o formulário novamente
  await page.click('button[type="submit"]');

  // Esperar pelo alerta

  // Fim do teste total
  console.timeEnd('Tempo total do teste');

  // Esperar um tempo antes de fechar o browser
  await browser.close();
})();
