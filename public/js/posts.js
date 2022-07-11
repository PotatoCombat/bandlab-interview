import NavBar from "../components/NavBar.js";
import Post from "../components/Post.js";
import Switch from "../components/Switch.js";

const list = document.querySelector('#list');
const headings = {
    user: new Switch(document.querySelector('#heading-user'), onSelectedHeading),
    title: new Switch(document.querySelector('#heading-title'), onSelectedHeading),
};

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const posts = [];

let selectedHeading;

function onSelectedHeading(heading) {
    if (selectedHeading !== heading && selectedHeading !== undefined) {
        selectedHeading.reset();
    }
    selectedHeading = heading;
    selectedHeading.toggle();
}

function sortPosts(comparator) {
    posts.sort((a, b) => {
        const result = comparator(a, b);
        return result !== 0 ? result : compareIds(a, b);
    }).forEach(post => list.appendChild(post.element));
}

function compareIds(a, b) {
    return a.id - b.id;
}

function compareUserIds(a, b) {
    return a.userId - b.userId;
}

function compareTitles(a, b) {
    return a.title.localeCompare(b.title);
}

function reverse(comparator) {
    return (a, b) => comparator(b, a);
}

function setupHeader(header, comparator) {
    header.addAction(() => sortPosts(comparator));
    header.addAction(() => sortPosts(reverse(comparator)));
    header.addAction(() => sortPosts(compareIds));
}

const navBar = new NavBar(document.querySelector('#nav-bar'));
navBar.render();
navBar.selectPage(NavBar.pages.POSTS);

setupHeader(headings.user, compareUserIds);
setupHeader(headings.title, compareTitles);

fetch(postsUrl)
    .then(response => response.json())
    .then(json => json.map(post => new Post(post)))
    .then(mappedPosts => mappedPosts
        .forEach(post => {
            posts.push(post);
            list.appendChild(post.render());
    }));
