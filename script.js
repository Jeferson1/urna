let seuVotoPara = document.querySelector('.divisao-1-1 span');
let cargo = document.querySelector('.divisao-1-2 span');
let descricao = document.querySelector('.divisao-1-4');
let aviso = document.querySelector('.divisao-2');
let lateral = document.querySelector('.divisao-1-right');
let numeros = document.querySelector('.divisao-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let = votos = [];

comecarEtapa = () => {
  let etapa = etapas[etapaAtual];
  
  numeroHtml = '';
  numero = '';
  votoBranco = false;

  for (let i = 0; i < etapa.numeros; i++) {
    i === 0 
    ? numeroHtml += '<div class="numero pisca"></div>'
    : numeroHtml += '<div class="numero"></div>';
  }
  
  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}

atualizaInterface = () => {
  let etapa =  etapas[etapaAtual];
  let candidato = etapa.candidatos.filter(item => item.numero === numero ? true : false)
  console.log(candidato);

  if(candidato.length > 0){
    candidato = candidato[0];
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`

    let fotosHtml = '';

    for (let i in candidato.fotos) {
      if(candidato.fotos[i].small){
        fotosHtml += ` 
          <div class="divisao-1-imagem pequeno">
            <img src="/assets/images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}
          </div>
        `
      } else {
        fotosHtml += ` 
          <div class="divisao-1-imagem">
            <img src="/assets/images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}
          </div>
        `
      }
      
    }

    lateral.innerHTML = fotosHtml;

  } else {
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
  }
}

clicou = n => {
  let elementoNumero = document.querySelector('.numero.pisca');
  
  if(elementoNumero !== null){
    elementoNumero.innerHTML = n;
    numero = `${numero}${n}`;

    elementoNumero.classList.remove('pisca');

    elementoNumero.nextElementSibling !== null 
    ? elementoNumero.nextElementSibling.classList.add('pisca') : atualizaInterface();
  }
}

branco = () => {
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
    lateral.innerHTML = '';
}

corrige = () => comecarEtapa();

confirma = () => {
  let etapa =  etapas[etapaAtual];

  let votoConfirmado = false

  if(votoBranco){
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco'
    });
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero
    });
  }

  if(votoConfirmado){
    etapaAtual++;
    if(etapas[etapaAtual] !== undefined){
      comecarEtapa();
    } else {
      document.querySelector('.tela').innerHTML = `
        <div class="aviso--gigante pisca">FIM</div>
      `;
      console.log(votos);
    }
  }

}

comecarEtapa();