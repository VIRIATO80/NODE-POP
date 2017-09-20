
//Valores del slider de filtro
var values = ['Desde 10€', 'De 10€ a 50€', 'Hasta 50€', 'Más de 50€'];


//Filtros del buscador de la página


$('#name').on('keyup', function(e){
    let valor = this.value;
    //Filtramos si el nombre es más largo de 3 caracteres
    if(valor.length > 3){

        $.ajax({
            url : '/api/busqueda',
            data : { nombre : valor },
            type : 'GET',
             // el tipo de información que se espera de respuesta
            dataType : 'json', 
            // código a ejecutar si la petición es satisfactoria;
            success : function(data) {
                let resultadoHTML ='';
                $.each(data, function(index, elemento) {
                    resultadoHTML += pintarElemento(elemento);
                });
                $('#listadoAnuncios').html(resultadoHTML);
            },     
            // código a ejecutar si la petición falla;
            error : function(xhr, status) {
                alert('Disculpe, existió un problema');
            }
        });
    }
});









$('#slider1').change(function() {
    $('#mensajeSlider').text(values[this.value]);
});

//Método para pintar el html de un elemento Anuncio
function pintarElemento(anuncio){

    let html = `<div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">`;
        if(anuncio.venta){
            html+=`<div class="card card-header venta">VENDO</div>`;
        }else{
            html+=`<div class="card card-header busqueda">BUSCO</div>`
        }
        html+=`<a href="#"><img class="card-img-top" src='images/${anuncio.foto}' alt=""></a>
        <div class="card-body">
         <h4 class="card-title">
                <a href="#">${anuncio.nombre}</a>
            </h4>
            <h5>${anuncio.precio}€</h5>
            <p class="card-text"><${anuncio.descripcion}</p>
        </div>
        <div class="card-footer">`;
        
        for (var i = 0; i < anuncio.tags.length; i++) {
            html+=`<span class="label label-primary">${anuncio.tags[i]}</span>`;
        }
        
    html+=`</div>
    </div>
    </div>`;
    return html;
};              