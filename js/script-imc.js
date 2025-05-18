document.addEventListener("DOMContentLoaded", function () {
  const btnCalcular = document.getElementById("calcular");
  const btnLimpar = document.getElementById("limpar");
  const pesoInput = document.getElementById("peso");
  const alturaInput = document.getElementById("altura");

  const spansResultado = document.querySelectorAll("#resultado_imc span");
  const resultadoIMC = spansResultado[0];
  const statusIMC = spansResultado[1];

  const boxClassificacao = document.getElementById("box_classificacao");

  const ding = new Audio("sound/click_effect-86995.mp3");

  btnCalcular.addEventListener("click", function () {
    ding.play();

    const pesoStr = pesoInput.value.trim();
    const alturaStr = alturaInput.value.trim();

    let temErro = false;

    // Normaliza entrada
    const peso = parseFloat(pesoStr.replace(",", "."));
    const altura = parseFloat(alturaStr.replace(",", "."));

    // Validação do peso
    if (pesoStr === "" || isNaN(peso) || peso <= 0) {
      alert("Informe um peso válido (ex: 70,5 ou 80)");
      temErro = true;
    }

    // Verifica se digitou altura sem vírgula ou ponto
    if (alturaStr !== "" && !alturaStr.includes(",") && !alturaStr.includes(".")) {
      alert("Informe a altura com vírgula ou ponto (ex: 1,70 ou 1.70)");
      temErro = true;
    }

    // Validação da altura
    if (alturaStr !== "" && (isNaN(altura) || altura <= 0)) {
      alert("Informe uma altura válida.");
      temErro = true;
    } else if (!isNaN(altura) && (altura < 1.00 || altura > 2.50)) {
      alert("Altura deve estar entre 1,00m e 2,50m.");
      temErro = true;
    }

    if (temErro) return;

    const imc = peso / (altura * altura);
    resultadoIMC.textContent = imc.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    let classificacao = "";

    if (imc < 18.5) {
      classificacao = "Abaixo do peso 😕";
    } else if (imc < 24.9) {
      classificacao = "Peso ideal! 👏😄";
    } else if (imc < 29.9) {
      classificacao = "Sobrepeso 🤔 Cuide-se!";
    } else if (imc < 34.9) {
      classificacao = "Obesidade grau 1 ⚠️ Bora mexer esse corpinho!";
    } else if (imc < 39.9) {
      classificacao = "Obesidade grau 2 😟 Procure um especialista!";
    } else {
      classificacao = "Obesidade grau 3 😢 Cuide da sua saúde com carinho!";
    }

    statusIMC.textContent = classificacao;

    boxClassificacao.classList.add("mostrar");

  });

  btnLimpar.addEventListener("click", function () {
    ding.play();
    pesoInput.value = "";
    alturaInput.value = "";
    resultadoIMC.textContent = "0";
    statusIMC.textContent = "0";

    boxClassificacao.classList.remove("mostrar");

  });
});

