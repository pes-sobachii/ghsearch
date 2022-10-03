const input = document.querySelector('.header__input')
const submit = document.querySelector('.header__button')
const profileMain = document.querySelector('.basic-profile__container')
const profileSecondary = document.querySelector('.tables-profile__container')
const profileRepos = document.querySelector('.repos-profile__container')
const startPlug = document.querySelector('.start-message')

submit.addEventListener('click', submitHandler)

function submitHandler(e) {
   e.preventDefault()
   const query = input.value
   getProfile(query)
}

async function getProfile(username) {
   try {
      let res = await fetch('https://api.github.com/users/' + username)
      let repos = await fetch('https://api.github.com/users/' + username + '/repos')
      res = await res.json()
      repos = await repos.json()
      if (!res.ok || !repos.ok) {
         throw new Error(`Error! status: ${res.status}`);
      }
      setData(res, repos)
   } catch (err) {
      startPlug.innerHTML = '<p>Query is incorrect. Please try again</p>'
   }
   
}

function setData(data, repos) {
   input.value = ''
   
   startPlug.style.display = 'none'

   profileMain.innerHTML = `
   <div class="basic-profile__info">
            <h2 class="basic-profile__nickname">${data.login}</h2>
            <ul class="basic-profile__info-list">
               <li class="basic-profile__name"><span>Name: </span>${data.name ? data.name : 'no info'}</li>
               <li class="basic-profile__location"><span>Location: </span>${data.location ? data.location : 'no info'}</li>
               <li class="basic-profile__company"><span>Company: </span>${data.company ? data.company : 'no info'}</li>
               <li class="basic-profile__email"><span>Email: </span>${data.email ? data.email : 'no info'}</li>
               <li class="basic-profile__bio"><span>Bio: </span>${data.bio ? data.bio : 'no info'}</li>
            </ul>
         </div>
         <div class="basic-profile__avatar">
            <img src=${data.avatar_url ? data.avatar_url : 'no info'} alt="">
         </div>
   `
   profileSecondary.innerHTML = `
   <div class="tables-profile__fraction"><p>Followers</p><span>${data.followers}</span></div>
   <div class="tables-profile__fraction"><p>Following</p><span>${data.following}</span></div>
   <div class="tables-profile__fraction"><p>Repos</p><span>${data.public_repos}</span></div>`

   let reposString = ``

   repos.forEach( repo => {
      reposString += `
      <div class="repos-profile__item">
         <h3 class="repos-profile__name">${repo.name}</h3>
         <ul class="repos-profile__info">
            <li class="repos-profile__stargazers">Created at: ${repo.created_at.slice(0,10)}</li>
            <li class="repos-profile__language">Language: ${repo.language ? repo.language : 'no data'}</li>
            <li class="repos-profile__description">Description: ${repo.description ? repo.description : 'no data'}</li>
         </ul>
      </div>
      `
   })

   profileRepos.innerHTML = reposString
}