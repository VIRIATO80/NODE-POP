
//Valores del slider de filtro
var values = ['Desde 10€', 'De 10€ a 50€', 'Hasta 50€', 'Más de 50€'];

$('#slider1').change(function() {
    $('#mensajeSlider').text(values[this.value]);
});