import AudioPlayer from "../components/AudioPlayer.js";
import NavBar from "../components/NavBar.js";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const list = document.querySelector('#list');

const route = 'http://localhost:3000/samples';
const samples = [
    'new-wave-kit.ogg',
    'synth-organ.ogg',
]

let selectedPlayer = undefined;

async function onPlayerUpdated(player) {
    if (selectedPlayer === undefined) {
        selectedPlayer = player;
    } else if (selectedPlayer === player) {
        selectedPlayer = undefined;
    } else {
        await selectedPlayer.stop();
        selectedPlayer = player;
    }
}

const navBar = new NavBar(document.querySelector('#nav-bar'));
navBar.render();
navBar.selectPage(NavBar.pages.SAMPLES);

samples.forEach(sample => {
    list.appendChild(new AudioPlayer(audioCtx, route, sample, onPlayerUpdated).render())
});
