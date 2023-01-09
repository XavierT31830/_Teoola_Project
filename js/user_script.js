
AppList.addEventListener('click', () => getUserApps(sessionStorage.id_user));
CreateApp.addEventListener('click', () => createApp());

const UrlHash = window.location.hash;
let title;

checkUrlHash(UrlHash, title);

// CHECK URL HASH //
function checkUrlHash(urlHash, title) {
  if (urlHash == '#appcreated' || urlHash == '#uploaderrors' || urlHash == '#uploadfail') {
    title = sessionStorage.appTitle;
    uploadAppIcon(title);
    let uploadIconMsg = document.getElementById('uploadIconMsg');
    setTimeout(() => {
      if (urlHash == '#appcreated') {
        uploadIconMsg.innerHTML = `Image correctly uploaded!`;
        setTimeout(() => {
          sessionStorage.removeItem('appTitle');
          window.location.href = './';
        }, '3000');
      }
      if (urlHash == '#uploaderrors') {
        uploadIconMsg.innerHTML = `File extension is not allowed (jpg, png, gif or svg)<br/>or exceeds maximum size (10MB)`;
      }
      if (urlHash == '#uploadfail') {
        uploadIconMsg.innerHTML = `An error occurred.<br/>Please contact the administrator.`;
      }
    }, '300');
  }
  if (urlHash == '#app_list') {
    return `${sessionStorage.fname}'s apps list`;
  }
  if (urlHash == '#app_list_refresh') {
    window.location.href = '#app_list';
    getUserApps(sessionStorage.id_user);
  }
}

// FUNCTIONS //
function createApp() {
  window.location.hash = '#create_app';
  removeMainDisplay();

  Main.innerHTML = `
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

  let action = '';
  let func;

  document.getElementById('form-create-app').addEventListener('submit', function (e) {
    e.preventDefault();
    action = 'createApp';
    func = createAppSuccess;
    let data = new FormData(e.target).entries();
    let formData = Object.fromEntries(data);
    formData.id_user = parseInt(sessionStorage.id_user);
    sendCnxData(formData, action, func);
  });
}

function getUserApps(id_user) {
  window.location.hash = '#app_list';
  removeMainDisplay();
  let data = {};
  let action = 'getUserApps';
  let func = getUserAppsSuccess;
  data.id_user = id_user;
  sendCnxData(data, action, func);
}

function getRoles() {
  let data = {};
  let action = 'getRoles';
  let func = getRolesSuccess;
  sendCnxData(data, action, func);
}

function getUsers() {
  let data = {};
  let action = 'getUsers';
  let func = getUsersSuccess;
  sendCnxData(data, action, func);
}

// TOOLS //
function uploadAppIcon(data) {
  removeMainDisplay();

  Main.innerHTML = `
  <div class='mx-auto pt-8' style='max-width: 1140px;'>
    <div class='md:pt-[8rem] py-5 md:bg-transparent bg-white dark:bg-zinc-800 md:dark:bg-transparent md:flex flex-col justify-center space-y-6 items-center'>
      <div class='flex justify-center items-center'>
        <span class='text-white font-bold text-3xl'>ICÔNE D'APPLICATION</span>
      </div>
      <div class='md:bg-white md:shadow-lg md:rounded md:w-3/4'>
        <div class='dark:bg-zinc-800 dark:text-white'>
          <div class='md:flex md:py-8 md:px-0 px-6 justify-center'>

            <form id='form-upload-app-icon' action='./php/upload.app.icon.php' class='md:px-16 px-2 md:py-3 py-12 md:w-3/4' method='POST' enctype='multipart/form-data'>
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
}

function createAppsListeners(allApps) {
  for (elt of allApps) {
    let app = elt.id.split('_');
    let idApp = app[1]
    elt.addEventListener('click', () => manageApp(idApp, undefined, undefined));
  }
}

// SUCCESS //
function createAppSuccess(resp, displayMsg) {
  if (resp.msg === undefined) {
    displayMsg.innerHTML = `${resp}`;
  }
  else {
    displayMsg.innerHTML = `${resp.msg}`;
    if (resp.msg === `New application correctly added!`) {
      setTimeout(() => {
        sessionStorage.appTitle = resp.title;
        return uploadAppIcon(resp.title);
      }, '1500');
    }
  }
}

function getUserAppsSuccess(data, displayMsg) {
  console.log(data);
  if (data != null || data != undefined) {
    let urlRefresh = window.location.hash;
    if (urlRefresh == '#app_list') {
      displayMsg.innerHTML = checkUrlHash(urlRefresh);
      setTimeout(() => {
        DefaultMsg.innerHTML = '';
      }, '2500');
      window.location.href = '#app_list_refresh';
      let container = `<div id='container' class='flex flex-row flex-wrap mx-auto min-w-full'><h2 class='text-2xl text-white font-semibold mb-4 whitespace-nowrap absolute top-28 right-1/2 left-auto'>LISTE DE VOS APPLICATIONS :</h2></div>`
      Main.innerHTML += container;
      for (app of data) {
        let divApp = `
        <div class='mx-auto relative top-48 flex flex-col min-w-full items-center'>

          <div class='dark:bg-zinc-800 dark:text-white px-2 md:border-b-0 border-b md:flex py-4 w-10/12 mb-2'>
            <img width='100' heigth ='100' src=${app.img_link} alt='app_icon'>
            <a href=${app.title} class='text-2xl font-semibold pl-4 whitespace-nowrap w-1/4'><h3>${app.title}
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
        document.getElementById('container').innerHTML += divApp;
      }
      let allApps = document.getElementsByClassName('app_gestion');
      return createAppsListeners(allApps);
    }
  }
}

function getRolesSuccess(resp, displayMsg) {
  if (resp.msg === undefined) {
    displayMsg.innerHTML = `${resp}`;
  }
  else {
    setTimeout(() => {
      displayMsg.innerHTML = `${resp.msg}`;
    }, '1500');
    if (resp.msg === `Roles getted!`) {
      setTimeout(() => {
        displayMsg.innerHTML = '';
      }, '3100');
      if (window.location.hash == '#manage_app') {
        manageApp(Data, resp, undefined);
      }
      else {
        return resp;
      }
    }
  }
}

function getUsersSuccess(resp, displayMsg) {
  if (resp.msg === undefined) {
    displayMsg.innerHTML = `${resp}`;
  }
  else {
    setTimeout(() => {
      displayMsg.innerHTML = `${resp.msg}`;
    }, '1500');
    if (resp.msg === `Users getted!`) {
      setTimeout(() => {
        displayMsg.innerHTML = '';
      }, '4700');
      if (window.location.hash == '#manage_app') {
        manageApp(Data, DataRoles, resp);
      }
      else {
        return resp;
      }
    }
  }
}