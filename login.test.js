const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

(async function loginTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  // Capturar o tempo de início do teste
  const startTime = Date.now();

  try {
    // Acessar a página de login da sua aplicação Next.js
    await driver.get('http://localhost:3000'); // Substitua pela URL correta se necessário

    // 1. Teste com credenciais corretas
    await driver.findElement(By.id('email')).sendKeys('admin@example.com');
    await driver.findElement(By.id('password')).sendKeys('password123');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Esperar pelo alerta de sucesso
    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();

    if (alertText === "Login successful!") {
      console.log('Teste com credenciais corretas: Passou');
    } else {
      console.log('Teste com credenciais corretas: Falhou');
    }

    await alert.accept(); // Fecha o alerta

    // 2. Teste com credenciais incorretas
    await driver.navigate().refresh(); // Recarregar a página para novo teste

    await driver.findElement(By.id('email')).sendKeys('admin@example.com');
    await driver.findElement(By.id('password')).sendKeys('wrongpassword');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Esperar pelo alerta de erro
    await driver.wait(until.alertIsPresent());
    alert = await driver.switchTo().alert();
    alertText = await alert.getText();

    if (alertText === "Invalid email or password") {
      console.log('Teste com credenciais incorretas: Passou');
    } else {
      console.log('Teste com credenciais incorretas: Falhou');
    }

    await alert.accept(); // Fecha o alerta
  } catch (error) {
    console.error('Erro durante o teste:', error);
  } finally {
    // Capturar o tempo de fim do teste
    const endTime = Date.now();

    // Calcular o tempo total
    const totalTime = (endTime - startTime) / 1000; // Converter de milissegundos para segundos
    console.log(`Tempo total do teste: ${totalTime} segundos`);

    await driver.quit(); // Fecha o navegador após os testes
  }
})();
