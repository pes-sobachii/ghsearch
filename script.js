const input = document.querySelector('.header__input')
const submit = document.querySelector('.header__button')
const profileMain = document.querySelector('.basic-profile__container')
const profileSecondary = document.querySelector('.tables-profile__container')
const profileRepos = document.querySelector('.repos-profile__container')

submit.addEventListener('click', submitHandler)

function submitHandler(e) {
   e.preventDefault()
   const query = input.value
   getProfile(query)
}

async function getProfile(username) {
   let res = await fetch('https://api.github.com/users/' + username)
   let repos = await fetch('https://api.github.com/users/' + username + '/repos')
   res = await res.json()
   repos = await repos.json()
   setData(res, repos)
}

function setData(data, repos) {
   console.log(data);
   profileMain.innerHTML = `
   <div class="basic-profile__info">
            <h2 class="basic-profile__nickname">${data.login}</h2>
            <ul class="basic-profile__info-list">
               <li class="basic-profile__name">Name: ${data.login ? data.login : 'no info'} </li>
               <li class="basic-profile__location">Location: ${data.location ? data.location : 'no info'}</li>
               <li class="basic-profile__company">Company: ${data.company ? data.company : 'no info'}</li>
               <li class="basic-profile__email">Email: ${data.email ? data.email : 'no info'}</li>
               <li class="basic-profile__bio">Bio: ${data.bio ? data.bio : 'no info'}</li>
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

   profileRepos
}