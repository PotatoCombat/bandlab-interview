class Post {
    constructor(post) {
        this.id = post.id;
        this.userId = post.userId;
        this.title = post.title;
        this.body = post.body;
        this.element = undefined;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = `post`;

        const userIcon = document.createElement('p');
        userIcon.innerHTML = this.userId;
        userIcon.className = `post-user centredText`;
        this.element.appendChild(userIcon);

        const content = document.createElement('div');
        content.className = `post-content`;
        this.element.appendChild(content);

        const titleText = document.createElement('p');
        titleText.innerHTML = this.title;
        titleText.className = `post-title`;
        content.appendChild(titleText);

        const bodyText = document.createElement('p');
        bodyText.innerHTML = this.body;
        bodyText.className = `post-body`;
        content.appendChild(bodyText);

        return this.element;
    }
}

export default Post;
