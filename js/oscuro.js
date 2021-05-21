let darkMode = localStorage.getItem('darkMode');

const O = document.getElementById('oscuro');

const enableDarkMode = () => {
    // 1. Add the class to the body
    document.body.classList.add('modoOscuro');
    // boton.style.color = '#fc6b3f'
    // 2. Update darkMode in localStorage
    localStorage.setItem('darkMode', 'enabled');
  }

  const disableDarkMode = () => {
    // 1. Remove the class from the body
    document.body.classList.remove('modoOscuro');
    // boton.style.color = 'white'
    // 2. Update darkMode in localStorage 
    localStorage.setItem('darkMode', null);
  }

  if (darkMode === 'enabled') {
    enableDarkMode();
  }


O.addEventListener('click', () => {
      // get their darkMode setting
        darkMode = localStorage.getItem('darkMode'); 

        // if it not current enabled, enable it
        if (darkMode !== 'enabled') {
            enableDarkMode();

        // if it has been enabled, turn it off
        } else {
            disableDarkMode(); 
        }
})