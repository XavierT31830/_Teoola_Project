

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

// CONNEXION //
function displayConnexion() {
  removeMainDisplay();
  toggleIfConnexion();

  Main.innerHTML = `
  <div class='mx-auto' style='max-width: 1140px;'>
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
  </div>
  `;

  let action = '';
  let func;

  document.getElementById('form-login').addEventListener('submit', function (e) {
    e.preventDefault();
    action = 'logIn';
    func = getUserByMailSuccess;
    let data = new FormData(e.target).entries();
    let formData = Object.fromEntries(data);
    verifUserData(formData, action, func);
  });
}

// INSCRIPTION //
function displayInscription() {
  removeMainDisplay();
  toggleIfInscription();

  Main.innerHTML = `
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
                  <label for='name' class='font-semibold'>Votre Nom</label>
                  <input type='text' name='lastname' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Your last name' REQUIRED />
                </div>
                <div class='flex flex-col space-y-1 flex-1 relative'>
                  <label for='firstname' class='font-semibold'>Votre Prénom</label>
                  <input type='text' name='firstname' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Your first name' REQUIRED />
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

// TOOLS //
function removeMainDisplay() {
  console.log(window.location.hash);
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

function getApp(idApp) {
  let data = {};
  let action = 'getApp';
  let func = getAppSuccess;
  data.id_app = idApp;
  data.id_user = sessionStorage.id_user;
  sendCnxData(data, action, func);
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

// VERIF. BEFORE SENDING DATAS //
function verifUserData(formData, action, func) {
  
  sendCnxData(formData, action, func);
}

// SENDING DATAS WITH FETCH //
function sendCnxData(formData, action, func) {
  formData.action = action;
  let failure;
  let displayMsg = null;
  const LogInMsg = document.getElementById('logInMsg');
  const SignUpMsg = document.getElementById('signUpMsg');
  const CreateAppMsg = document.getElementById('createAppMsg');

  switch (action) {
    case 'logIn':
      failure = getUserByMailFail;
      displayMsg = LogInMsg;
      break;

    case 'signUp':
      failure = insertUserFail;
      displayMsg = SignUpMsg;
      break;

    case 'createapp':
      failure = createAppFail;
      displayMsg = CreateAppMsg;
      break;

    case 'getUserApps':
      failure = getUserAppsFail;
      displayMsg = DefaultMsg;
      break;

    case 'getApp':
      failure = getAppFail;
      displayMsg = DefaultMsg;
      break;

    case 'getRoles':
      failure = getRolesFail;
      displayMsg = DefaultMsg;
      break;

    case 'getUsers':
      failure = getUsersFail;
      displayMsg = DefaultMsg;
      break;
  
    default:
      break;
  }

  let fetchData = {
    method: 'POST',
    body: JSON.stringify(formData),
    header: { 'Content-type': 'application/json' }
  };
  fetch('./php/controller.php', fetchData)
  .then((resp) => resp.json())
  .then((resp) => func(resp, displayMsg))
  .catch((error) => failure(error, displayMsg))
}

// DEFINE SESSION STORAGE //
function defineSessionStorage(data) {
  sessionStorage.id_user = data.id_user;
  sessionStorage.lname = data.last_name;
  sessionStorage.fname = data.first_name;
}

// SUCCESS | FAILURE //
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

function getUserByMailFail(error, displayMsg) {
  displayMsg.innerHTML = `getUserByMailFail(error)!`;
  console.log(`${error}\ngetUserByMailFail(error)`);
}

function insertUserSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `${resp}`;
  if (resp == `New user correctly registered!`) {
    setTimeout(() => {
      displayConnexion();
    }, '1500');
  }
}

function insertUserFail(error, displayMsg) {
  displayMsg.innerHTML = `insertUserFail(error)!`;
  console.log(`${error}\ninsertUserFail(error)`);
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

function getAppFail(error, displayMsg) {
  displayMsg.innerHTML = `getAppFail(error)!`;
  console.log(`${error}\ngetAppFail(error)`);
}