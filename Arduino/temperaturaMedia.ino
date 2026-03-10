// Criando variável que recebe o pino onde o sensor está conectado
const int PINO_SENSOR_TEMPERATURA = A0;
// Variável que vai armazenar a temperatura calculada em Celsius
float temperaturaCelsius;
// Variável para armazenar a media atual
float media;
// Variável para contar quantas vezes ouve leituras
int leituras
// Armazena a soma de todas temperaturas para gerar a média
float totalTemperaturas;
// A funçao setup serve para configurar o arduino sem ela o arduino não consegue funciona.
void setup()
{
    Serial.begin(9600);
}
// Função loop roda continuamente enquanto o Arduino estiver ligado, ela funciona em loop
void loop()
{
    // Incrementa mais 1 toda vez que o loop reseta
    leituras++;
    // Lê o valor analógico do sensor no pino A0
    // O valor retornado vai de 0 a 1023
    int valorLeitura = analogRead(PINO_SENSOR_TEMPERATURA);
    // Converte o valor lido para temperatura em Celsius
    temperaturaCelsius = (valorLeitura * 5.0 / 1023.0) / 0.01;
    // Exibi a temperatura formatada no console
    Serial.print("temperatura : ");
    Serial.print(temperaturaCelsius);
    // Esse " C" serve para pular uma linha entre uma temperatura e outra
    Serial.println(" C");
    // Incrementa as temperaturas somando
    totalTemperaturas += temperaturaCelsius;
    // Dividi a soma de todas temperaturas pela a quantidade de leituras gerando uma média
    media = totalTemperaturas / leituras;
    // Apresenta a média 
    Serial.print("Media : ");
    Serial.print(media);
    Serial.println(" C");

    // Espera 2 segundos para repetir a leitura
    delay(2000);
}