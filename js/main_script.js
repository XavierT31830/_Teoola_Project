const Main = document.getElementById('main');
const CnxLogIn = document.getElementById('connexion');
const CnxSignIn = document.getElementById('subscribe');
const CnxDeco = document.getElementById('deconnexion');
const AppList = document.getElementById('app_list');
const CreateApp = document.getElementById('create_app');
const DefaultMsg = document.getElementById('defaultMsg');

CnxLogIn.addEventListener('click', () => displayConnexion());
CnxSignIn.addEventListener('click', () => displayInscription());
CnxDeco.addEventListener('click', function () {
  sessionStorage.clear();
  setTimeout(() => {
    window.location.reload();
  }, '1000');
});

refreshDisplay();

// REFRESH DISPLAY //
function refreshDisplay() {
  removeMainDisplay();
  if (sessionStorage.id_user !== undefined) {
    CnxLogIn.classList.toggle('hidden');
    CnxLogIn.classList.toggle('block');
    CnxSignIn.classList.toggle('hidden');
    CnxSignIn.classList.toggle('block');
    CnxDeco.classList.toggle('hidden');
    CnxDeco.classList.toggle('block');
    AppList.classList.toggle('hidden');
    AppList.classList.toggle('block');
    CreateApp.classList.toggle('hidden');
    CreateApp.classList.toggle('block');
  }
}

// FUNCTIONS //
function displayConnexion() {
  removeMainDisplay();
  toggleIfConnexion();
  Main.innerHTML = vueConnexion();
  let action = '';
  let func;
  document.getElementById('form-login').addEventListener('submit', function (e) {
    e.preventDefault();
    action = 'logIn';
    func = getUserByMailSuccess;
    let data = new FormData(e.target).entries();
    let formData = Object.fromEntries(data);
    sendCnxData(formData, action, func);
  });
}

function displayInscription() {
  removeMainDisplay();
  toggleIfInscription();
  Main.innerHTML = vueInscription();
  let action = '';
  let func;
  document.getElementById('form-signup').addEventListener('submit', function (e) {
    e.preventDefault();
    action = 'signUp';
    func = insertUserSuccess;
    let data = new FormData(e.target).entries();
    let formData = Object.fromEntries(data);
    verifUserData(formData, action, func);
  });
}

function getApp(idApp) {
  let data = {};
  let action = 'getApp';
  let func = getAppSuccess;
  data.id_app = idApp;
  data.id_user = sessionStorage.id_user;
  sendCnxData(data, action, func);
}

// TOOLS //
function removeMainDisplay() {
  DefaultMsg.innerHTML = '';
  if (sessionStorage.id_app && window.location.hash !== '#manage_app') {
    sessionStorage.removeItem('id_app');
  }
  if (sessionStorage.id_app && window.location.hash === '#manage_app') {
    getApp(sessionStorage.id_app);
  }
  if (window.location.hash !== '') {
    while (Main.firstChild) {
      Main.removeChild(Main.lastChild);
    };
  }  
}

function toggleIfConnexion() {
  if (!CnxLogIn.classList.contains('negative_index') || CnxLogIn.classList.contains('text-white')) {
    CnxLogIn.classList.toggle('negative_index');
    CnxLogIn.classList.toggle('text-white');
    CnxLogIn.classList.toggle('text-gray-500');
  }
  if (CnxSignIn.classList.contains('negative_index') || !CnxSignIn.classList.contains('text-white')) {
    CnxSignIn.classList.toggle('negative_index');
    CnxSignIn.classList.toggle('text-white');
    CnxSignIn.classList.toggle('text-gray-500');
  }
}

function toggleIfInscription() {
  if (!CnxSignIn.classList.contains('negative_index') || CnxSignIn.classList.contains('text-white')) {
    CnxSignIn.classList.toggle('negative_index');
    CnxSignIn.classList.toggle('text-white');
    CnxSignIn.classList.toggle('text-gray-500');
  }
  if (CnxLogIn.classList.contains('negative_index') || !CnxLogIn.classList.contains('text-white')) {
    CnxLogIn.classList.toggle('negative_index');
    CnxLogIn.classList.toggle('text-white');
    CnxLogIn.classList.toggle('text-gray-500');
  }
}

function defineSessionStorage(data) {
  sessionStorage.id_user = data.id_user;
  sessionStorage.lname = data.last_name;
  sessionStorage.fname = data.first_name;
}

// VERIF. BEFORE SENDING DATAS //
function verifUserData(formData, action, func) {
  
  sendCnxData(formData, action, func);
}

// SENDING DATAS WITH FETCH //

function sendCnxData(formData, action, func) {
  formData.action = action;
  let failure;
  let displayMsg;
  let failureReturn = returnDataFailure;
  const LogInMsg = document.getElementById('logInMsg');
  const SignUpMsg = document.getElementById('signUpMsg');
  const CreateAppMsg = document.getElementById('createAppMsg');
  const ManageAppMsg = document.getElementById('manageAppMsg');
  switch (action) {
    //----------------------------------------//
    case 'logIn':
      failure = `getUserByMailFail`;
      displayMsg = LogInMsg;
      break;
    //----------------------------------------//
    case 'signUp':
      failure = `insertUserFail`;
      displayMsg = SignUpMsg;
      break;
    //----------------------------------------//
    case 'createApp':
      failure = `${action}Fail`;
      displayMsg = CreateAppMsg;
      break;
    //----------------------------------------//
    case 'getUserApps':
      failure = `${action}Fail`;
      displayMsg = DefaultMsg;
      break;
    //----------------------------------------//
    case 'getApp':
      failure = `${action}Fail`;
      displayMsg = DefaultMsg;
      break;
    //----------------------------------------//
    case 'getRoles':
      failure = `${action}Fail`;
      displayMsg = DefaultMsg;
      break;
    //----------------------------------------//
    case 'getUsers':
      failure = `${action}Fail`;
      displayMsg = DefaultMsg;
      break;
    //----------------------------------------//
    case 'manageApp':
      failure = `${action}Fail`;
      displayMsg = ManageAppMsg;
      break;
    //----------------------------------------//
    default:
      failure = 'sendCnxDataFail'
      displayMsg = DefaultMsg;
      break;
    //----------------------------------------//
  }
  let fetchData = {
    method: 'POST',
    body: JSON.stringify(formData),
    header: { 'Content-type': 'application/json' }
  };
  fetch('./php/controller.php', fetchData)
  .then((resp) => resp.json())
  .then((resp) => func(resp, displayMsg))
  .catch((error) => failureReturn(error, displayMsg, failure))
}

// SUCCESS //
function getUserByMailSuccess(resp, displayMsg) {
  if (typeof resp === 'string' || resp instanceof String) {
    displayMsg.innerHTML = `${resp}`;
  }
  else {
    let msg = `Identified as ${resp.last_name} ${resp.first_name}`;
    displayMsg.innerHTML = msg;
    defineSessionStorage(resp);
    setTimeout(() => {
      window.location.reload();
    }, '1500');
  }
}

function insertUserSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `${resp}`;
  if (resp == `New user correctly registered!`) {
    setTimeout(() => {
      displayConnexion();
    }, '1500');
  }
}

function getAppSuccess(resp, displayMsg) {
  if (resp.msg === undefined) {
    displayMsg.innerHTML = `${resp}`;
  }
  else {
    displayMsg.innerHTML = `${resp.msg}`;
    if (resp.msg === `App. getted!`) {
      setTimeout(() => {
        DefaultMsg.innerHTML = '';
      }, '1500');
      if (window.location.hash == '#manage_app') {
        sessionStorage.id_app = resp.id_app;
        return manageApp(resp, undefined, undefined);
      }
      else {
        return resp;
      }
    }
  }
}

// FAILURE GENERIC //
function returnDataFailure(error, displayMsg, failure) {
  displayMsg.innerHTML = `${failure}(error)!`;
  console.log(`${error}\n${failure}(error)`);
}