// Función para alternar el contenido del menú desplegable
function toggleDropdown() {
  const dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
}

// Cierra el menú desplegable si el usuario hace clic fuera de él
document.addEventListener("click", function(event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
});

// Attach event listener to the button
const button = document.querySelector('.dropbtn');
button.addEventListener('click', toggleDropdown);



// GAME OBJECT
const game = {
  selectedColor: "white",
};

// GAME PROXY
const handler = {
  get(target, property) {
    return target[property];
  },
};
let proxyGame = new Proxy(game, handler);

// INITIAL CURSOR
document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" height="15" width="15"><g id="Layer_1"><g id="Layer_1_1_"><g><path d="M6.563 2.297c2.297 0 4.172 1.875 4.172 4.172s-1.875 4.172 -4.172 4.172 -4.172 -1.875 -4.172 -4.172 1.875 -4.172 4.172 -4.172m0 -1.5C3.422 0.797 0.891 3.328 0.891 6.469S3.422 12.141 6.563 12.141s5.672 -2.531 5.672 -5.672S9.703 0.797 6.563 0.797z"/></g></g></g><g id="Layer_2"><path stroke="black" fill="${proxyGame.selectedColor}" cx="14" cy="13.6" r="8.9" d="M10.734 6.375A4.172 4.172 0 0 1 6.563 10.547A4.172 4.172 0 0 1 2.391 6.375A4.172 4.172 0 0 1 10.734 6.375z" stroke-width="0.46875"/></g></svg>'), auto`;

// COLOR PALETTE CONTROL
const $controlColors = document.getElementsByClassName("controls__color");

for (let i = 0; i < $controlColors.length; i++) {
  $controlColors[i].addEventListener("click", function () {
    for (let x = 0; x < $controlColors.length; x++) {
      $controlColors[x].classList.remove("selected");
    }
    this.classList.add("selected");
    proxyGame.selectedColor = this.id;
    changeCursor();
  });
}

// SELECT ANY IMG

const $tinyImages = document.querySelector(".tiny-images");

$tinyImages.closest("div").addEventListener("click", function (t) {
  for (let m = 0; m < $bigImages.length; m++) {
    $bigImages[m].style.display = "none";
    for (let svgChild of $svg[m].childNodes) {
      for (let child of svgChild.childNodes) {
        if (
          child.nodeName == "circle" ||
          child.nodeName == "rect" ||
          child.nodeName == "ellipse"
        ) {
          child.style.fill = "none";
        }
      }
    }
  }
  if (t.target.dataset.tiny == "citroneta_trazado") {
    console.log("citroneta_trazado");
    $bigImages[0].style.display = "block";
  } else if (t.target.dataset.tiny == "Gatos_trazado") {
    console.log("Gatos_trazados");
    $bigImages[1].style.display = "block";
  } else if (t.target.dataset.tiny == "Novio_trazo") {
    console.log("Novio_trazo");
    $bigImages[2].style.display = "block";
  } else if (t.target.dataset.tiny == "Unicornio_trazado") {
    console.log("Unicornio_trazado");
    $bigImages[3].style.display = "block";
  }


});

// BIG IMAGES
const $bigImages = document.querySelectorAll(".big-images");

for (let b = 1; b < $bigImages.length; b++) {
  $bigImages[b].style.display = "none";
}

// SVG
let $svg = document.querySelectorAll("svg");

for (let s = 0; s < $svg.length; s++) {
  $svg[s].addEventListener("click", function (c) {
    c.target.style.fill = game.selectedColor;
  });
}

// CUSTOM CURSOR
function changeCursor() {
  let $paintbrush = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" height="15" width="15"><g id="Layer_1"><g id="Layer_1_1_"><g><path d="M6.563 2.297c2.297 0 4.172 1.875 4.172 4.172s-1.875 4.172 -4.172 4.172 -4.172 -1.875 -4.172 -4.172 1.875 -4.172 4.172 -4.172m0 -1.5C3.422 0.797 0.891 3.328 0.891 6.469S3.422 12.141 6.563 12.141s5.672 -2.531 5.672 -5.672S9.703 0.797 6.563 0.797z"/></g></g></g><g id="Layer_2"><path stroke="black" fill="${proxyGame.selectedColor}" cx="14" cy="13.6" r="8.9" d="M10.734 6.375A4.172 4.172 0 0 1 6.563 10.547A4.172 4.172 0 0 1 2.391 6.375A4.172 4.172 0 0 1 10.734 6.375z" stroke-width="0.46875"/></g></svg>`;

  let $svgCursor = `url('data:image/svg+xml;utf8,${$paintbrush}'), auto`;

  document.body.style.cursor = $svgCursor;
}

// TOUR MAP
const driver = window.driver.js.driver;

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '#my-button', popover: { title: 'Paso1', description: 'Elige entre nuestras obras'} },
    { element: '#jsColors', popover: { title: 'Paso2', description: 'Toca un color y...¡A pintar!' } },
  ],
  nextBtnText: 'Siguiente', // Cambia el texto del botón "Next"
  prevBtnText: 'Anterior', // Cambia el texto del botón "Previous"
  doneBtnText: 'Cerrar', // Cambia el texto del botón "Done"
});

driverObj.drive();
