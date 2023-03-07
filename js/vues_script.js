
function vueConnexion() {
  vue = `<div class='mx-auto' style='max-width: 1140px;'>
    <div class='md:py-0 py-5 md:bg-transparent bg-white dark:bg-zinc-800 md:dark:bg-transparent md:flex flex-col justify-center md:h-screen space-y-6 items-center'>
      <div class='flex justify-center items-center'>
        <span class='text-white font-bold text-3xl'>CONNEXION</span>
      </div>
      <div class='md:bg-white md:shadow-lg md:rounded md:w-3/4'>
        <div class='dark:bg-zinc-800 dark:text-white'>
          <div class='md:flex md:py-8 md:px-0 px-6 justify-center'>
            <form id='form-login' action='login' class='md:px-16 px-2 md:py-3 py-12 md:w-3/4 md:border-b-0 border-b' method='POST'>
              <h2 class='text-2xl font-semibold mb-4 whitespace-nowrap'>Connectez-vous via email :</h2>
              <div class='w-full flex flex-col space-y-5 pt-14'>
                <div class='flex flex-col space-y-1 flex-1 relative pb-10'>
                  <label for='email' class='font-semibold'>Email</label>
                  <input type='email' name='email' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Email' REQUIRED />
                </div>
                <div class='mb-4'>
                  <label for='pwd' class='mb-2 flex justify-between items-center'>
                    <span class='font-semibold'>Mot de passe</span>
                    <a class='text-primary underline' href='#connexion'>Mot de passe oublié ?
                    </a>
                  </label>
                  <div class='relative flex flex-col'>
                    <input type='password' name='pwd' class='block dark:bg-zinc-700 dark:border-zinc-900 dark:text-white p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Password' min-length='8' max-length='50' REQUIRED />
                  </div>
                  <span class='text-xs'>8 carac. min & 50 max &nbsp;&nbsp; | &nbsp;&nbsp; 1 majuscule & 1 minuscule min &nbsp;&nbsp; | &nbsp;&nbsp; 1 carac. spéc. & 1 chiffre min</span>
                </div>
                <div class='flex justify-end pt-10'>
                  <input type='submit' id='logInForm' class='cursor-pointer px-4 py-2 rounded flex space-x-2 hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 dark:hover:from-white/5 dark:hover:to-white/10 items-center text-white bg-[#335bff]' value='Connexion' />
                </div>
                <div id='logInMsg'></div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>`;
  return vue;
}

function vueInscription() {
  vue = `
  <div class='mx-auto pt-8' style='max-width: 1140px;'>
    <div class='md:pt-[6rem] pt-5 md:bg-transparent bg-white dark:bg-zinc-800 md:dark:bg-transparent md:flex flex-col justify-center space-y-6 items-center'>
      <div class='flex justify-center items-center'>
        <span class='text-white font-bold text-3xl'>INSCRIPTION</span>
      </div>
      <div class='md:bg-white md:shadow-lg md:rounded md:w-3/4'>
        <div class='dark:bg-zinc-800 dark:text-white'>
          <div class='md:flex md:pt-8 md:px-0 px-6 justify-center'>
          
            <form id='form-signup' action='signup' class='md:px-16 px-2 md:py-3 py-12 md:w-3/4' method='POST'>
              <h2 class="text-2xl font-semibold mb-4 whitespace-nowrap">Entrez les informations suivantes :</h2>
              <div class="w-full flex flex-col space-y-5">
                <div class='flex flex-col space-y-1 flex-1 relative'>
                  <label for='email' class='font-semibold'>Votre email</label>
                  <input type='email' name='email' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Your email' REQUIRED />
                </div>
                <div class='flex flex-col space-y-1 flex-1 relative'>
                  <label for='last_name' class='font-semibold'>Votre Nom</label>
                  <input type='text' name='last_name' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Your last name' REQUIRED />
                </div>
                <div class='flex flex-col space-y-1 flex-1 relative'>
                  <label for='first_name' class='font-semibold'>Votre Prénom</label>
                  <input type='text' name='first_name' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Your first name' REQUIRED />
                </div>
                <div class='mb-4'>
                  <label for='pwd' class='mb-2 flex justify-between items-center'>
                    <span class='font-semibold'>Choisir un mot de passe</span>
                  </label>
                  <div class='relative flex flex-col'>
                    <input type='password' name='pwd' class='block dark:bg-zinc-700 dark:border-zinc-900 dark:text-white p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Password' min-length='8' max-length='50' REQUIRED />
                  </div>
                  <span class='text-xs'>8 carac. min & 50 max &nbsp;&nbsp; | &nbsp;&nbsp; 1 majuscule & 1 minuscule min &nbsp;&nbsp; | &nbsp;&nbsp; 1 carac. spéc. & 1 chiffre min</span>
                </div>
                <div class='mb-4'>
                  <label for='pwdConfirm' class='mb-2 flex justify-between items-center'>
                    <span class='font-semibold'>Confirmez le mot de passe</span>
                  </label>
                  <div class='relative flex flex-col'>
                    <input type='password' name='pwdConfirm' class='block dark:bg-zinc-700 dark:border-zinc-900 dark:text-white p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Confirm Password' min-length='8' max-length='50' REQUIRED />
                  </div>
                  <span class='text-xs'>8 carac. min & 50 max &nbsp;&nbsp; | &nbsp;&nbsp; 1 majuscule & 1 minuscule min &nbsp;&nbsp; | &nbsp;&nbsp; 1 carac. spéc. & 1 chiffre min</span>
                </div>
                <div class='flex justify-end'>
                  <input type='submit' id='signUpForm' class='cursor-pointer px-4 py-2 rounded flex space-x-2 hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 dark:hover:from-white/5 dark:hover:to-white/10 items-center text-white bg-[#335bff]' value='Inscription' />
                </div>
                <div id='signUpMsg'></div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  return vue;
}

function vueCreateApp() {
  vue = `
  <div class='mx-auto pt-8' style='max-width: 1140px;'>
    <div class='md:pt-[8rem] py-5 md:bg-transparent bg-white dark:bg-zinc-800 md:dark:bg-transparent md:flex flex-col justify-center space-y-6 items-center'>
      <div class='flex justify-center items-center'>
        <span class='text-white font-bold text-3xl'>CRÉATION D'APPLICATION</span>
      </div>
      <div class='md:bg-white md:shadow-lg md:rounded md:w-3/4'>
        <div class='dark:bg-zinc-800 dark:text-white'>
          <div class='md:flex md:py-8 md:px-0 px-6 justify-center'>

            <form id='form-create-app' action='createApp' class='md:px-16 px-2 md:py-3 py-12 md:w-3/4' method='POST'>
            <h2 class='text-2xl font-semibold mb-4 whitespace-nowrap pb-7'>Créer une nouvelle application :</h2>
                <div class='mb-4'>
                  <div class='relative flex flex-col'>
                    <label for='title' class='font-semibold'>Nommez votre application</label>
                    <input type='text' name='title' class='block dark:bg-zinc-700 dark:border-zinc-900 dark:text-white p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Application name' min-length='4' max-length='100' REQUIRED />
                  </div>
                </div>
                <div class='mb-4'>
                  <div class='relative flex flex-col pt-7'>
                    <label for='appdesc' class='font-semibold'>Descriptif de l'application</label>
                    <textarea name='appdesc' class='block dark:bg-zinc-700 dark:border-zinc-900 dark:text-white p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' rows='3' cols='33' min-length='2' REQUIRED >Description</textarea>
                  </div>
                </div>
                <div class='flex justify-end pt-7'>
                  <input type='submit' id='createAppForm' class='cursor-pointer px-4 py-2 rounded flex space-x-2 hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 dark:hover:from-white/5 dark:hover:to-white/10 items-center text-white bg-[#335bff]' value="Créer l'application" />
                </div>
                <div id='createAppMsg'></div>
              </div>
            </form>
          
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  return vue;
}

function vueUploadAppIcon(data) {
  vue = `
  <div class='mx-auto pt-8' style='max-width: 1140px;'>
    <div class='md:pt-[8rem] py-5 md:bg-transparent bg-white dark:bg-zinc-800 md:dark:bg-transparent md:flex flex-col justify-center space-y-6 items-center'>
      <div class='flex justify-center items-center'>
        <span class='text-white font-bold text-3xl'>ICÔNE D'APPLICATION</span>
      </div>
      <div class='md:bg-white md:shadow-lg md:rounded md:w-3/4'>
        <div class='dark:bg-zinc-800 dark:text-white'>
          <div class='md:flex md:py-8 md:px-0 px-6 justify-center'>

            <form id='form-upload-app-icon' action='./php/upload_app_icon.php' class='md:px-16 px-2 md:py-3 py-12 md:w-3/4' method='POST' enctype='multipart/form-data'>
            <h2 class='text-2xl font-semibold mb-4 whitespace-nowrap'>Téléchargez votre icône :</h2>
              <div class='w-full flex flex-col space-y-5 pt-8'>
                <div class='flex flex-col space-y-1 flex-1 relative pb-7'>
                  <label for='appicon' class='font-semibold'>Téléchargez votre icône</label>
                  <input id='appicon' type='file' name='${data}' accept='.jpg, .png, .jpeg, .gif, .svg' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Upload icon' value='400000' />
                </div>
                <div class='flex justify-end pt-7'>
                  <input type='submit' name='submit' class='cursor-pointer px-4 py-2 rounded flex space-x-2 hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 dark:hover:from-white/5 dark:hover:to-white/10 items-center text-white bg-[#335bff]' value='Valider' />
                </div>
                <div id='uploadIconMsg'></div>
              </div>
            </form>
          
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  return vue;
}

function vueGetAppsSuccess(app) {
  if (app === null) {
    vue = `
    <div id='container' class='flex flex-row flex-wrap mx-auto min-w-full'>
      <h2 class='text-2xl text-white font-semibold mb-4 whitespace-nowrap absolute top-28 right-1/2 left-auto'>LISTE DE VOS APPLICATIONS :</h2>
      <div class='mx-auto relative top-48 flex flex-col min-w-full items-center'>
        <div class='dark:bg-zinc-800 dark:text-white px-2 md:border-b-0 border-b md:flex py-4 w-10/12 mb-2'>
          <span class='block text-lg text-center basis-1/2'>Titre de l'application</span>
          <span class='block text-lg text-center basis-5/6'>Description de l'application</span>
          <span class='block text-lg text-center basis-5/6'>Date de création</span>
          <span class='block text-lg text-center basis-1/2'>Gestion</span>
        </div>
      </div>
    </div>
    `;
  }
  else {
    vue = `
    <div class='mx-auto relative top-48 flex flex-col min-w-full items-center'>
      <div class='dark:bg-zinc-800 dark:text-white px-2 md:border-b-0 border-b md:flex py-4 w-10/12 mb-2'>
        <img width='100' heigth ='100' src=${app.img_link} alt='app_icon'>
        <a href=${app.title} class='text-2xl font-semibold pl-4 whitespace-nowrap w-1/5'><h3>${app.title}
        </h3></a>
        <div class='flex-1 relative text-start w-1/3'>${app.description}</div>
        <div class='flex-1 relative text-center italic w-1/4'>Created at</br>${app.created_at}</div>
        <div class='flex flex-1 justify-end'>
          <input type='submit' id='appID_${app.id_app}' class='app_gestion cursor-pointer px-4 py-2 rounded flex flex-col space-x-2 hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 dark:hover:from-white/5 dark:hover:to-white/10 items-center text-white bg-[#335bff]' value="Gérer l'application" />
        </div>
        <div id='displayAppMsg_${app.id_app}'></div>
      </div>
    </div>
    `;
  }
  return vue;
}

function vueOptions(option) {
  vue = `<option value=''>-- Choose a ${option} --</option>`;
  return vue;
}

function vueOptionsClose(data, option) {
  if (option === 'Role') {
    vue = `<option value='${data.id_role}'>${data.role}</option>`;
  }
  else if (option === 'Member') {
    vue = `<option value='${data.id_user}'>${data.first_name} ${data.last_name} | ${data.email}</option>`;
  }
  return vue;
}

function vueManageApp(data, roles, users) {
    vue = `
    <div id='container' class='dark:bg-zinc-800 dark:text-white mx-auto py-8 relative top-36 flex flex-col justify-center items-center' style='max-width: 1000px; min-width: 800px;'>
      <h3 class='text-white font-bold text-2xl font-semibold mb-4 whitespace-nowrap'>Application : ${data.title}</h3>
      <form id='manage-app' action='manage' class='w-3/4 md:px-16 px-2 md:py-3 py-12' method='POST'>
        <div class="w-full flex flex-col space-y-5">
          <div class='flex flex-col space-y-1 flex-1 relative'>
            <label for='title' class='font-semibold'>*Changer le titre</label>
            <textarea name='title' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block pt-4 pb-0 px-4  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' rows='1' min-length='4' max-length='100' REQUIRED>${data.title}</textarea>
          </div>
          <div class='flex flex-col space-y-1 flex-1 relative'>
            <label for='description' class='font-semibold'>*Changer la description</label>
            <textarea name='description' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block pt-2 pb-0 px-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' rows='2' min-length='2' REQUIRED>${data.description}</textarea>
          </div>
          <div class='flex flex-col space-y-1 flex-1 relative'>
            <label for='content' class='hidden font-semibold'>Contenu</label>
            <textarea name='content' class='hidden dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block pt-2 pb-0 px-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' rows='2' min-length='2'>${data.content}</textarea>
          </div>
          <div class='flex flex-col space-y-1 flex-1 relative'>
            <label for='role' class='font-semibold'>Choisir un rôle à assigner</label>
            <select type='select' name='role' class='block dark:bg-zinc-700 dark:border-zinc-900 dark:text-white p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary'>${roles}</select>
          </div>
          <div class='flex flex-col space-y-1 flex-1 relative'>
            <label for='user' class='font-semibold'>Choisir le membre auquel assigner ce rôle</label>
            <select type='select' name='user' class='block dark:bg-zinc-700 dark:border-zinc-900 dark:text-white p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary'>${users}</select>
          </div>
          <div class='flex justify-end'>
            <input type='submit' id='submitManageApp' class='cursor-pointer px-4 py-2 rounded flex space-x-2 hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 dark:hover:from-white/5 dark:hover:to-white/10 items-center text-white bg-[#335bff]' value='Valider les changements' />
          </div>
          <div id='manageAppMsg' class='italic'>*champs obligatoires</div>
        </div>
      </form>
    </div>
    `;
  return vue;
}