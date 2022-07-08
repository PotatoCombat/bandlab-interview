const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const slot = document.querySelector('#slot');

function getSampleName(sample) {
    const index = sample.lastIndexOf('/') + 1;
    return sample.substring(index);
}

const samples = [
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3',
    'https://bigsoundbank.com/UPLOAD/ogg/0001.ogg',
    'https://bigsoundbank.com/UPLOAD/ogg/0002.ogg',
    'https://bigsoundbank.com/UPLOAD/ogg/0003.ogg',
    'https://bigsoundbank.com/UPLOAD/ogg/0004.ogg',
    'https://bigsoundbank.com/UPLOAD/ogg/0005.ogg',
    // 'https://static.bandlab.com/soundbanks/previews/new-wave-kit.ogg',
    // 'https://static.bandlab.com/soundbanks/previews/synth-organ.ogg',
]

samples.forEach(sample => {
    const label = document.createElement('p');
    label.innerHTML = getSampleName(sample);
    slot.appendChild(label);

    const audio = new Audio();
    audio.src = sample;
    audio.crossOrigin = '';
    audio.controls = true;

    const track = audioCtx.createMediaElementSource(audio);
    track.connect(audioCtx.destination);

    slot.appendChild(audio);
});
