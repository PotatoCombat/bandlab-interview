class NavBar {
    static pages = {
        POSTS: 'nav-posts',
        SAMPLES: 'nav-samples',
    }

    constructor(element) {
        this.element = element;
    }

    render() {
        this.element.innerHTML = `
            <a id=${NavBar.pages.POSTS} href="http://localhost:3000/posts">Posts</a>
            <a id=${NavBar.pages.SAMPLES} href="http://localhost:3000/samples">Samples</a>
        `
        return this.element;
    }

    selectPage(page) {
        this.element.querySelector(`#${page}`).className = 'selected';
    }
}

export default NavBar;
