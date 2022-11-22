

const Main = document.getElementById('main');
const CnxLogIn = document.getElementById('connexion');

CnxLogIn.addEventListener('click', (e) => displayConnexion(e));


function displayConnexion(e) {
  e.preventDefault();
  removeMainDisplay();
  CnxLogIn.classList.toggle('negative_index');
  CnxLogIn.classList.toggle('text-white');
  CnxLogIn.classList.toggle('text-gray-500');

  Main.innerHTML = `<div class='mx-auto pt-8' style='max-width: 1140px;'>
    <div class='md:py-0 py-5 md:bg-transparent bg-white dark:bg-zinc-800 md:dark:bg-transparent md:flex flex-col justify-center md:h-screen space-y-6'>
      <div class='flex justify-center items-center'>
        <a class='text-white font-bold text-3xl' href='./'>Connexion</a>
      </div>
      <div class='md:bg-white md:shadow-lg md:rounded'>
        <div class='dark:bg-zinc-800 dark:text-white'>
          <div class='md:flex md:py-8 md:px-0 px-6'>

            <form id='form-login' action='login' class='md:px-16 px-2 md:py-3 py-12 md:w-1/2 md:border-r md:border-b-0 border-b' method='POST'>
              <h2 class='text-2xl font-semibold mb-4 whitespace-nowrap'>Connexion par email</h2>
              <div class='w-full flex flex-col space-y-5 pt-14'>
                <div class='flex flex-col space-y-1 flex-1 relative pb-10'>
                  <label class='font-semibold'>Email</label>
                  <input type='email' name='email' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Email' required>
                </div>
                <div class='mb-4'>
                  <label class='mb-2 flex justify-between items-center'>
                    <span class='font-semibold'>Mot de passe</span>
                    <a class='text-primary underline' href='#connexion'>Mot de passe oublié ?
                    </a>
                  </label>
                  <div class='relative flex flex-col pb-10'>
                    <input type='password' name='password' class='block dark:bg-zinc-700 dark:border-zinc-900 dark:text-white p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Password' required>
                  </div>
                </div>
                <div class='flex justify-end'>
                  <input type='submit' id='logInForm' class='cursor-pointer px-4 py-2 rounded flex space-x-2 hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 dark:hover:from-white/5 dark:hover:to-white/10 items-center text-white bg-[#335bff]' value='Connexion' />
                </div>
                <div id='logInMsg'>Salut</div>
              </div>
            </form>

            <form id="form-signup" action='signup' class='md:px-16 px-2 md:py-3 py-12 md:w-1/2' method="POST">
              <h2 class="text-2xl font-semibold mb-4 whitespace-nowrap">Inscription</h2>
              <div class="w-full flex flex-col space-y-5">
                <div class='flex flex-col space-y-1 flex-1 relative'>
                  <label class='font-semibold'>Entrez votre email</label>
                  <input type='email' name='email' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Your email'>
                </div>
                <div class='flex flex-col space-y-1 flex-1 relative'>
                  <label class='font-semibold'>Votre Nom</label>
                  <input type='text' name='lname' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Your pseudo'>
                </div>
                <div class='flex flex-col space-y-1 flex-1 relative'>
                  <label class='font-semibold'>Votre Prénom</label>
                  <input type='text' name='fname' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Your pseudo'>
                </div>
                <div class='mb-4'>
                  <label class='mb-2 flex justify-between items-center'>
                    <span class='font-semibold'>Choisir un mot de passe</span>
                  </label>
                  <div class='relative flex flex-col'>
                    <input type='password' name='password' class='block dark:bg-zinc-700 dark:border-zinc-900 dark:text-white p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Password' required>
                  </div>
                </div>
                <div class='mb-4'>
                  <label class='mb-2 flex justify-between items-center'>
                    <span class='font-semibold'>Confirmez le mot de passe</span>
                  </label>
                  <div class='relative flex flex-col'>
                    <input type='password' name='password_confirm' class='block dark:bg-zinc-700 dark:border-zinc-900 dark:text-white p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Confirm Password' required>
                  </div>
                </div>
                <div class='flex justify-end'>
                  <input type='submit' id='signUpForm' class='cursor-pointer px-4 py-2 rounded flex space-x-2 hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 dark:hover:from-white/5 dark:hover:to-white/10 items-center text-white bg-[#335bff]' value='Inscription' />
                </div>
                <div id='signUpMsg'>Salut</div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>`;

  let action = '';
  let func;

  document.getElementById('form-login').addEventListener('submit', function (e) {
    e.preventDefault();
    action = 'logIn';
    func = getUserSuccess;
    let data = new FormData(e.target).entries();
    let formData = Object.fromEntries(data);
    verif(formData, action, func);
  });

  document.getElementById('form-signup').addEventListener('submit', function (e) {
    e.preventDefault();
    action = 'signUp';
    func = insertUserSuccess;
    let data = new FormData(e.target).entries();
    let formData = Object.fromEntries(data);
    verif(formData, action, func);
  });
}

function removeMainDisplay() {
  while (Main.firstChild) {
    Main.removeChild(Main.lastChild);
  };
}

function verif(formData, action, func) {
  
  sendCnxData(formData, action, func);
}

function defineSessionStorage(data) {
  sessionStorage.id_user = data.id_user;
  sessionStorage.userRole = data.role;
  sessionStorage.lname = data.last_name;
  sessionStorage.fname = data.first_name;
}

function getUserSuccess(resp, displayMsg) {
  if (typeof resp === 'string' || resp instanceof String) {
    displayMsg.innerHTML = `${resp}`;
  }
  else {
    let msg = `Identifié sous le nom de ${resp.last_name} ${first_name}`;
    displayMsg.innerHTML = msg;
    defineSessionStorage(resp);
  }
}