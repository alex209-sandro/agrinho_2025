let cidade, campo;
let personagem;
let itensCidade = [];
let itensCampo = [];
let tempo = 60; // Tempo do jogo (em segundos)

function setup() {
  createCanvas(800, 400);
  
  // Inicializar o personagem
  personagem = new Personagem();
  
  // Inicializar itens
  for (let i = 0; i < 5; i++) {
    itensCidade.push(new Item(random(width / 2, width), random(50, height - 50), 'cidade'));
    itensCampo.push(new Item(random(width / 4), random(50, height - 50), 'campo'));
  }
  
  // Fundo dividido
  cidade = { x: width / 2, y: 0, w: width / 2, h: height };
  campo = { x: 0, y: 0, w: width / 2, h: height };
}

function draw() {
  background(200);
  
  // Desenhar o fundo
  fill(100, 200, 100); // cor do campo
  rect(campo.x, campo.y, campo.w, campo.h);
  
  fill(200, 100, 100); // cor da cidade
  rect(cidade.x, cidade.y, cidade.w, cidade.h);
  
  // Atualizar e mostrar os itens
  for (let i = itensCidade.length - 1; i >= 0; i--) {
    itensCidade[i].update();
    itensCidade[i].show();
    
    if (personagem.colideComItem(itensCidade[i])) {
      itensCidade.splice(i, 1); // Remove o item da cidade
    }
  }
  
  for (let i = itensCampo.length - 1; i >= 0; i--) {
    itensCampo[i].update();
    itensCampo[i].show();
    
    if (personagem.colideComItem(itensCampo[i])) {
      itensCampo.splice(i, 1); // Remove o item do campo
    }
  }
  
  // Desenhar o personagem
  personagem.update();
  personagem.show();
  
  // Mostrar o tempo
  fill(0);
  textSize(24);
  textAlign(RIGHT, TOP);
  text(`Tempo: ${tempo}s`, width - 10, 10);
  
  // Contagem regressiva do tempo
  if (frameCount % 60 == 0 && tempo > 0) {
    tempo--;
  }
  
  // Fim do jogo
  if (tempo <= 0) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Fim de Jogo!', width / 2, height / 2);
    noLoop(); // Para o jogo
  }
}

class Personagem {
  constructor() {
    this.x = 50;
    this.y = height / 2;
    this.size = 30;
    this.speed = 5;
  }
  
  update() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    
    // Limitar a movimentação dentro da tela
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
  
  show() {
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.size, this.size);
  }
  
  colideComItem(item) {
    let d = dist(this.x, this.y, item.x, item.y);
    return d < this.size / 2 + item.size / 2;
  }
}

class Item {
  constructor(x, y, tipo) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.tipo = tipo;
  }
  
  update() {
    // Aqui você pode adicionar algum tipo de movimento ou comportamento para os itens
  }
  
  show() {
    if (this.tipo === 'cidade') {
      fill(255, 0, 0);
    } else {
      fill(0, 255, 0);
    }
    ellipse(this.x, this.y, this.size, this.size);
  }
}
