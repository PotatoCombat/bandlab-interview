class Switch {
    constructor(element, onSelected) {
        this.element = element;
        this.element.onclick = () => onSelected(this);
        this.actions = [];
        this.reset();
    }

    addAction(action) {
        this.actions.push(action);
    }

    setState(state) {
        this.state = state;
        this.element.setAttribute('state', state);
    }

    reset() {
        this.state = -1;
        this.element.removeAttribute('state');
    }

    toggle() {
        this.setState((this.state + 1) % this.actions.length);
        const fn = this.actions[this.state];
        if (fn !== undefined) {
            fn();
        }
    }
}

export default Switch;
