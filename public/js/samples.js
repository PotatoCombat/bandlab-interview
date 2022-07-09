const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const slot = document.querySelector('#slot');

const route = 'http://localhost:3000/samples/';
const samples = [
    'new-wave-kit.ogg',
    'synth-organ.ogg',
]

let players = {};
let selectedSample = undefined;

let audioSource = undefined;
const audioBuffers = {};

samples.forEach(sample => {
    const player = renderPlayer(sample);
    players[sample] = player
    slot.appendChild(player);
})

function renderPlayer(sample) {
    const player = document.createElement('div');
    player.className = 'audio-player';

    const icon = document.createElement('label');
    icon.className = 'audio-player-controls-label';
    player.appendChild(icon);

    const playButton = document.createElement('input');
    playButton.className = 'audio-player-controls';
    playButton.type = 'checkbox';
    playButton.checked = false;
    playButton.onclick = async() => toggleSample(playButton, sample);
    icon.appendChild(playButton);

    icon.appendChild(document.createElement('span'));

    const label = document.createElement('p');
    label.className = 'audio-label';
    label.innerHTML = sample;
    player.appendChild(label);

    return player;
}

function selectPlayer(player) {
    player.querySelector('input').checked = true;
    player.querySelector('.audio-label').setAttribute('highlight', true);
}

function deselectPlayer(player) {
    player.querySelector('input').checked = false;
    player.querySelector('.audio-label').removeAttribute('highlight');
}

async function toggleSample(playButton, sample) {
    await stopSample(playButton);
    if (selectedSample === sample) {
        return;
    }
    selectedSample = sample;
    await playSample(sample, () => {
        deselectPlayer(players[sample]);
        if (selectedSample === sample) {
            selectedSample = undefined;
        }
    });
    selectPlayer(players[sample]);
}

async function stopSample() {
    await audioSource?.stop();
    audioSource = undefined;
}

async function playSample(sample, onended) {
    audioSource = audioCtx.createBufferSource();
    audioSource.buffer = await loadSample(sample);
    audioSource.connect(audioCtx.destination);
    audioSource.start();
    audioSource.onended = onended;
}

async function loadSample(sample) {
    let buffer = audioBuffers[sample];
    if (buffer === undefined) {
        buffer = await fetch(`${route}${sample}`)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
            .then(decoded => {
                audioBuffers[sample] = decoded;
                return decoded;
            });
    }
    return buffer;
}
