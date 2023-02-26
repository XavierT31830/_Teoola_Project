AppList.addEventListener('click', () => getUserApps(sessionStorage.id_user));
CreateApp.addEventListener('click', () => createApp());

const UrlHash = window.location.hash;

let title;

checkUrlHash(UrlHash, title);

// CHECK URL HASH //
function checkUrlHash(urlHash, title) {
  delete Data;
  delete DataRoles;
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
  Main.innerHTML = vueCreateApp();
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
  Main.innerHTML = vueUploadAppIcon(data);
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
  if (data != null || data != undefined) {
    let urlRefresh = window.location.hash;
    if (urlRefresh == '#app_list') {
      displayMsg.innerHTML = checkUrlHash(urlRefresh);
      setTimeout(() => {
        DefaultMsg.innerHTML = '';
      }, '2500');
      window.location.href = '#app_list_refresh';
      let container = vueGetAppsSuccess(null);
      Main.innerHTML += container;
      for (app of data) {
        app.title = app.title.replaceAll('_', ' ')
        let divApp = vueGetAppsSuccess(app);
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
    }, '1600');
    if (resp.msg === `Roles getted!`) {
      setTimeout(() => {
        displayMsg.innerHTML = '';
      }, '3000');
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
    }, '3200');
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