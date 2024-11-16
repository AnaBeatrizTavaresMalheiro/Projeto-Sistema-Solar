import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { aumentar,diminuir,despausar, pausar,mudarperpectiva} from './solar_system.js';


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