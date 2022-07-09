let tableBody = document.querySelector('#slot tbody');
let posts = [];

function renderPost(post) {
    const row = tableBody.insertRow();
    row.className = `post`;

    const userCell = row.insertCell();
    userCell.innerHTML = post[`userId`];
    userCell.className = `post-user`;

    const contentCell = row.insertCell();
    contentCell.className = `post-content`;

    const titleCell = document.createElement('p');
    titleCell.innerHTML = post[`title`];
    titleCell.className = `post-title`;

    const bodyCell = document.createElement('p');
    bodyCell.innerHTML = post[`body`];
    bodyCell.className = `post-body`;

    contentCell.appendChild(titleCell);
    contentCell.appendChild(bodyCell);

    posts.push({
        data: post,
        node: row,
    });
}

function renderPosts(src, comparator) {
    fetch(src)
        .then(response => response.json())
        .then(json => comparator ? json.sort(comparator) : json)
        .then(posts => posts.forEach(renderPost));
}

function createTableHeaderFsm(comparator) {
    const fsm = {
        state: 'asc',
        actions: {
            asc: () => {
                sortPosts((a, b) => comparator(b, a));
                fsm.state = 'desc';
            },
            desc: () => {
                sortPosts(comparator);
                fsm.state = 'asc';
            }
        }
    }
    return fsm;
}

function sortPosts(comparator) {
    posts.sort((a, b) => {
        const result = comparator(a, b);
        return result !== 0 ? result : compareIds(a, b);
    }).forEach(post => tableBody.appendChild(post.node));
}

function compareIds(a, b) {
    return a.data[`id`] - b.data[`id`];
}

function compareUserIds(a, b) {
    return a.data[`userId`] - b.data[`userId`];
}

function compareTitles(a, b) {
    return a.data[`title`].localeCompare(b.data[`title`]);
}

const userHeader = createTableHeaderFsm(compareUserIds);
const titleHeader = createTableHeaderFsm(compareTitles);

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

document.querySelector('#th-user')
    .addEventListener('click', function() {
        userHeader.actions[userHeader.state]();
    });

document.querySelector('#th-title')
    .addEventListener('click', function() {
        titleHeader.actions[titleHeader.state]();
    });

renderPosts(postsUrl);
