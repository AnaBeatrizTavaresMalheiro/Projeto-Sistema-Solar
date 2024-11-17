import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// Construção da cena Sistema Solar
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const textureLoader = new THREE.TextureLoader();
const labelRenderer = new CSS2DRenderer();

// Tela de Fundo da cena
scene.background = textureLoader.load("texturas/fundo.jpg");

// Adaptar a construção da cena ao monitor utilizado
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adicionar elementos HTML para a cena CSS2DRenderer
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
document.body.appendChild(labelRenderer.domElement);

// Elementos HTML 
function criarLabel(name, cor_fonte) {
  const div = document.createElement('div');
  div.className = 'label';
  div.textContent = name;
  div.style.fontSize = '0.8em';
  div.style.color = cor_fonte;
  div.style.pointerEvents = 'none';
  return div;
}

function criarBotaoZoom() {
  const btnaumentar = document.createElement('button');
  btnaumentar.className = 'btn-aumentar';
  btnaumentar.style.width = '25px';
  btnaumentar.style.height = '25px';
  btnaumentar.style.backgroundImage = 'url("botoes/aumentar.png")'; // Caminho para a imagem
  btnaumentar.style.backgroundSize = 'cover';
  btnaumentar.style.backgroundColor = 'transparent'; // Remove fundo padrão
  btnaumentar.style.border = 'none';
  btnaumentar.style.cursor = 'pointer';
  btnaumentar.style.position = 'absolute';
  btnaumentar.style.top = '20px';
  btnaumentar.style.right = '20px';
  btnaumentar.style.padding = '0'; // Remove padding
  btnaumentar.style.margin = '0';  // Remove margin

  btnaumentar.onclick = aumentar;

  document.body.appendChild(btnaumentar); // Adiciona o botão ao body
}

function criarBotaoMinimizar() {
  const btndiminuir = document.createElement('button');
  btndiminuir.className = 'btn-aumentar';
  btndiminuir.style.width = '25px';
  btndiminuir.style.height = '25px';
  btndiminuir.style.backgroundImage = 'url("botoes/diminuir.png")'; // Caminho para a imagem
  btndiminuir.style.backgroundSize = 'cover';
  btndiminuir.style.backgroundColor = 'transparent'; // Remove fundo padrão
  btndiminuir.style.border = 'none';
  btndiminuir.style.cursor = 'pointer';
  btndiminuir.style.position = 'absolute';
  btndiminuir.style.top = '60px';
  btndiminuir.style.right = '20px';
  btndiminuir.style.padding = '0'; // Remove padding
  btndiminuir.style.margin = '0';  // Remove margin

  btndiminuir.onclick = diminuir;

  document.body.appendChild(btndiminuir); // Adiciona o botão ao body
}


let btndespausar_despausa;
function criarBotaoPausar_Despausar(statusdespausar, statuspausar) {
  if (btndespausar_despausa) {
    document.body.removeChild(btndespausar_despausa);
  }

  btndespausar_despausa = document.createElement('button');
  btndespausar_despausa.className = 'btn-aumentar';
  btndespausar_despausa.style.width = '25px';
  btndespausar_despausa.style.height = '25px';
  btndespausar_despausa.style.backgroundSize = 'cover';
  btndespausar_despausa.style.backgroundColor = 'transparent'; 
  btndespausar_despausa.style.border = 'none';
  btndespausar_despausa.style.cursor = 'pointer';
  btndespausar_despausa.style.position = 'absolute';
  btndespausar_despausa.style.top = '100px';
  btndespausar_despausa.style.right = '20px';
  btndespausar_despausa.style.padding = '0'; 
  btndespausar_despausa.style.margin = '0';  

  if (statusdespausar === true) {
    btndespausar_despausa.style.backgroundImage = 'url("botoes/play.png")';
    btndespausar_despausa.onclick = despausar;
  } else if (statuspausar === true) {
    btndespausar_despausa.style.backgroundImage = 'url("botoes/pause.png")'; 
    btndespausar_despausa.onclick = pausar;
  }

  document.body.appendChild(btndespausar_despausa); 
}

function criarBotaoCamera() {
  const btncamera = document.createElement('button');
  btncamera.className = 'btn-aumentar';
  btncamera.style.width = '26px';
  btncamera.style.height = '26px';
  btncamera.style.backgroundImage = 'url("botoes/camera.png")'; // Caminho para a imagem
  btncamera.style.backgroundSize = 'cover';
  btncamera.style.backgroundColor = 'transparent'; // Remove fundo padrão
  btncamera.style.border = 'none';
  btncamera.style.cursor = 'pointer';
  btncamera.style.position = 'absolute';
  btncamera.style.top = '140px';
  btncamera.style.right = '20px';
  btncamera.style.padding = '0'; // Remove padding
  btncamera.style.margin = '0';  // Remove margin

  btncamera.onclick = mudarperpectiva; // Define the click event handler

  document.body.appendChild(btncamera); // Adiciona o botão ao body
}



// Elementos ThreeJs
function criarElementos(nome, raio, hsegmentos, vsegmentos, posicao, textura, cor_fonte) {
  // Usando MeshLambertMaterial para que a luz afete o material, mas sem alterar muito a cor original
  const sphereGeometry = new THREE.SphereGeometry(raio, hsegmentos, vsegmentos);
  
  // Material com textura, permitindo sombras, mas mantendo a cor
  const sphereMaterial = new THREE.MeshLambertMaterial({
    map: textureLoader.load(textura), // Mantém a textura aplicada no material
    emissive: 0x000000, // Não emite luz própria, mantendo a cor original
    color: 0xffffff, // Cor base que não muda
    emissiveIntensity: 0.0, // Nenhuma emissão de luz
    roughness: 0.5,  // Suaviza o brilho, mas sem mudanças nas cores
    metalness: 0.2   // Pouco metalizado, evitando alteração de cor
  });

  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.position.set(...posicao);
  sphereMesh.userData = { distance: posicao[0] };
  sphereMesh.castShadow = true; // A esfera projeta sombras
  sphereMesh.receiveShadow = true; // A esfera recebe sombras
  scene.add(sphereMesh);

  // Criar Label
  const label = new CSS2DObject(criarLabel(nome, cor_fonte));
  label.position.set(0, -raio - 0.1, 0);
  sphereMesh.userData.label = label;
  scene.add(label);

  return sphereMesh;
}

// Criar luz pontual (Sol)
  const light = new THREE.PointLight(0xffffff, 250, 2000); // Luz amarela
light.position.set(0, 0, 0); // Posição do Sol
light.castShadow = true; // A luz também projeta sombra

// Configurar o mapa de sombras da luz
light.shadow.mapSize.width = 1024; // Resolução do mapa de sombras
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.1; // Distância mínima da câmera para sombras
light.shadow.camera.far = 2000; // Distância máxima ajustada ao alcance da luz
scene.add(light);

// Criar uma esfera para representar o Sol (não afetada pela luz, mas com emissão)
const solGeometry = new THREE.SphereGeometry(1, 32, 32); // Esfera de raio 1
const solMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load('texturas/sol.jpg'),
  emissive: 0xffaa00, // Emissão de luz amarela para o Sol
  emissiveIntensity: 1, // Intensidade do brilho do Sol
  color: 0xffcc00, // Cor do Sol (não afetada pela luz)
});

const sol = new THREE.Mesh(solGeometry, solMaterial);
sol.position.set(0, 0, 0); // Mesma posição da luz
sol.castShadow = true; // O Sol também projeta sombras
sol.receiveShadow = false; // O Sol não recebe sombras
scene.add(sol);





// Criar Planetas
const planetas = [
  criarElementos('Mercúrio', 0.1, 32, 32, [3, 0, 0], 'texturas/mercurio.jpg', 'white'),
  criarElementos('Vênus', 0.2, 32, 32, [5, 0, 0], 'texturas/venus.jpg', 'white'),
  criarElementos('Terra', 0.2, 32, 32, [7, 0, 0], 'texturas/terra.jpg', 'white'),
  criarElementos('Marte', 0.15, 32, 32, [9, 0, 0], 'texturas/marte.jpg', 'white'),
  criarElementos('Júpiter', 0.5, 32, 32, [11, 0, 0], 'texturas/jupiter.jpg', 'white'),
  criarElementos('Saturno', 0.45, 32, 32, [13, 0, 0], 'texturas/saturno.jpg', 'white'),
  criarElementos('Urano', 0.35, 32, 32, [15, 0, 0], 'texturas/urano.jpg', 'white'),
  criarElementos('Netuno', 0.35, 32, 32, [17, 0, 0], 'texturas/netuno.jpg', 'white'),
];

// Define velocidade de Rotação dos planetas
const velocidade_angular = [
  0.014,  // Mercurio 
  0.012,  // Venus
  0.010, // Terra
  0.006, // Marte
  0.006, // Jupiter
  0.004, // Saturno
  0.002, // Urano
  0.001  // Netuno
];

// Angulo de cada planeta
const angulos = [1, 2, 4, 6, 8, 10, 12, 14];

// Cena vista de cima
camera.position.set(0, 20, 0);
camera.lookAt(0, 0, 0);


const rotacaoOriginalY = camera.rotation.y;
var animar = true;
let rotacaoDesejadaY = 0;  
const rotacaoVelocidade = 0.05;

// Movimentação planetas
function animate() {
  requestAnimationFrame(animate);
  
  planetas.forEach((planeta, index) => {
      if (animar) {
          const distance = planeta.userData.distance;
          angulos[index] += velocidade_angular[index];
          planeta.position.x = distance * Math.cos(angulos[index]);
          planeta.position.z = distance * Math.sin(angulos[index]);
      }
      
      // Atualiza a posição do label
      const label = planeta.userData.label;
      label.position.set(planeta.position.x, planeta.position.y - planeta.geometry.parameters.radius - 0.7, planeta.position.z);
      planeta.rotation.y += 0.01; // movimentação dos planetas no próprio eixo
  });

  // Interpole a rotação da câmera para a rotação desejada
  camera.rotation.y += (rotacaoDesejadaY - camera.rotation.y) * rotacaoVelocidade;
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera); // Renderiza labels
}

// Adiciona o botão ao documento
criarBotaoZoom();
criarBotaoMinimizar();
criarBotaoPausar_Despausar(false, true);
criarBotaoCamera();

// Define velocidade de Rotação dos planetas
const posicoes = [
  [3, 0, 0],  // Mercurio 
  [5, 0, 0],  // Venus
  [7, 0, 0], // Terra
  [9, 0, 0], // Marte
  [11, 0, 0], // Jupiter
  [11, 0, 0], // Saturno
  [11, 0, 0], // Urano
  [11, 0, 0]  // Netuno
];

function escalaPadrao() {
  planetas.forEach((planeta, index) => {
    const posicao = posicoes[index];
    if (posicao) {
      planeta.position.set(...posicao);
    }
  });
}


function aumentar() {
  if (camera.position.x === 0 && camera.position.y === 0 && camera.position.z === 0) {
    planetas.forEach((planetas) => {
      planetas.position.z += 2;
    });
  }
  else{
  planetas.forEach((planetas) => {
    planetas.position.y += 3;
    sol.position.y += 0.5;
  });}
}

function diminuir() {
  if (camera.position.x === 0 && camera.position.y === 0 && camera.position.z === 0) {
    planetas.forEach((planetas) => {
      planetas.position.z -= 2;
    });
  }
  else{
    planetas.forEach((planetas) => {
      planetas.position.y -= 3;
      sol.position.y -= 0.5;
    });
  }
}


function despausar() {
  if(animar === false) {
  animar = true;
  criarBotaoPausar_Despausar(false,true)
 
}

}
function pausar() {
  if(animar == true){
  animar = false;
  criarBotaoPausar_Despausar(true,false)
}
}

function mudarperpectiva() {
  escalaPadrao();
  if (camera.position.x === 0 && camera.position.y === 0 && camera.position.z === 0) {
    camera.position.set(0, 20, 0);
  } else {
    camera.position.set(0, 0, 0);
  }
  camera.lookAt(0, 0, 0);
  rotacaoDesejadaY = 0;  
  rotacaoVelocidade = 0.05;
  camera.rotation.y = rotacaoOriginalY;
  
 
  
}

function movimentarCamera(){
document.addEventListener('keydown', function(event) {
  if (camera.position.x === 0 && camera.position.y === 0 && camera.position.z === 0) {
    if (event.key === 'ArrowLeft') {
        console.log('Tecla de seta para a esquerda pressionada!');
        rotacaoDesejadaY += 0.1; // Aumenta a rotação desejada
    } else if (event.key === 'ArrowRight') {
        console.log('Tecla de seta para a direita pressionada!');
        rotacaoDesejadaY -= 0.1; // Diminui a rotação desejada
    }}
});
}



animate();
movimentarCamera();

