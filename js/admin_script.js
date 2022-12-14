

let Data = '';
let DataRoles = '';

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
    console.log(data);
    console.log(dataRoles);
    console.log(dataUsers);
    let roles = `<option value=''>-- Choose a Role --</option>`;
    let users = `<option value=''>-- Choose a Member --</option>`;
    for (elt in dataRoles) {
      elt = Number(elt);
      if (dataRoles[elt] !== undefined) {
        roles += `<option value='${dataRoles[elt].id_role}'>${dataRoles[elt].role}</option>`
      }
    };
    for (elt in dataUsers) {
      elt = Number(elt);
      if (dataUsers[elt] !== undefined) {
        users += `<option value='${dataUsers[elt].id_user}'>${dataUsers[elt].first_name} ${dataUsers[elt].last_name} | ${dataUsers[elt].email}</option>`
      }
    };
    let appContainer = `
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
            <label for='content' class='font-semibold'>Contenu</label>
            <textarea name='content' class='dark:bg-zinc-700 dark:border-zinc-900 dark:text-white block pt-2 pb-0 px-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary' rows='2' min-length='2'>${data.content}</textarea>
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

    </div>`
    Main.innerHTML += appContainer;

    let action = '';
    let func;
    document.getElementById('manage-app').addEventListener('submit', function (e) {
      e.preventDefault();
      action = 'manageApp';
      func = manageAppSuccess;
      let data = new FormData(e.target).entries();
      let formData = Object.fromEntries(data);
      formData.id_app = sessionStorage.id_app;
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
    }, '1500');
    if (resp.msg === `App. correctly modified!`) {
      setTimeout(() => {
        displayMsg.innerHTML = '';
      }, '3100');
      return resp;
    }
  }
}