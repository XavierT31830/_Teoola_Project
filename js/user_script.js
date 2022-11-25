

CreateApp.addEventListener('click', () => createApplication());

function createApplication() {
  removeMainDisplay();

  Main.innerHTML = `
  <div class='mx-auto pt-8' style='max-width: 1140px;'>
    <div class='md:py-0 py-5 md:bg-transparent bg-white dark:bg-zinc-800 md:dark:bg-transparent md:flex flex-col justify-center md:h-screen space-y-6 items-center'>
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

function uploadAppIcon() {
  removeMainDisplay();

  Main.innerHTML = `
  <div class='mx-auto pt-8' style='max-width: 1140px;'>
    <div class='md:py-0 py-5 md:bg-transparent bg-white dark:bg-zinc-800 md:dark:bg-transparent md:flex flex-col justify-center md:h-screen space-y-6 items-center'>
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
                  <input id='appicon' type='file' name='appicon' accept='.png, .jpg, .jpeg, .svg' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' placeholder='Upload icon' />
                </div>
                <div class='flex justify-end pt-7'>
                  <input type='submit' id='uploadappiconform' name='uploadappiconform' class='cursor-pointer px-4 py-2 rounded flex space-x-2 hover:bg-gradient-to-r hover:from-black/5 hover:to-black/10 dark:hover:from-white/5 dark:hover:to-white/10 items-center text-white bg-[#335bff]' value='Valider' />
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

function uploadAppIconResult(msg_insert) {
  console.log(msg_insert);
}

// SUCCESS | FAILURE //
function createAppSuccess(resp, displayMsg) {
  displayMsg.innerHTML = `${resp}`;
  if (resp == `New application correctly added!`) {
    setTimeout(() => {
      uploadAppIcon();
    }, '1500');
  }
}

function createAppFail(error, displayMsg) {
  displayMsg.innerHTML = `createAppFail(error)!`;
  console.log(`${error}\ncreateAppFail(error)`);
}