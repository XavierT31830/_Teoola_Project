
AppList.addEventListener('click', () => userApps(sessionStorage.id_user));
CreateApp.addEventListener('click', () => createApplication());

const UrlHash = window.location.hash;
let title;

checkUrlHash(UrlHash, title);

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
    userApps(sessionStorage.id_user);
  }
}

function createApplication() {
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

            <form id='form-create-app' action='createapp' class='md:px-16 px-2 md:py-3 py-12 md:w-3/4' method='POST'>
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
                    <textarea name='appdesc' class='block dark:bg-zinc-700 dark:border-zinc-900 dark:text-white p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' rows='3' cols='33' REQUIRED >Description</textarea>
                  </div>
                </div>
                <div class='flex justify-end pt-7'>
                  <input type='submit' id='createappform' class='cursor-pointer px-4 py-2 rounded flex space-x-2 hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 dark:hover:from-white/5 dark:hover:to-white/10 items-center text-white bg-[#335bff]' value="Créer l'application" />
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
    action = 'createapp';
    func = createAppSuccess;
    let data = new FormData(e.target).entries();
    let formData = Object.fromEntries(data);
    formData.id_user = parseInt(sessionStorage.id_user);
    sendCnxData(formData, action, func);
  });
}

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

function userApps(id_user) {
  removeMainDisplay();
  let data = {};
  let action = 'getUserApps';
  let func = getUserAppsSuccess;
  data.id_user = id_user;
  sendCnxData(data, action, func);
}

function createAppsListeners(allApps) {
  for (elt of allApps) {
    let app = elt.id.split('_');
    let idApp = app[1]
    elt.addEventListener('click', () => manageApp(idApp));
  }
}

function manageApp(idApp) {
  removeMainDisplay();
  window.location.href = '#manage_app';
  let data = {};
  let action = 'getApp';
  let func = getAppSuccess;
  data.id_app = idApp;
  data.id_user = sessionStorage.id_user;
  sendCnxData(data, action, func);
}

function displayApp(app) {
  console.log(app);
}

// SUCCESS | FAILURE //
function createAppSuccess(resp, displayMsg) {
  if (resp.msg === undefined) {
    displayMsg.innerHTML = `${resp}`;
  }
  else {
    displayMsg.innerHTML = `${resp.msg}`;
    if (resp.msg === `New application correctly added!`) {
      setTimeout(() => {
        uploadAppIcon(resp.title);
        sessionStorage.appTitle = resp.title;
      }, '1500');
    }
  }
}

function createAppFail(error, displayMsg) {
  displayMsg.innerHTML = `createAppFail(error)!`;
  console.log(`${error}\ncreateAppFail(error)`);
}

function getUserAppsSuccess(data, displayMsg) {
  if (data != null || data != undefined) {
    let urlRefresh = window.location.hash;
    if (urlRefresh == '#app_list') {
      displayMsg.innerHTML = checkUrlHash(urlRefresh);
      setTimeout(() => {
        DefaultMsg.innerHTML = '';
      }, '2500');
      window.location.href = '#app_list_refresh';
      let container = `<div id='container' class='flex flex-row flex-wrap mx-auto max-w-fit'><h2 class='text-2xl text-white font-semibold mb-4 whitespace-nowrap absolute top-28 right-1/2 left-auto'>LISTE DE VOS APPLICATIONS :</h2></div>`
      Main.innerHTML += container;
      for (app of data) {
        let divApp = `
        <div class='mx-auto relative top-64' style='max-width: 600px; min-width: 500px;'>
          <div class='md:px-2 pt-4 md:bg-transparent bg-white dark:bg-zinc-800 md:dark:bg-transparent md:flex flex-row justify-center md:h-3/6 space-y-6 items-center'>
            <div class='md:bg-white md:shadow-lg md:rounded basis-10/12'>
              <div class='dark:bg-zinc-800 dark:text-white' style='min-height: 350px; max-height: 350px;'>
                <div class='md:flex md:py-8 md:px-4 px-6 justify-center'>

                  <div class='md:px-auto px-2 md:border-b-0 border-b'>
                    <h3 class='text-2xl font-semibold mb-4 whitespace-nowrap'>${app.title}
                    </h3>
                    <div class='w-full flex flex-col space-y-5 pt-14'>
                      <div class='flex flex-col space-y-1 flex-1 relative pb-10'>${app.description}</div>
                      <div class='flex justify-center'>
                        <input type='submit' id='appID_${app.id_app}' class='app_gestion cursor-pointer px-4 py-2 rounded flex space-x-2 hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 dark:hover:from-white/5 dark:hover:to-white/10 items-center text-white bg-[#335bff]' value="Gérer l'application" />
                      </div>
                      <div id='displayAppMsg_${app.id_app}'></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        `;
        document.getElementById('container').innerHTML += divApp;
      }
      let allApps = document.getElementsByClassName('app_gestion');
      createAppsListeners(allApps);      
    }
  }
}

function getUserAppsFail(error, displayMsg) {
  displayMsg.innerHTML = `getUserAppsFail(error)!`;
  console.log(`${error}\ngetUserAppsFail(error)`);
}

function getAppSuccess(resp, displayMsg) {
  if (resp.msg === undefined) {
    displayMsg.innerHTML = `${resp}`;
  }
  else {
    displayMsg.innerHTML = `${resp.msg}`;
    if (resp.msg === `App. getted!`) {
      displayApp(resp);
      setTimeout(() => {
        DefaultMsg.innerHTML = '';
      }, '1500');
    }
  }
}

function getAppFail(error, displayMsg) {
  displayMsg.innerHTML = `getAppFail(error)!`;
  console.log(`${error}\ngetAppFail(error)`);
}