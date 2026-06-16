// --- BASE DE DADOS DAS PERGUNTAS ---
// --- BASE DE DADOS DAS PERGUNTAS (Vovabulário Infantil Adaptado) ---
const perguntas = [
    {
        pergunta: "Qual é a velocidade máxima que uma trotinete elétrica pode dar?",
        opcoes: [
            { texto: "Apenas 15 km/h.", correta: false },
            { texto: "Até 25 km/h.", correta: true },
            { texto: "Super rápido, a 40 km/h!", correta: false }
        ]
    },
    {
        pergunta: "Por que deves usar sempre capacete quando andas de trotinete?",
        opcoes: [
            { texto: "Porque fica super bonito.", correta: false },
            { texto: "Para conseguir andar mais depressa.", correta: false },
            { texto: "Para proteger a cabeça em caso de queda.", correta: true }
        ]
    },
    {
        pergunta: "O que deves fazer mesmo antes de atravessar uma passadeira?",
        opcoes: [
            { texto: "Atravessar logo a correr.", correta: false },
            { texto: "Olhar só para um dos lados.", correta: false },
            { texto: "Parar e olhar bem para os dois lados!", correta: true }
        ]
    },
    {
        pergunta: "Qual é o sítio mais seguro para atravessara rua?",
        opcoes: [
            { texto: "Mesmo no meio da estrada.", correta: false },
            { texto: "A passar por entre os carros estacionados.", correta: false },
            { texto: "Em cima das riscas brancas da passadeira!", correta: true }
        ]
    },
    {
        pergunta: "Por que temos de ter muito cuidado e atenção com os peões?",
        opcoes: [
            { texto: "Porque eles podem precisar de atravessar a rua.", correta: true },
            { texto: "Porque eles correm mais do que os carros.", correta: false },
            { texto: "Porque eles servem para nos apontar o caminho.", correta: false }
        ]
    },
    {
        pergunta: "O que acontece se fores a mexer no telemóvel enquanto conduzes?",
        opcoes: [
            { texto: "Ficas com super super atenção.", correta: false },
            { texto: "Ficas distraído e podes magoar-te ou cair!", correta: true },
            { texto: "Consegues travar muito mais rápido.", correta: false }
        ]
    },
    {
        pergunta: "Por que é que obedecer aos sinais de trânsito é importante?",
        opcoes: [
            { texto: "Eles não servem para nada.", correta: false },
            { texto: "Estão lá só para enfeitar as ruas.", correta: false },
            { texto: "Ajudam a manter todas as pessoas em segurança!", correta: true }
        ]
    },
    {
        pergunta: "Como é que sabes que estás a andar a uma velocidade segura?",
        opcoes: [
            { texto: "Quando tens o controlo total da tua trotinete.", correta: true },
            { texto: "Quando vais o mais rápido que consegues.", correta: false },
            { texto: "Quando tentas andar à velocidade dos carros.", correta: false }
        ]
    },
    {
        pergunta: "O que pode acontecer se fores demasiado depressa na estrada?",
        opcoes: [
            { texto: "É impossível teres um acidente.", correta: false },
            { texto: "Fica muito mais fácil travar a tempo.", correta: false },
            { texto: "Podes perder o controlo, cair e magoar-te.", correta: true }
        ]
    },
    {
        pergunta: "Onde é que deves conduzir a tua bicicleta ou trotinete?",
        opcoes: [
            { texto: "Nas ciclovias e nos sítios certos para rodas.", correta: true },
            { texto: "Em qualquer passeio que esteja cheio de pessoas a andar.", correta: false },
            { texto: "No meio dos carros e sem olhar para os lados.", correta: false }
        ]
    }
];

// --- VARIÁVEIS DE CONTROLO DO QUIZ ---
let perguntaAtual = 0;
let acertos = 0;
let erros = 0;

// --- CRIAÇÃO DOS EFEITOS SONOROS (SFX) ---
// Certifica-te de ter estes ficheiros de som na tua pasta, ou o jogo dará erro na consola.
const somCerto = new Audio('audio_certo.mp3'); 
const somErrado = new Audio('audio_errado.mp3');

// --- ELEMENTOS DO FLUXO DO JOGO ---
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const menuContainer = document.getElementById('menuContainer');
const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('resultContainer');

const questionPhrase = document.querySelector('.question-phrase');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');

const totalAcertosTxt = document.getElementById('totalAcertos');
const totalErrosTxt = document.getElementById('totalErros');

// --- FUNÇÃO PARA CARREGAR UMA PERGUNTA NO ECRÃ ---
function carregarPergunta() {
    if (perguntaAtual < perguntas.length) {
        const dados = perguntas[perguntaAtual];
        
        // Atualiza o texto da pergunta
        questionPhrase.textContent = dados.pergunta;
        
        // Atualiza o texto dos 3 botões
        option1.querySelector('.option-text-kids').textContent = dados.opcoes[0].texto;
        option2.querySelector('.option-text-kids').textContent = dados.opcoes[1].texto;
        option3.querySelector('.option-text-kids').textContent = dados.opcoes[2].texto;
    } else {
        // Se as perguntas acabarem, mostra o ecrã final de resultados
        mostrarResultados();
    }
}

// --- FUNÇÃO DE FEEDBACK COM FLASH, SOM E TRANSIÇÃO ---
function aplicarFeedback(botao, indexOpcao) {
    const dadosPergunta = perguntas[perguntaAtual];
    const eCorreta = dadosPergunta.opcoes[indexOpcao].correta;
    const todasAsOpcoes = document.querySelectorAll('.kid-option-card');
    
    // Bloqueia cliques repetidos
    todasAsOpcoes.forEach(btn => btn.style.pointerEvents = 'none');

    if (eCorreta) {
        botao.classList.add('flash-correct');
        somCerto.play().catch(e => console.log("Erro ao tocar som certo"));
        acertos++;
    } else {
        botao.classList.add('flash-wrong');
        somErrado.play().catch(e => console.log("Erro ao tocar som errado"));
        erros++;
    }

    // Espera 1.2 segundos (dá tempo de ver o flash e ouvir o som) antes de mudar
    setTimeout(() => {
        botao.classList.remove('flash-correct', 'flash-wrong');
        
        perguntaAtual++; // Avança o contador para a próxima pergunta
        carregarPergunta(); // Carrega a nova pergunta
        
        // Devolve os cliques à criança
        todasAsOpcoes.forEach(btn => btn.style.pointerEvents = 'auto');
    }, 1200);
}

// --- CLIQUES NAS OPÇÕES DO QUIZ ---
option1.addEventListener('click', () => aplicarFeedback(option1, 0));
option2.addEventListener('click', () => aplicarFeedback(option2, 1));
option3.addEventListener('click', () => aplicarFeedback(option3, 2));

// --- BOTÕES DE FLUXO (COMEÇAR E RECOMEÇAR) ---
startBtn.addEventListener('click', function() {
    menuContainer.style.display = 'none';
    quizContainer.style.display = 'flex';
    perguntaAtual = 0;
    acertos = 0;
    erros = 0;
    carregarPergunta(); // Inicia a primeira pergunta
});

function mostrarResultados() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'flex';
    totalAcertosTxt.textContent = acertos;
    totalErrosTxt.textContent = erros;
}

restartBtn.addEventListener('click', function() {
    resultContainer.style.display = 'none';
    menuContainer.style.display = 'flex';
});

// ==========================================================================
// --- CÓDIGO DAS DEFINIÇÕES, MÚSICA E VOLUME (MANTIDO DO TEU ORIGINAL) ---
// ==========================================================================
const settingsBtn = document.getElementById('settingsBtn');
const quizSettingsBtn = document.getElementById('quizSettingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const infoBtn = document.getElementById('infoBtn');
const infoModal = document.getElementById('infoModal');
const closeInfoBtn = document.getElementById('closeInfoBtn');

settingsBtn.addEventListener('click', () => settingsModal.classList.add('open'));
quizSettingsBtn.addEventListener('click', () => settingsModal.classList.add('open'));
closeModalBtn.addEventListener('click', () => settingsModal.classList.remove('open'));

window.addEventListener('click', (event) => {
    if (event.target === settingsModal) settingsModal.classList.remove('open');
    if (event.target === infoModal) infoModal.classList.remove('open');
});

infoBtn.addEventListener('click', () => infoModal.classList.add('open'));
closeInfoBtn.addEventListener('click', () => infoModal.classList.remove('open'));

const bgMusic = document.getElementById('bgMusic');
const musicaSwitch = document.getElementById('musicaSwitch'); 
const volumeSlider = document.querySelector('.volume-slider');

musicaSwitch.addEventListener('change', function() {
    if (this.checked) {
        bgMusic.play().catch(error => console.log("Bloqueio de som automático"));
    } else {
        bgMusic.pause();
    }
});

volumeSlider.addEventListener('input', function() {
    bgMusic.volume = this.value / 100;
});

musicaSwitch.checked = false;
bgMusic.volume = volumeSlider.value / 100;