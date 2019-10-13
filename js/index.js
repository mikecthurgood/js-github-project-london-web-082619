window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('github-form')
    const users = document.getElementById('user-list')
    const repos = document.getElementById('repos-list')
    githubQueryUrl = 'https://api.github.com/search/users?q='
    githubUsersUrl = 'https://api.github.com/users/'

    form.addEventListener('submit', searchGithub)

    function searchGithub(e) {
        e.preventDefault();
        const searchQuery = e.target[0].value;
        getUsers(searchQuery);
        getRepos(searchQuery);
    }
     
    function getUsers(user) {
        fetch(`${githubQueryUrl}${user}`, {
            headers: {
              "Accept": "application/vnd.github.v3+json"
            }
          })
        .then(resp => resp.json())
        .then(json => json.items.forEach(user => {
            const userAvatar = user.avatar_url
            const userName = user.login
            const userUrl = user.html_url

            createUser(userAvatar, userName, userUrl)
            })
        )
    }

    function getRepos(user) {
        fetch(`${githubUsersUrl}${user}/repos`, {
            headers: {
              "Accept": "application/vnd.github.v3+json"
            }
          })
        .then(resp => resp.json())
        .then(json => json.forEach(repo => {
            const repoName = repo.full_name;
            const repoAddress = repo.html_url;
            createRepoListItem(repoName, repoAddress)
            })
        )
    }

    function createUser(avatar, name, url) {
        const listItem = document.createElement('li')
        const image = document.createElement('img')
        const h2 = document.createElement('h2')
        const anchor = document.createElement('a')
        const br = document.createElement('br')
        image.src = avatar
        anchor.href = url
        anchor.innerText = name
        h2.appendChild(anchor)
        listItem.appendChild(image)
        listItem.appendChild(br)
        listItem.appendChild(h2)
        users.appendChild(listItem)
    }

    function createRepoListItem(name, url) {
        const listItem = document.createElement('li')
        const p = document.createElement('p')
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.innerText = name
        p.appendChild(anchor)
        listItem.appendChild(p)
        repos.appendChild(listItem)
    }

})