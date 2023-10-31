const driver = window.driver.js.driver;

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '#my-button', popover: { title: 'Paso1', description: 'Elige entre nuestras obras'} },
    { element: '#paletteBox', popover: { title: 'Paso2', description: 'Toca un color y...¡A pintar!' } },
  ],
  nextBtnText: 'Siguiente', // Cambia el texto del botón "Next"
  prevBtnText: 'Anterior', // Cambia el texto del botón "Previous"
  doneBtnText: 'Cerrar', // Cambia el texto del botón "Done"
});

driverObj.drive();
