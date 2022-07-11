class AudioPlayer {
    static selectedAttr = 'highlight';
    static states = {
        PLAYING: Symbol('PLAYING'),
        STOPPED: Symbol('STOPPED'),
    }

    constructor(ctx, route, sample, onStateChanged) {
        this.ctx = ctx;
        this.route = route;
        this.sample = sample;
        this.onStateChanged = onStateChanged;
        this.state = AudioPlayer.states.STOPPED;
        this.src = undefined;
        this.buffer = undefined;
        this.element = undefined;
        this.controls = undefined;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'audio-player';

        const icon = document.createElement('label');
        icon.className = 'audio-player-controls-label';
        this.element.appendChild(icon);

        this.controls = document.createElement('input');
        this.controls.className = 'audio-player-controls';
        this.controls.type = 'checkbox';
        this.controls.checked = false;
        this.controls.onclick = async() => await this.toggle();
        icon.appendChild(this.controls);
        icon.appendChild(document.createElement('span'));

        const label = document.createElement('p');
        label.className = 'audio-label';
        label.innerHTML = this.sample;
        this.element.appendChild(label);

        return this.element;
    }

    async toggle() {
        switch (this.state) {
            case AudioPlayer.states.PLAYING:
                await this.stop();
                break;
            case AudioPlayer.states.STOPPED:
                await this.play();
                break;
        }
    }

    async play() {
        this.state = AudioPlayer.states.PLAYING;

        this.select();
        await this.onStateChanged(this);

        this.src = this.ctx.createBufferSource();
        this.src.buffer = await this.getBuffer();
        this.src.connect(this.ctx.destination);
        this.src.start();
        this.src.onended = async() => {
            if (this.state === AudioPlayer.states.PLAYING) {
                await this.stop();
            }
        }
    }

    async stop() {
        this.state = AudioPlayer.states.STOPPED;

        if (this.src === undefined) {
            return;
        }
        this.src.stop();
        this.src = undefined;

        this.deselect();
        await this.onStateChanged(this);
    }

    select() {
        this.element.querySelector('input').checked = true;
        this.element.querySelector('.audio-label').setAttribute(AudioPlayer.selectedAttr, true);
    }

    deselect() {
        this.element.querySelector('input').checked = false;
        this.element.querySelector('.audio-label').removeAttribute(AudioPlayer.selectedAttr);
    }

    async getBuffer() {
        if (this.buffer === undefined) {
            this.buffer = fetch(`${this.route}/${this.sample}`)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => this.ctx.decodeAudioData(arrayBuffer));
        }
        return this.buffer;
    }
}

export default AudioPlayer;
