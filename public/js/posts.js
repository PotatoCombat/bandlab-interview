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
                sortPosts(sortPosts(comparator));
                fsm.state = 'asc';
            }
        }
    }
    return fsm;
}

function sortPosts(comparator) {
    posts.sort(comparator)
        .forEach(post => tableBody.appendChild(post.node));
}

function compareIds(a, b) {
    return a.data[`id`] - b.data[`id`];
}

function compareUserIds(a, b) {
    const result = a.data[`userId`] - b.data[`userId`];
    return result === 0 ? compareIds(a, b) : result;
}

function compareTitles(a, b) {
    const result = a.data[`title`].localeCompare(b.data[`title`]);
    return result === 0 ? compareIds(a, b) : result;
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
