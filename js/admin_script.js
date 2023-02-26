
let Data;
let DataRoles;

// FUNCTIONS //
function manageApp(data, dataRoles, dataUsers) {
  if (window.location.hash !== '#manage_app' && dataRoles === undefined && dataUsers === undefined) {
    removeMainDisplay();
    window.location.href = '#manage_app';
    getApp(data);
  }
  else if (window.location.hash === '#manage_app' && dataRoles === undefined && dataUsers === undefined) {
    Data = data;
    getRoles();
  }
  else if (window.location.hash === '#manage_app' && dataRoles !== undefined && dataUsers === undefined) {
    DataRoles = dataRoles;
    getUsers();
  }
  else if (window.location.hash === '#manage_app' && dataRoles !== undefined && dataUsers !== undefined) {
    let roles = vueOptions('Role');
    let users = vueOptions('Member');
    data.title = data.title.replaceAll('_', ' ')
    for (elt in dataRoles) {
      elt = Number(elt);
      if (dataRoles[elt] !== undefined) {
        roles += vueOptionsClose(dataRoles[elt], 'Role');
      }
    };
    for (elt in dataUsers) {
      elt = Number(elt);
      if (dataUsers[elt] !== undefined) {
        users += vueOptionsClose(dataUsers[elt], 'Member');
      }
    };
    let appContainer = vueManageApp(data, roles, users);
    Main.innerHTML += appContainer;
    delete Data;
    delete DataRoles;
    let action = '';
    let func;
    data.title = data.title.replaceAll(' ', '_')
    let old_title = `${data.title}`;
    document.getElementById('manage-app').addEventListener('submit', function (e) {
      e.preventDefault();
      action = 'manageApp';
      func = manageAppSuccess;
      let data = new FormData(e.target).entries();
      let formData = Object.fromEntries(data);
      formData.id_app = sessionStorage.id_app;
      formData.old_title = old_title;
      verifUserData(formData, action, func);
    });
  }
}

// SUCCESS //
function manageAppSuccess(resp, displayMsg) {
  if (resp.msg === undefined) {
    displayMsg.innerHTML = `${resp}`;
  }
  else {
    setTimeout(() => {
      displayMsg.innerHTML = `${resp.msg}`;
    }, '1000');
    if (resp.msg === `App. correctly modified!`) {
      setTimeout(() => {
        displayMsg.innerHTML = '';
        urlRefresh = '#app_list_refresh';
        checkUrlHash(urlRefresh);
      }, '3100');
      return resp;
    }
  }
}