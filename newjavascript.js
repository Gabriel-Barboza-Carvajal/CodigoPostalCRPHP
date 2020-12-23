
window.onload = init;


// variable para cargar los datos desde un array de JSON quemado para no
// conectarse a una base de datos para obtener los datos.
var datos_registros = [];

//variables tmp para asiganar correctamente a que provincia 
//pertenece cada distrito y canton...
var tmp_pro = "";
var tmp_can = "";


function init() {
//    fetch('servletCargarDatos').then(function (resultado) {
//        return resultado.json();
//    }).then(construirMenus);
    var numbers = datos_totales['provincia'];
    numbers.forEach(myfunction);
    
    console.log(datos_registros);
    construirMenus(datos_registros);
}

function construirMenus(datos)
{
    console.log(datos_totales);
    construirProvincias(datos);
    construirCantones(datos);
    construirDistritos(datos);
    datosTotales = datos;
    calcularCodigo();
}

function construirProvincias(datosProvincias)
{
    console.log("datos", datosProvincias);
    var refMenu = document.getElementById('MenuProvincia');
    if (refMenu) {
        while (refMenu.options.length) {
            refMenu.options.remove(0);
        }
        datosProvincias.forEach(
                function (elemento, i, arreglo) {
                    var opcion = document.createElement("option");
                    if (elemento.canton === 0 &&
                            elemento.distrito === 0
                            && elemento.seq_distrito === 0)
                    {
                        opcion.setAttribute("value", String(i + 1));
                        opcion.appendChild(document.createTextNode(elemento.nombre));
                        refMenu.appendChild(opcion);
                    }
                }
        );
    }
}

function construirCantones(datosCantones, np)
{
    console.log("datos1", datosCantones);
    np = 1;
    var refMenu = document.getElementById('MenuCanton');
    if (refMenu) {
        while (refMenu.options.length) {
            refMenu.options.remove(0);
        }
        datosCantones.forEach(
                function (elemento, i, arreglo) {
                    var opcion = document.createElement("option");
                    if (
                            elemento.provincia === np
                            && elemento.distrito !== 0
                            && (elemento.seq_distrito === 1)
                            )
                    {
                        var s = elemento;
                        var siguieate = arreglo[i - 1].nombre;

                        opcion.setAttribute("value", String(i - 1));
                        opcion.appendChild(document.createTextNode(arreglo[i - 1].nombre));
                        refMenu.appendChild(opcion);

                    }
                }
        );
    }
}
var datosTotales;
function construirDistritos(datosDistritos, nd, np)
{
    console.log("datos2", datosDistritos);
    console.log("datos1", datosDistritos);
    nd = 1;
    np = 1;
    var refMenu = document.getElementById('MenuDistrito');
    if (refMenu) {
        while (refMenu.options.length) {
            refMenu.options.remove(0);
        }
        datosDistritos.forEach(
                function (elemento, i, arreglo) {
                    var opcion = document.createElement("option");
                    if (
                            elemento.provincia === np
                            && elemento.canton === nd

                            )
                    {
                        opcion.setAttribute("value", String(i + 1));
                        opcion.appendChild(document.createTextNode(elemento.nombre));
                        refMenu.appendChild(opcion);
                    }
                }
        );

    }
}

function filtrarMenuCanton() {
    var refMenu = document.getElementById('MenuCanton');
    var refMenuP = document.getElementById('MenuProvincia');
    if (refMenu) {
        var textoItem = refMenuP.children[refMenuP.selectedIndex].text;
        while (refMenu.options.length) {
            refMenu.options.remove(0);
        }
        datosTotales.forEach(
                function (elemento, i, arreglo) {
                    var opcion = document.createElement("option");
                    var numeroPosicion = refMenuP.children[refMenuP.selectedIndex].value;

                    var can = arreglo[numeroPosicion].canton;
                    var pro = arreglo[numeroPosicion].provincia;
                    if (
                            elemento.provincia === pro
                            && elemento.distrito !== 0
                            && (elemento.seq_distrito === 1)
                            )
                    {
                        var s = elemento;
                        var siguieate = arreglo[i - 1].nombre;
                        opcion.setAttribute("value", String(i - 1));
                        opcion.appendChild(document.createTextNode(arreglo[i - 1].nombre));
                        refMenu.appendChild(opcion);


                    }
                }
        );
    }

    filtrarMenuDistrito();
}

function filtrarMenuDistrito() {
    var refDis = document.getElementById('MenuDistrito');
    var menuProv = document.getElementById('MenuProvincia');
    var refMenuCant = document.getElementById('MenuCanton');


    if (refDis) {
        var textoItem = refMenuCant.children[refMenuCant.selectedIndex].text;
        while (refDis.options.length) {
            refDis.options.remove(0);
        }
        datosTotales.forEach(
                function (elemento, i, arreglo) {
                    var opcion = document.createElement("option");
                    var numeroPosicionC = refMenuCant.children[refMenuCant.selectedIndex].value;
                    var numeroPosicion = menuProv.children[menuProv.selectedIndex].value;
                    var can = arreglo[numeroPosicionC].canton;
                    var pro = arreglo[numeroPosicion].provincia;
                    if (
                            elemento.provincia === pro
                            && elemento.canton === can
                            && elemento.distrito !== 0
                            && elemento.seq_distrito !== arreglo[i - 1].seq_distrito
                            )
                    {
                        var s = elemento;
                        opcion.setAttribute("value", String(i));
                        opcion.appendChild(document.createTextNode(elemento.nombre));
                        refDis.appendChild(opcion);
                    }
                }
        );

    }

    calcularCodigo();
//    var numeroPosicionCanton=datosTotales[refMenuCant.children[refMenuCant.selectedIndex].value].canton;
//    var numeroPosicionDistrito=datosTotales[refDis.children[refDis.selectedIndex].value].distrito;
//    var numeroPosicionProvincia=datosTotales[menuProv.children[menuProv.selectedIndex].value].provincia;
//    console.log("Codigo : ",numeroPosicionProvincia,numeroPosicionCanton,numeroPosicionDistrito);
}

function calcularCodigo()
{
    var refDis = document.getElementById('MenuDistrito');
    var menuProv = document.getElementById('MenuProvincia');
    var refMenuCant = document.getElementById('MenuCanton');
    var numeroPosicionCanton = datosTotales[refMenuCant.children[refMenuCant.selectedIndex].value].canton;
    var numeroPosicionDistrito = datosTotales[refDis.children[refDis.selectedIndex].value].seq_distrito;
    var numeroPosicionProvincia = datosTotales[menuProv.children[menuProv.selectedIndex].value].provincia;
    p = numeroPosicionProvincia;
    ca = numeroPosicionCanton;
    d = numeroPosicionDistrito;

    var a, b, c;

    a = p;
    if (ca.length >= 10)
    {
        b = ca;
    } else
    {
        b = "0" + ca;
    }
    if (d.length >= 10)
    {
        c = d;
    } else
    {
        c = "0" + d;
    }
    console.log(a, b, c);
    var refCodigo = document.getElementById("codigo");
    if (refCodigo)
    {

        refCodigo.textContent = a + b + c;
    }

}

function ejemplo()
{
    var refDis = document.getElementById('MenuDistrito');
    var menuProv = document.getElementById('MenuProvincia');
    var refMenuCant = document.getElementById('MenuCanton');
    var numeroPosicionCanton = datosTotales[refMenuCant.children[refMenuCant.selectedIndex].value].canton;
    var numeroPosicionDistrito = datosTotales[refDis.children[refDis.selectedIndex].value].seq_distrito;
    var numeroPosicionProvincia = datosTotales[menuProv.children[menuProv.selectedIndex].value].provincia;
    p = numeroPosicionProvincia;
    ca = numeroPosicionCanton;
    d = numeroPosicionDistrito;

    var a, b, c;

    a = p;
    if (ca.length >= 10)
    {
        b = ca;
    } else
    {
        b = "0" + ca;
    }
    if (d.length >= 10)
    {
        c = d;
    } else
    {
        c = "0" + d;
    }
    console.log(a, b, c);
}

function myfunction(value, index, array) {
    // estamos a nivel de los provincias
    // guardamos cada registro hasta completar los 576

    datos_registros.push({
        canton: 0,
        distrito: 0,
        nombre: value['nombre'],
        provincia: value['número'],
        seq_distrito: 0
    });

    tmp_pro = value['número'];
    // ahora recorremos los distritos del canton
    var canton_tmp = value['cantón'];

    canton_tmp.forEach(Myfunction2);




}

function Myfunction2(value2, index2, array2) {
    datos_registros.push({
        canton: value2['número'],
        distrito: 0,
        nombre: value2['nombre'],
        provincia: tmp_pro,
        seq_distrito: 0
    });
    // ahora recorremos los distritos

    var distrito_tmp = value2['distrito'];
    
    tmp_can=value2['número'];
    
    distrito_tmp.forEach(Myfunction3);


}
function Myfunction3(value3, index3, array3) {

    datos_registros.push({
        canton: tmp_can,
        distrito: value3['número'],
        nombre: value3['nombre'],
        provincia: tmp_pro,
        seq_distrito: value3['secuencia']
    });

}
var lineaDatos = {
    canton: 0,
    distrito: 0,
    nombre: "San José",
    provincia: 1,
    seq_distrito: 0
};


var datos_totales = {
    provincia: [
        {
            'cantón': [
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 1,
                            nombre: 'Carmen'
                        },
                        {
                            secuencia: 2,
                            'número': 2,
                            nombre: 'Merced'
                        },
                        {
                            secuencia: 3,
                            'número': 3,
                            nombre: 'Hospital'
                        },
                        {
                            secuencia: 4,
                            'número': 4,
                            nombre: 'Catedral'
                        },
                        {
                            secuencia: 5,
                            'número': 5,
                            nombre: 'Zapote'
                        },
                        {
                            secuencia: 6,
                            'número': 6,
                            nombre: 'San Francisco de Dos Ríos'
                        },
                        {
                            secuencia: 7,
                            'número': 7,
                            nombre: 'Uruca'
                        },
                        {
                            secuencia: 8,
                            'número': 8,
                            nombre: 'Mata Redonda'
                        },
                        {
                            secuencia: 9,
                            'número': 9,
                            nombre: 'Pavas'
                        },
                        {
                            secuencia: 10,
                            'número': 10,
                            nombre: 'Hatillo'
                        },
                        {
                            secuencia: 11,
                            'número': 11,
                            nombre: 'San Sebastián'
                        }
                    ],
                    'número': 1,
                    nombre: 'San José'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 12,
                            nombre: 'Escazú'
                        },
                        {
                            secuencia: 2,
                            'número': 13,
                            nombre: 'San Antonio'
                        },
                        {
                            secuencia: 3,
                            'número': 14,
                            nombre: 'San Rafael'
                        }
                    ],
                    'número': 2,
                    nombre: 'Escazú'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 15,
                            nombre: 'Desamparados'
                        },
                        {
                            secuencia: 2,
                            'número': 16,
                            nombre: 'San Miguel'
                        },
                        {
                            secuencia: 3,
                            'número': 17,
                            nombre: 'San Juan de Dios'
                        },
                        {
                            secuencia: 4,
                            'número': 18,
                            nombre: 'San Rafael Arriba'
                        },
                        {
                            secuencia: 5,
                            'número': 19,
                            nombre: 'San Antonio'
                        },
                        {
                            secuencia: 6,
                            'número': 20,
                            nombre: 'Frailes'
                        },
                        {
                            secuencia: 7,
                            'número': 21,
                            nombre: 'Patarrá'
                        },
                        {
                            secuencia: 8,
                            'número': 22,
                            nombre: 'San Cristóbal'
                        },
                        {
                            secuencia: 9,
                            'número': 23,
                            nombre: 'Rosario'
                        },
                        {
                            secuencia: 10,
                            'número': 24,
                            nombre: 'Damas'
                        },
                        {
                            secuencia: 11,
                            'número': 25,
                            nombre: 'San Rafael Abajo'
                        },
                        {
                            secuencia: 12,
                            'número': 26,
                            nombre: 'Gravilias'
                        },
                        {
                            secuencia: 13,
                            'número': 27,
                            nombre: 'Los Guido'
                        }
                    ],
                    'número': 3,
                    nombre: 'Desamparados'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 28,
                            nombre: 'Santiago'
                        },
                        {
                            secuencia: 2,
                            'número': 29,
                            nombre: 'Mercedes Sur'
                        },
                        {
                            secuencia: 3,
                            'número': 30,
                            nombre: 'Barbacoas'
                        },
                        {
                            secuencia: 4,
                            'número': 31,
                            nombre: 'Grifo Alto'
                        },
                        {
                            secuencia: 5,
                            'número': 32,
                            nombre: 'San Rafael'
                        },
                        {
                            secuencia: 6,
                            'número': 33,
                            nombre: 'Candelarita'
                        },
                        {
                            secuencia: 7,
                            'número': 34,
                            nombre: 'Desamparaditos'
                        },
                        {
                            secuencia: 8,
                            'número': 35,
                            nombre: 'San Antonio'
                        },
                        {
                            secuencia: 9,
                            'número': 36,
                            nombre: 'Chires'
                        },
                        {
                            secuencia: 10,
                            'número': 37,
                            nombre: 'La Cangreja'
                        }
                    ],
                    'número': 4,
                    nombre: 'Puriscal'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 38,
                            nombre: 'San Marcos'
                        },
                        {
                            secuencia: 2,
                            'número': 39,
                            nombre: 'San Lorenzo'
                        },
                        {
                            secuencia: 3,
                            'número': 40,
                            nombre: 'San Carlos'
                        }
                    ],
                    'número': 5,
                    nombre: 'Tarrazú'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 41,
                            nombre: 'Aserrí'
                        },
                        {
                            secuencia: 2,
                            'número': 42,
                            nombre: 'Tarbaca'
                        },
                        {
                            secuencia: 3,
                            'número': 43,
                            nombre: 'Vuelta de Jorco'
                        },
                        {
                            secuencia: 4,
                            'número': 44,
                            nombre: 'San Gabriel'
                        },
                        {
                            secuencia: 5,
                            'número': 45,
                            nombre: 'Legua'
                        },
                        {
                            secuencia: 6,
                            'número': 46,
                            nombre: 'Monterrey'
                        },
                        {
                            secuencia: 7,
                            'número': 47,
                            nombre: 'Salitrillos'
                        }
                    ],
                    'número': 6,
                    nombre: 'Aserrí'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 48,
                            nombre: 'Ciudad Colón'
                        },
                        {
                            secuencia: 2,
                            'número': 49,
                            nombre: 'Guayabo'
                        },
                        {
                            secuencia: 3,
                            'número': 50,
                            nombre: 'Tabarcia'
                        },
                        {
                            secuencia: 4,
                            'número': 51,
                            nombre: 'Piedras Negras'
                        },
                        {
                            secuencia: 5,
                            'número': 52,
                            nombre: 'Picagres'
                        },
                        {
                            secuencia: 6,
                            'número': 53,
                            nombre: 'Jaris'
                        },
                        {
                            secuencia: 7,
                            'número': 54,
                            nombre: 'Quitirrisí'
                        }
                    ],
                    'número': 7,
                    nombre: 'Mora'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 55,
                            nombre: 'Guadalupe'
                        },
                        {
                            secuencia: 2,
                            'número': 56,
                            nombre: 'San Francisco'
                        },
                        {
                            secuencia: 3,
                            'número': 57,
                            nombre: 'Calle Blancos'
                        },
                        {
                            secuencia: 4,
                            'número': 58,
                            nombre: 'Mata de Plátano'
                        },
                        {
                            secuencia: 5,
                            'número': 59,
                            nombre: 'Ipís'
                        },
                        {
                            secuencia: 6,
                            'número': 60,
                            nombre: 'Rancho Redondo'
                        },
                        {
                            secuencia: 7,
                            'número': 61,
                            nombre: 'Purral'
                        }
                    ],
                    'número': 8,
                    nombre: 'Goicoechea'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 62,
                            nombre: 'Santa Ana'
                        },
                        {
                            secuencia: 2,
                            'número': 63,
                            nombre: 'Salitral'
                        },
                        {
                            secuencia: 3,
                            'número': 64,
                            nombre: 'Pozos'
                        },
                        {
                            secuencia: 4,
                            'número': 65,
                            nombre: 'Uruca'
                        },
                        {
                            secuencia: 5,
                            'número': 66,
                            nombre: 'Piedades'
                        },
                        {
                            secuencia: 6,
                            'número': 67,
                            nombre: 'Brasil'
                        }
                    ],
                    'número': 9,
                    nombre: 'Santa Ana'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 68,
                            nombre: 'Alajuelita'
                        },
                        {
                            secuencia: 2,
                            'número': 69,
                            nombre: 'San Josecito'
                        },
                        {
                            secuencia: 3,
                            'número': 70,
                            nombre: 'San Antonio'
                        },
                        {
                            secuencia: 4,
                            'número': 71,
                            nombre: 'Concepción'
                        },
                        {
                            secuencia: 5,
                            'número': 72,
                            nombre: 'San Felipe'
                        }
                    ],
                    'número': 10,
                    nombre: 'Alajuelita'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 73,
                            nombre: 'San Isidro'
                        },
                        {
                            secuencia: 2,
                            'número': 74,
                            nombre: 'San Rafael'
                        },
                        {
                            secuencia: 3,
                            'número': 75,
                            nombre: 'Dulce Nombre de Jesús'
                        },
                        {
                            secuencia: 4,
                            'número': 76,
                            nombre: 'Patalillo'
                        },
                        {
                            secuencia: 5,
                            'número': 77,
                            nombre: 'Cascajal'
                        }
                    ],
                    'número': 11,
                    nombre: 'Vázquez de Coronado'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 78,
                            nombre: 'San Ignacio'
                        },
                        {
                            secuencia: 2,
                            'número': 79,
                            nombre: 'Guaitil'
                        },
                        {
                            secuencia: 3,
                            'número': 80,
                            nombre: 'Palmichal'
                        },
                        {
                            secuencia: 4,
                            'número': 81,
                            nombre: 'Cangrejal'
                        },
                        {
                            secuencia: 5,
                            'número': 82,
                            nombre: 'Sabanillas'
                        }
                    ],
                    'número': 12,
                    nombre: 'Acosta'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 83,
                            nombre: 'San Juan'
                        },
                        {
                            secuencia: 2,
                            'número': 84,
                            nombre: 'Cinco Esquinas'
                        },
                        {
                            secuencia: 3,
                            'número': 85,
                            nombre: 'Anselmo Llorente'
                        },
                        {
                            secuencia: 4,
                            'número': 86,
                            nombre: 'León XIII'
                        },
                        {
                            secuencia: 5,
                            'número': 87,
                            nombre: 'Colima'
                        }
                    ],
                    'número': 13,
                    nombre: 'Tibás'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 88,
                            nombre: 'San Vicente'
                        },
                        {
                            secuencia: 2,
                            'número': 89,
                            nombre: 'San Jerónimo'
                        },
                        {
                            secuencia: 3,
                            'número': 90,
                            nombre: 'Trinidad'
                        }
                    ],
                    'número': 14,
                    nombre: 'Moravia'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 91,
                            nombre: 'San Pedro'
                        },
                        {
                            secuencia: 2,
                            'número': 92,
                            nombre: 'Sabanilla'
                        },
                        {
                            secuencia: 3,
                            'número': 93,
                            nombre: 'Mercedes'
                        },
                        {
                            secuencia: 4,
                            'número': 94,
                            nombre: 'San Rafael'
                        }
                    ],
                    'número': 15,
                    nombre: 'Montes de Oca'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 95,
                            nombre: 'San Pablo'
                        },
                        {
                            secuencia: 2,
                            'número': 96,
                            nombre: 'San Pedro'
                        },
                        {
                            secuencia: 3,
                            'número': 97,
                            nombre: 'San Juan de Mata'
                        },
                        {
                            secuencia: 4,
                            'número': 98,
                            nombre: 'San Luis'
                        },
                        {
                            secuencia: 5,
                            'número': 99,
                            nombre: 'Carara'
                        }
                    ],
                    'número': 16,
                    nombre: 'Turrubares'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 100,
                            nombre: 'Santa María'
                        },
                        {
                            secuencia: 2,
                            'número': 101,
                            nombre: 'Jardín'
                        },
                        {
                            secuencia: 3,
                            'número': 102,
                            nombre: 'Copey'
                        }
                    ],
                    'número': 17,
                    nombre: 'Dota'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 103,
                            nombre: 'Curridabat'
                        },
                        {
                            secuencia: 2,
                            'número': 104,
                            nombre: 'Granadilla'
                        },
                        {
                            secuencia: 3,
                            'número': 105,
                            nombre: 'Sánchez'
                        },
                        {
                            secuencia: 4,
                            'número': 106,
                            nombre: 'Tirrases'
                        }
                    ],
                    'número': 18,
                    nombre: 'Curridabat'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 107,
                            nombre: 'San Isidro de El General'
                        },
                        {
                            secuencia: 2,
                            'número': 108,
                            nombre: 'El General'
                        },
                        {
                            secuencia: 3,
                            'número': 109,
                            nombre: 'Daniel Flores'
                        },
                        {
                            secuencia: 4,
                            'número': 110,
                            nombre: 'Rivas'
                        },
                        {
                            secuencia: 5,
                            'número': 111,
                            nombre: 'San Pedro'
                        },
                        {
                            secuencia: 6,
                            'número': 112,
                            nombre: 'Platanares'
                        },
                        {
                            secuencia: 7,
                            'número': 113,
                            nombre: 'Pejibaye'
                        },
                        {
                            secuencia: 8,
                            'número': 114,
                            nombre: 'Cajón'
                        },
                        {
                            secuencia: 9,
                            'número': 115,
                            nombre: 'Barú'
                        },
                        {
                            secuencia: 10,
                            'número': 116,
                            nombre: 'Río Nuevo'
                        },
                        {
                            secuencia: 11,
                            'número': 117,
                            nombre: 'Páramo'
                        },
                        {
                            secuencia: 12,
                            'número': 118,
                            nombre: 'La Amistad'
                        }
                    ],
                    'número': 19,
                    nombre: 'Pérez Zeledón'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 119,
                            nombre: 'San Pablo'
                        },
                        {
                            secuencia: 2,
                            'número': 120,
                            nombre: 'San Andrés'
                        },
                        {
                            secuencia: 3,
                            'número': 121,
                            nombre: 'Llano Bonito'
                        },
                        {
                            secuencia: 4,
                            'número': 122,
                            nombre: 'San Isidro'
                        },
                        {
                            secuencia: 5,
                            'número': 123,
                            nombre: 'Santa Cruz'
                        },
                        {
                            secuencia: 6,
                            'número': 124,
                            nombre: 'San Antonio'
                        }
                    ],
                    'número': 20,
                    nombre: 'León Cortés Castro'
                }
            ],
            'número': 1,
            nombre: 'San José'
        },
        {
            'cantón': [
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 1,
                            nombre: 'Alajuela'
                        },
                        {
                            secuencia: 2,
                            'número': 2,
                            nombre: 'San José'
                        },
                        {
                            secuencia: 3,
                            'número': 3,
                            nombre: 'Carrizal'
                        },
                        {
                            secuencia: 4,
                            'número': 4,
                            nombre: 'San Antonio'
                        },
                        {
                            secuencia: 5,
                            'número': 5,
                            nombre: 'Guácima'
                        },
                        {
                            secuencia: 6,
                            'número': 6,
                            nombre: 'San Isidro'
                        },
                        {
                            secuencia: 7,
                            'número': 7,
                            nombre: 'Sabanilla'
                        },
                        {
                            secuencia: 8,
                            'número': 8,
                            nombre: 'San Rafael'
                        },
                        {
                            secuencia: 9,
                            'número': 9,
                            nombre: 'Río Segundo'
                        },
                        {
                            secuencia: 10,
                            'número': 10,
                            nombre: 'Desamparados'
                        },
                        {
                            secuencia: 11,
                            'número': 11,
                            nombre: 'Turrúcares'
                        },
                        {
                            secuencia: 12,
                            'número': 12,
                            nombre: 'Tambor'
                        },
                        {
                            secuencia: 13,
                            'número': 13,
                            nombre: 'Garita'
                        },
                        {
                            secuencia: 14,
                            'número': 14,
                            nombre: 'Sarapiquí'
                        }
                    ],
                    'número': 1,
                    nombre: 'Alajuela'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 15,
                            nombre: 'San Ramón'
                        },
                        {
                            secuencia: 2,
                            'número': 16,
                            nombre: 'Santiago'
                        },
                        {
                            secuencia: 3,
                            'número': 17,
                            nombre: 'San Juan'
                        },
                        {
                            secuencia: 4,
                            'número': 18,
                            nombre: 'Piedades Norte'
                        },
                        {
                            secuencia: 5,
                            'número': 19,
                            nombre: 'Piedades Sur'
                        },
                        {
                            secuencia: 6,
                            'número': 20,
                            nombre: 'San Rafael'
                        },
                        {
                            secuencia: 7,
                            'número': 21,
                            nombre: 'San Isidro'
                        },
                        {
                            secuencia: 8,
                            'número': 22,
                            nombre: 'Ángeles'
                        },
                        {
                            secuencia: 9,
                            'número': 23,
                            nombre: 'Alfaro'
                        },
                        {
                            secuencia: 10,
                            'número': 24,
                            nombre: 'Volio'
                        },
                        {
                            secuencia: 11,
                            'número': 25,
                            nombre: 'Concepción'
                        },
                        {
                            secuencia: 12,
                            'número': 26,
                            nombre: 'Zapotal'
                        },
                        {
                            secuencia: 13,
                            'número': 27,
                            nombre: 'Peñas Blancas'
                        },
                        {
                            secuencia: 14,
                            'número': 28,
                            nombre: 'San Lorenzo'
                        }
                    ],
                    'número': 2,
                    nombre: 'San Ramón'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 29,
                            nombre: 'Grecia'
                        },
                        {
                            secuencia: 2,
                            'número': 30,
                            nombre: 'San Isidro'
                        },
                        {
                            secuencia: 3,
                            'número': 31,
                            nombre: 'San José'
                        },
                        {
                            secuencia: 4,
                            'número': 32,
                            nombre: 'San Roque'
                        },
                        {
                            secuencia: 5,
                            'número': 33,
                            nombre: 'Tacares'
                        },
                        {
                            secuencia: 6,
                            'número': 34,
                            nombre: 'Puente de Piedra'
                        },
                        {
                            secuencia: 7,
                            'número': 35,
                            nombre: 'Bolívar'
                        }
                    ],
                    'número': 3,
                    nombre: 'Grecia'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 36,
                            nombre: 'San Mateo'
                        },
                        {
                            secuencia: 2,
                            'número': 37,
                            nombre: 'Desmonte'
                        },
                        {
                            secuencia: 3,
                            'número': 38,
                            nombre: 'Jesús María'
                        },
                        {
                            secuencia: 4,
                            'número': 39,
                            nombre: 'Labrador'
                        }
                    ],
                    'número': 4,
                    nombre: 'San Mateo'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 40,
                            nombre: 'Atenas'
                        },
                        {
                            secuencia: 2,
                            'número': 41,
                            nombre: 'Jesús'
                        },
                        {
                            secuencia: 3,
                            'número': 42,
                            nombre: 'Mercedes'
                        },
                        {
                            secuencia: 4,
                            'número': 43,
                            nombre: 'San Isidro'
                        },
                        {
                            secuencia: 5,
                            'número': 44,
                            nombre: 'Concepción'
                        },
                        {
                            secuencia: 6,
                            'número': 45,
                            nombre: 'San José'
                        },
                        {
                            secuencia: 7,
                            'número': 46,
                            nombre: 'Santa Eulalia'
                        },
                        {
                            secuencia: 8,
                            'número': 47,
                            nombre: 'Escobal'
                        }
                    ],
                    'número': 5,
                    nombre: 'Atenas'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 48,
                            nombre: 'Naranjo'
                        },
                        {
                            secuencia: 2,
                            'número': 49,
                            nombre: 'San Miguel'
                        },
                        {
                            secuencia: 3,
                            'número': 50,
                            nombre: 'San José'
                        },
                        {
                            secuencia: 4,
                            'número': 51,
                            nombre: 'Cirrí'
                        },
                        {
                            secuencia: 5,
                            'número': 52,
                            nombre: 'San Jerónimo'
                        },
                        {
                            secuencia: 6,
                            'número': 53,
                            nombre: 'San Juan'
                        },
                        {
                            secuencia: 7,
                            'número': 54,
                            nombre: 'El Rosario'
                        },
                        {
                            secuencia: 8,
                            'número': 55,
                            nombre: 'Palmitos'
                        }
                    ],
                    'número': 6,
                    nombre: 'Naranjo'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 56,
                            nombre: 'Palmares'
                        },
                        {
                            secuencia: 2,
                            'número': 57,
                            nombre: 'Zaragoza'
                        },
                        {
                            secuencia: 3,
                            'número': 58,
                            nombre: 'Buenos Aires'
                        },
                        {
                            secuencia: 4,
                            'número': 59,
                            nombre: 'Santiago'
                        },
                        {
                            secuencia: 5,
                            'número': 60,
                            nombre: 'Candelaria'
                        },
                        {
                            secuencia: 6,
                            'número': 61,
                            nombre: 'Esquipulas'
                        },
                        {
                            secuencia: 7,
                            'número': 62,
                            nombre: 'La Granja'
                        }
                    ],
                    'número': 7,
                    nombre: 'Palmares'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 63,
                            nombre: 'San Pedro'
                        },
                        {
                            secuencia: 2,
                            'número': 64,
                            nombre: 'San Juan'
                        },
                        {
                            secuencia: 3,
                            'número': 65,
                            nombre: 'San Rafael'
                        },
                        {
                            secuencia: 4,
                            'número': 66,
                            nombre: 'Carrillos'
                        },
                        {
                            secuencia: 5,
                            'número': 67,
                            nombre: 'Sabana Redonda'
                        }
                    ],
                    'número': 8,
                    nombre: 'Poás'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 68,
                            nombre: 'Orotina'
                        },
                        {
                            secuencia: 2,
                            'número': 69,
                            nombre: 'Mastate'
                        },
                        {
                            secuencia: 3,
                            'número': 70,
                            nombre: 'Hacienda Vieja'
                        },
                        {
                            secuencia: 4,
                            'número': 71,
                            nombre: 'Coyolar'
                        },
                        {
                            secuencia: 5,
                            'número': 72,
                            nombre: 'La Ceiba'
                        }
                    ],
                    'número': 9,
                    nombre: 'Orotina'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 73,
                            nombre: 'Quesada'
                        },
                        {
                            secuencia: 2,
                            'número': 74,
                            nombre: 'Florencia'
                        },
                        {
                            secuencia: 3,
                            'número': 75,
                            nombre: 'Buenavista'
                        },
                        {
                            secuencia: 4,
                            'número': 76,
                            nombre: 'Aguas Zarcas'
                        },
                        {
                            secuencia: 5,
                            'número': 77,
                            nombre: 'Venecia'
                        },
                        {
                            secuencia: 6,
                            'número': 78,
                            nombre: 'Pital'
                        },
                        {
                            secuencia: 7,
                            'número': 79,
                            nombre: 'La Fortuna'
                        },
                        {
                            secuencia: 8,
                            'número': 80,
                            nombre: 'La Tigra'
                        },
                        {
                            secuencia: 9,
                            'número': 81,
                            nombre: 'La Palmera'
                        },
                        {
                            secuencia: 10,
                            'número': 82,
                            nombre: 'Venado'
                        },
                        {
                            secuencia: 11,
                            'número': 83,
                            nombre: 'Cutris'
                        },
                        {
                            secuencia: 12,
                            'número': 84,
                            nombre: 'Monterrey'
                        },
                        {
                            secuencia: 13,
                            'número': 85,
                            nombre: 'Pocosol'
                        }
                    ],
                    'número': 10,
                    nombre: 'San Carlos'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 86,
                            nombre: 'Zarcero'
                        },
                        {
                            secuencia: 2,
                            'número': 87,
                            nombre: 'Laguna'
                        },
                        {
                            secuencia: 3,
                            'número': 88,
                            nombre: 'Tapezco'
                        },
                        {
                            secuencia: 4,
                            'número': 89,
                            nombre: 'Guadalupe'
                        },
                        {
                            secuencia: 5,
                            'número': 90,
                            nombre: 'Palmira'
                        },
                        {
                            secuencia: 6,
                            'número': 91,
                            nombre: 'Zapote'
                        },
                        {
                            secuencia: 7,
                            'número': 92,
                            nombre: 'Brisas'
                        }
                    ],
                    'número': 11,
                    nombre: 'Zarcero'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 93,
                            nombre: 'Sarchí Norte'
                        },
                        {
                            secuencia: 2,
                            'número': 94,
                            nombre: 'Sarchí Sur'
                        },
                        {
                            secuencia: 3,
                            'número': 95,
                            nombre: 'Toro Amarillo'
                        },
                        {
                            secuencia: 4,
                            'número': 96,
                            nombre: 'San Pedro'
                        },
                        {
                            secuencia: 5,
                            'número': 97,
                            nombre: 'Rodríguez'
                        }
                    ],
                    'número': 12,
                    nombre: 'Valverde Vega'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 98,
                            nombre: 'Upala'
                        },
                        {
                            secuencia: 2,
                            'número': 99,
                            nombre: 'Aguas Claras'
                        },
                        {
                            secuencia: 3,
                            'número': 100,
                            nombre: 'San José (Pizote)'
                        },
                        {
                            secuencia: 4,
                            'número': 101,
                            nombre: 'Bijagua'
                        },
                        {
                            secuencia: 5,
                            'número': 102,
                            nombre: 'Delicias'
                        },
                        {
                            secuencia: 6,
                            'número': 103,
                            nombre: 'Dos Ríos'
                        },
                        {
                            secuencia: 7,
                            'número': 104,
                            nombre: 'Yolillal'
                        },
                        {
                            secuencia: 8,
                            'número': 105,
                            nombre: 'Canalete'
                        }
                    ],
                    'número': 13,
                    nombre: 'Upala'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 106,
                            nombre: 'Los Chiles'
                        },
                        {
                            secuencia: 2,
                            'número': 107,
                            nombre: 'Caño Negro'
                        },
                        {
                            secuencia: 3,
                            'número': 108,
                            nombre: 'El Amparo'
                        },
                        {
                            secuencia: 4,
                            'número': 109,
                            nombre: 'San Jorge'
                        }
                    ],
                    'número': 14,
                    nombre: 'Los Chiles'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 110,
                            nombre: 'San Rafael'
                        },
                        {
                            secuencia: 2,
                            'número': 111,
                            nombre: 'Buenavista'
                        },
                        {
                            secuencia: 3,
                            'número': 112,
                            nombre: 'Cote'
                        },
                        {
                            secuencia: 4,
                            'número': 113,
                            nombre: 'Katira'
                        }
                    ],
                    'número': 15,
                    nombre: 'Guatuso'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 114,
                            nombre: 'Río Cuarto'
                        },
                        {
                            secuencia: 2,
                            'número': 115,
                            nombre: 'Santa Isabel'
                        },
                        {
                            secuencia: 3,
                            'número': 116,
                            nombre: 'Santa Rita'
                        }
                    ],
                    'número': 16,
                    nombre: 'Río Cuarto'
                }
            ],
            'número': 2,
            nombre: 'Alajuela'
        },
        {
            'cantón': [
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 1,
                            nombre: 'Oriental'
                        },
                        {
                            secuencia: 2,
                            'número': 2,
                            nombre: 'Occidental'
                        },
                        {
                            secuencia: 3,
                            'número': 3,
                            nombre: 'Carmen'
                        },
                        {
                            secuencia: 4,
                            'número': 4,
                            nombre: 'San Nicolás'
                        },
                        {
                            secuencia: 5,
                            'número': 5,
                            nombre: 'Agua Caliente (San Francisco)'
                        },
                        {
                            secuencia: 6,
                            'número': 6,
                            nombre: 'Guadalupe (Arenilla)'
                        },
                        {
                            secuencia: 7,
                            'número': 7,
                            nombre: 'Corralillo'
                        },
                        {
                            secuencia: 8,
                            'número': 8,
                            nombre: 'Tierra Blanca'
                        },
                        {
                            secuencia: 9,
                            'número': 9,
                            nombre: 'Dulce Nombre'
                        },
                        {
                            secuencia: 10,
                            'número': 10,
                            nombre: 'Llano Grande'
                        },
                        {
                            secuencia: 11,
                            'número': 11,
                            nombre: 'Quebradilla'
                        }
                    ],
                    'número': 1,
                    nombre: 'Cartago'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 12,
                            nombre: 'Paraíso'
                        },
                        {
                            secuencia: 2,
                            'número': 13,
                            nombre: 'Santiago de Paraíso'
                        },
                        {
                            secuencia: 3,
                            'número': 14,
                            nombre: 'Orosi'
                        },
                        {
                            secuencia: 4,
                            'número': 15,
                            nombre: 'Cachí'
                        },
                        {
                            secuencia: 5,
                            'número': 16,
                            nombre: 'Llanos de Santa Lucía'
                        }
                    ],
                    'número': 2,
                    nombre: 'Paraíso'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 17,
                            nombre: 'Tres Ríos'
                        },
                        {
                            secuencia: 2,
                            'número': 18,
                            nombre: 'San Diego'
                        },
                        {
                            secuencia: 3,
                            'número': 19,
                            nombre: 'San Juan'
                        },
                        {
                            secuencia: 4,
                            'número': 20,
                            nombre: 'San Rafael'
                        },
                        {
                            secuencia: 5,
                            'número': 21,
                            nombre: 'Concepción'
                        },
                        {
                            secuencia: 6,
                            'número': 22,
                            nombre: 'Dulce Nombre'
                        },
                        {
                            secuencia: 7,
                            'número': 23,
                            nombre: 'San Ramón'
                        },
                        {
                            secuencia: 8,
                            'número': 24,
                            nombre: 'Río Azul'
                        }
                    ],
                    'número': 3,
                    nombre: 'La Unión'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 25,
                            nombre: 'Juan Viñas'
                        },
                        {
                            secuencia: 2,
                            'número': 26,
                            nombre: 'Tucurrique'
                        },
                        {
                            secuencia: 3,
                            'número': 27,
                            nombre: 'Pejibaye'
                        }
                    ],
                    'número': 4,
                    nombre: 'Jiménez'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 28,
                            nombre: 'Turrialba'
                        },
                        {
                            secuencia: 2,
                            'número': 29,
                            nombre: 'La Suiza'
                        },
                        {
                            secuencia: 3,
                            'número': 30,
                            nombre: 'Peralta'
                        },
                        {
                            secuencia: 4,
                            'número': 31,
                            nombre: 'Santa Cruz'
                        },
                        {
                            secuencia: 5,
                            'número': 32,
                            nombre: 'Santa Teresita'
                        },
                        {
                            secuencia: 6,
                            'número': 33,
                            nombre: 'Pavones'
                        },
                        {
                            secuencia: 7,
                            'número': 34,
                            nombre: 'Tuis'
                        },
                        {
                            secuencia: 8,
                            'número': 35,
                            nombre: 'Tayutic'
                        },
                        {
                            secuencia: 9,
                            'número': 36,
                            nombre: 'Santa Rosa'
                        },
                        {
                            secuencia: 10,
                            'número': 37,
                            nombre: 'Tres Equis'
                        },
                        {
                            secuencia: 11,
                            'número': 38,
                            nombre: 'La Isabel'
                        },
                        {
                            secuencia: 12,
                            'número': 39,
                            nombre: 'Chirripó'
                        }
                    ],
                    'número': 5,
                    nombre: 'Turrialba'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 40,
                            nombre: 'Pacayas'
                        },
                        {
                            secuencia: 2,
                            'número': 41,
                            nombre: 'Cervantes'
                        },
                        {
                            secuencia: 3,
                            'número': 42,
                            nombre: 'Capellades'
                        }
                    ],
                    'número': 6,
                    nombre: 'Alvarado'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 43,
                            nombre: 'San Rafael'
                        },
                        {
                            secuencia: 2,
                            'número': 44,
                            nombre: 'Cot'
                        },
                        {
                            secuencia: 3,
                            'número': 45,
                            nombre: 'Potrero Cerrado'
                        },
                        {
                            secuencia: 4,
                            'número': 46,
                            nombre: 'Cipreses'
                        },
                        {
                            secuencia: 5,
                            'número': 47,
                            nombre: 'Santa Rosa'
                        }
                    ],
                    'número': 7,
                    nombre: 'Oreamuno'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 48,
                            nombre: 'Tejar'
                        },
                        {
                            secuencia: 2,
                            'número': 49,
                            nombre: 'San Isidro'
                        },
                        {
                            secuencia: 3,
                            'número': 50,
                            nombre: 'Tobosi'
                        },
                        {
                            secuencia: 4,
                            'número': 51,
                            nombre: 'Patio de Agua'
                        }
                    ],
                    'número': 8,
                    nombre: 'El Guarco'
                }
            ],
            'número': 3,
            nombre: 'Cartago'
        },
        {
            'cantón': [
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 1,
                            nombre: 'Heredia'
                        },
                        {
                            secuencia: 2,
                            'número': 2,
                            nombre: 'Mercedes'
                        },
                        {
                            secuencia: 3,
                            'número': 3,
                            nombre: 'San Francisco'
                        },
                        {
                            secuencia: 4,
                            'número': 4,
                            nombre: 'Ulloa'
                        },
                        {
                            secuencia: 5,
                            'número': 5,
                            nombre: 'Vara Blanca'
                        }
                    ],
                    'número': 1,
                    nombre: 'Heredia'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 6,
                            nombre: 'Barva'
                        },
                        {
                            secuencia: 2,
                            'número': 7,
                            nombre: 'San Pedro'
                        },
                        {
                            secuencia: 3,
                            'número': 8,
                            nombre: 'San Pablo'
                        },
                        {
                            secuencia: 4,
                            'número': 9,
                            nombre: 'San Roque'
                        },
                        {
                            secuencia: 5,
                            'número': 10,
                            nombre: 'Santa Lucía'
                        },
                        {
                            secuencia: 6,
                            'número': 11,
                            nombre: 'San José de la Montaña'
                        }
                    ],
                    'número': 2,
                    nombre: 'Barva'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 12,
                            nombre: 'Santo Domingo'
                        },
                        {
                            secuencia: 2,
                            'número': 13,
                            nombre: 'San Vicente'
                        },
                        {
                            secuencia: 3,
                            'número': 14,
                            nombre: 'San Miguel'
                        },
                        {
                            secuencia: 4,
                            'número': 15,
                            nombre: 'Paracito'
                        },
                        {
                            secuencia: 5,
                            'número': 16,
                            nombre: 'Santo Tomás'
                        },
                        {
                            secuencia: 6,
                            'número': 17,
                            nombre: 'Santa Rosa'
                        },
                        {
                            secuencia: 7,
                            'número': 18,
                            nombre: 'Tures'
                        },
                        {
                            secuencia: 8,
                            'número': 19,
                            nombre: 'Pará'
                        }
                    ],
                    'número': 3,
                    nombre: 'Santo Domingo'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 20,
                            nombre: 'Santa Bárbara'
                        },
                        {
                            secuencia: 2,
                            'número': 21,
                            nombre: 'San Pedro'
                        },
                        {
                            secuencia: 3,
                            'número': 22,
                            nombre: 'San Juan'
                        },
                        {
                            secuencia: 4,
                            'número': 23,
                            nombre: 'Jesús'
                        },
                        {
                            secuencia: 5,
                            'número': 24,
                            nombre: 'Santo Domingo'
                        },
                        {
                            secuencia: 6,
                            'número': 25,
                            nombre: 'Purabá'
                        }
                    ],
                    'número': 4,
                    nombre: 'Santa Bárbara'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 26,
                            nombre: 'San Rafael'
                        },
                        {
                            secuencia: 2,
                            'número': 27,
                            nombre: 'San Josecito'
                        },
                        {
                            secuencia: 3,
                            'número': 28,
                            nombre: 'Santiago'
                        },
                        {
                            secuencia: 4,
                            'número': 29,
                            nombre: 'Ángeles'
                        },
                        {
                            secuencia: 5,
                            'número': 30,
                            nombre: 'Concepción'
                        }
                    ],
                    'número': 5,
                    nombre: 'San Rafael'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 31,
                            nombre: 'San Isidro'
                        },
                        {
                            secuencia: 2,
                            'número': 32,
                            nombre: 'San José'
                        },
                        {
                            secuencia: 3,
                            'número': 33,
                            nombre: 'Concepción'
                        },
                        {
                            secuencia: 4,
                            'número': 34,
                            nombre: 'San Francisco'
                        }
                    ],
                    'número': 6,
                    nombre: 'San Isidro'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 35,
                            nombre: 'San Antonio'
                        },
                        {
                            secuencia: 2,
                            'número': 36,
                            nombre: 'La Ribera'
                        },
                        {
                            secuencia: 3,
                            'número': 37,
                            nombre: 'La Asunción'
                        }
                    ],
                    'número': 7,
                    nombre: 'Belén'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 38,
                            nombre: 'San Joaquín'
                        },
                        {
                            secuencia: 2,
                            'número': 39,
                            nombre: 'Barrantes'
                        },
                        {
                            secuencia: 3,
                            'número': 40,
                            nombre: 'Llorente'
                        }
                    ],
                    'número': 8,
                    nombre: 'Flores'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 41,
                            nombre: 'San Pablo'
                        },
                        {
                            secuencia: 2,
                            'número': 42,
                            nombre: 'Rincón de Sabanilla'
                        }
                    ],
                    'número': 9,
                    nombre: 'San Pablo'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 43,
                            nombre: 'Puerto Viejo'
                        },
                        {
                            secuencia: 2,
                            'número': 44,
                            nombre: 'La Virgen'
                        },
                        {
                            secuencia: 3,
                            'número': 45,
                            nombre: 'Horquetas'
                        },
                        {
                            secuencia: 4,
                            'número': 46,
                            nombre: 'Llanuras del Gaspar'
                        },
                        {
                            secuencia: 5,
                            'número': 47,
                            nombre: 'Cureña'
                        }
                    ],
                    'número': 10,
                    nombre: 'Sarapiquí'
                }
            ],
            'número': 4,
            nombre: 'Heredia'
        },
        {
            'cantón': [
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 1,
                            nombre: 'Liberia'
                        },
                        {
                            secuencia: 2,
                            'número': 2,
                            nombre: 'Cañas Dulces'
                        },
                        {
                            secuencia: 3,
                            'número': 3,
                            nombre: 'Mayorga'
                        },
                        {
                            secuencia: 4,
                            'número': 4,
                            nombre: 'Nacascolo'
                        },
                        {
                            secuencia: 5,
                            'número': 5,
                            nombre: 'Curubandé'
                        }
                    ],
                    'número': 1,
                    nombre: 'Liberia'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 6,
                            nombre: 'Nicoya'
                        },
                        {
                            secuencia: 2,
                            'número': 7,
                            nombre: 'Mansión'
                        },
                        {
                            secuencia: 3,
                            'número': 8,
                            nombre: 'San Antonio'
                        },
                        {
                            secuencia: 4,
                            'número': 9,
                            nombre: 'Quebrada Honda'
                        },
                        {
                            secuencia: 5,
                            'número': 10,
                            nombre: 'Sámara'
                        },
                        {
                            secuencia: 6,
                            'número': 11,
                            nombre: 'Nosara'
                        },
                        {
                            secuencia: 7,
                            'número': 12,
                            nombre: 'Belén de Nosarita'
                        }
                    ],
                    'número': 2,
                    nombre: 'Nicoya'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 13,
                            nombre: 'Santa Cruz'
                        },
                        {
                            secuencia: 2,
                            'número': 14,
                            nombre: 'Bolsón'
                        },
                        {
                            secuencia: 3,
                            'número': 15,
                            nombre: 'Veintisiete de Abril'
                        },
                        {
                            secuencia: 4,
                            'número': 16,
                            nombre: 'Tempate'
                        },
                        {
                            secuencia: 5,
                            'número': 17,
                            nombre: 'Cartagena'
                        },
                        {
                            secuencia: 6,
                            'número': 18,
                            nombre: 'Cuajiniquil'
                        },
                        {
                            secuencia: 7,
                            'número': 19,
                            nombre: 'Diriá'
                        },
                        {
                            secuencia: 8,
                            'número': 20,
                            nombre: 'Cabo Velas'
                        },
                        {
                            secuencia: 9,
                            'número': 21,
                            nombre: 'Tamarindo'
                        }
                    ],
                    'número': 3,
                    nombre: 'Santa Cruz'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 22,
                            nombre: 'Bagaces'
                        },
                        {
                            secuencia: 2,
                            'número': 23,
                            nombre: 'La Fortuna'
                        },
                        {
                            secuencia: 3,
                            'número': 24,
                            nombre: 'Mogote'
                        },
                        {
                            secuencia: 4,
                            'número': 25,
                            nombre: 'Río Naranjo'
                        }
                    ],
                    'número': 4,
                    nombre: 'Bagaces'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 26,
                            nombre: 'Filadelfia'
                        },
                        {
                            secuencia: 2,
                            'número': 27,
                            nombre: 'Palmira'
                        },
                        {
                            secuencia: 3,
                            'número': 28,
                            nombre: 'Sardinal'
                        },
                        {
                            secuencia: 4,
                            'número': 29,
                            nombre: 'Belén'
                        }
                    ],
                    'número': 5,
                    nombre: 'Carrillo'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 30,
                            nombre: 'Cañas'
                        },
                        {
                            secuencia: 2,
                            'número': 31,
                            nombre: 'Palmira'
                        },
                        {
                            secuencia: 3,
                            'número': 32,
                            nombre: 'San Miguel'
                        },
                        {
                            secuencia: 4,
                            'número': 33,
                            nombre: 'Bebedero'
                        },
                        {
                            secuencia: 5,
                            'número': 34,
                            nombre: 'Porozal'
                        }
                    ],
                    'número': 6,
                    nombre: 'Cañas'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 35,
                            nombre: 'Las Juntas'
                        },
                        {
                            secuencia: 2,
                            'número': 36,
                            nombre: 'Sierra'
                        },
                        {
                            secuencia: 3,
                            'número': 37,
                            nombre: 'San Juan'
                        },
                        {
                            secuencia: 4,
                            'número': 38,
                            nombre: 'Colorado'
                        }
                    ],
                    'número': 7,
                    nombre: 'Abangares'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 39,
                            nombre: 'Tilarán'
                        },
                        {
                            secuencia: 2,
                            'número': 40,
                            nombre: 'Quebrada Grande'
                        },
                        {
                            secuencia: 3,
                            'número': 41,
                            nombre: 'Tronadora'
                        },
                        {
                            secuencia: 4,
                            'número': 42,
                            nombre: 'Santa Rosa'
                        },
                        {
                            secuencia: 5,
                            'número': 43,
                            nombre: 'Líbano'
                        },
                        {
                            secuencia: 6,
                            'número': 44,
                            nombre: 'Tierras Morenas'
                        },
                        {
                            secuencia: 7,
                            'número': 45,
                            nombre: 'Arenal'
                        }
                    ],
                    'número': 8,
                    nombre: 'Tilarán'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 46,
                            nombre: 'Carmona'
                        },
                        {
                            secuencia: 2,
                            'número': 47,
                            nombre: 'Santa Rita'
                        },
                        {
                            secuencia: 3,
                            'número': 48,
                            nombre: 'Zapotal'
                        },
                        {
                            secuencia: 4,
                            'número': 49,
                            nombre: 'San Pablo'
                        },
                        {
                            secuencia: 5,
                            'número': 50,
                            nombre: 'Porvenir'
                        },
                        {
                            secuencia: 6,
                            'número': 51,
                            nombre: 'Bejuco'
                        }
                    ],
                    'número': 9,
                    nombre: 'Nandayure'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 52,
                            nombre: 'La Cruz'
                        },
                        {
                            secuencia: 2,
                            'número': 53,
                            nombre: 'Santa Cecilia'
                        },
                        {
                            secuencia: 3,
                            'número': 54,
                            nombre: 'La Garita'
                        },
                        {
                            secuencia: 4,
                            'número': 55,
                            nombre: 'Santa Elena'
                        }
                    ],
                    'número': 10,
                    nombre: 'La Cruz'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 56,
                            nombre: 'Hojancha'
                        },
                        {
                            secuencia: 2,
                            'número': 57,
                            nombre: 'Monte Romo'
                        },
                        {
                            secuencia: 3,
                            'número': 58,
                            nombre: 'Puerto Carrillo'
                        },
                        {
                            secuencia: 4,
                            'número': 59,
                            nombre: 'Huacas'
                        },
                        {
                            secuencia: 5,
                            'número': 60,
                            nombre: 'Matambú'
                        }
                    ],
                    'número': 11,
                    nombre: 'Hojancha'
                }
            ],
            'número': 5,
            nombre: 'Guanacaste'
        },
        {
            'cantón': [
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 1,
                            nombre: 'Puntarenas'
                        },
                        {
                            secuencia: 2,
                            'número': 2,
                            nombre: 'Pitahaya'
                        },
                        {
                            secuencia: 3,
                            'número': 3,
                            nombre: 'Chomes'
                        },
                        {
                            secuencia: 4,
                            'número': 4,
                            nombre: 'Lepanto'
                        },
                        {
                            secuencia: 5,
                            'número': 5,
                            nombre: 'Paquera'
                        },
                        {
                            secuencia: 6,
                            'número': 6,
                            nombre: 'Manzanillo'
                        },
                        {
                            secuencia: 7,
                            'número': 7,
                            nombre: 'Guacimal'
                        },
                        {
                            secuencia: 8,
                            'número': 8,
                            nombre: 'Barranca'
                        },
                        {
                            secuencia: 9,
                            'número': 9,
                            nombre: 'Monteverde'
                        },
                        {
                            secuencia: 10,
                            'número': 10,
                            nombre: 'Isla del Coco'
                        },
                        {
                            secuencia: 11,
                            'número': 11,
                            nombre: 'Cóbano'
                        },
                        {
                            secuencia: 12,
                            'número': 12,
                            nombre: 'Chacarita'
                        },
                        {
                            secuencia: 13,
                            'número': 13,
                            nombre: 'Chira'
                        },
                        {
                            secuencia: 14,
                            'número': 14,
                            nombre: 'Acapulco'
                        },
                        {
                            secuencia: 15,
                            'número': 15,
                            nombre: 'El Roble'
                        },
                        {
                            secuencia: 16,
                            'número': 16,
                            nombre: 'Arancibia'
                        }
                    ],
                    'número': 1,
                    nombre: 'Puntarenas'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 17,
                            nombre: 'Espíritu Santo'
                        },
                        {
                            secuencia: 2,
                            'número': 18,
                            nombre: 'San Juan Grande'
                        },
                        {
                            secuencia: 3,
                            'número': 19,
                            nombre: 'Macacona'
                        },
                        {
                            secuencia: 4,
                            'número': 20,
                            nombre: 'San Rafael'
                        },
                        {
                            secuencia: 5,
                            'número': 21,
                            nombre: 'San Jerónimo'
                        },
                        {
                            secuencia: 6,
                            'número': 22,
                            nombre: 'Caldera'
                        }
                    ],
                    'número': 2,
                    nombre: 'Esparza'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 23,
                            nombre: 'Buenos Aires'
                        },
                        {
                            secuencia: 2,
                            'número': 24,
                            nombre: 'Volcán'
                        },
                        {
                            secuencia: 3,
                            'número': 25,
                            nombre: 'Potrero Grande'
                        },
                        {
                            secuencia: 4,
                            'número': 26,
                            nombre: 'Boruca'
                        },
                        {
                            secuencia: 5,
                            'número': 27,
                            nombre: 'Pilas'
                        },
                        {
                            secuencia: 6,
                            'número': 28,
                            nombre: 'Colinas'
                        },
                        {
                            secuencia: 7,
                            'número': 29,
                            nombre: 'Chánguena'
                        },
                        {
                            secuencia: 8,
                            'número': 30,
                            nombre: 'Biolley'
                        },
                        {
                            secuencia: 9,
                            'número': 31,
                            nombre: 'Brunka'
                        }
                    ],
                    'número': 3,
                    nombre: 'Buenos Aires'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 32,
                            nombre: 'Miramar'
                        },
                        {
                            secuencia: 2,
                            'número': 33,
                            nombre: 'La Unión'
                        },
                        {
                            secuencia: 3,
                            'número': 34,
                            nombre: 'San Isidro'
                        }
                    ],
                    'número': 4,
                    nombre: 'Montes de Oro'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 35,
                            nombre: 'Cortés'
                        },
                        {
                            secuencia: 2,
                            'número': 36,
                            nombre: 'Palmar'
                        },
                        {
                            secuencia: 3,
                            'número': 37,
                            nombre: 'Sierpe'
                        },
                        {
                            secuencia: 4,
                            'número': 38,
                            nombre: 'Bahía Ballena'
                        },
                        {
                            secuencia: 5,
                            'número': 39,
                            nombre: 'Piedras Blancas'
                        },
                        {
                            secuencia: 6,
                            'número': 40,
                            nombre: 'Bahía Drake'
                        }
                    ],
                    'número': 5,
                    nombre: 'Osa'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 41,
                            nombre: 'Quepos'
                        },
                        {
                            secuencia: 2,
                            'número': 42,
                            nombre: 'Savegre'
                        },
                        {
                            secuencia: 3,
                            'número': 43,
                            nombre: 'Naranjito'
                        }
                    ],
                    'número': 6,
                    nombre: 'Quepos'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 44,
                            nombre: 'Golfito'
                        },
                        {
                            secuencia: 2,
                            'número': 45,
                            nombre: 'Puerto Jiménez'
                        },
                        {
                            secuencia: 3,
                            'número': 46,
                            nombre: 'Guaycará'
                        },
                        {
                            secuencia: 4,
                            'número': 47,
                            nombre: 'Pavón'
                        }
                    ],
                    'número': 7,
                    nombre: 'Golfito'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 48,
                            nombre: 'San Vito'
                        },
                        {
                            secuencia: 2,
                            'número': 49,
                            nombre: 'Sabalito'
                        },
                        {
                            secuencia: 3,
                            'número': 50,
                            nombre: 'Aguabuena'
                        },
                        {
                            secuencia: 4,
                            'número': 51,
                            nombre: 'Limoncito'
                        },
                        {
                            secuencia: 5,
                            'número': 52,
                            nombre: 'Pittier'
                        },
                        {
                            secuencia: 6,
                            'número': 53,
                            nombre: 'Gutiérrez Brown'
                        }
                    ],
                    'número': 8,
                    nombre: 'Coto Brus'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 54,
                            nombre: 'Parrita'
                        }
                    ],
                    'número': 9,
                    nombre: 'Parrita'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 55,
                            nombre: 'Corredor'
                        },
                        {
                            secuencia: 2,
                            'número': 56,
                            nombre: 'La Cuesta'
                        },
                        {
                            secuencia: 3,
                            'número': 57,
                            nombre: 'Paso Canoas'
                        },
                        {
                            secuencia: 4,
                            'número': 58,
                            nombre: 'Laurel'
                        }
                    ],
                    'número': 10,
                    nombre: 'Corredores'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 59,
                            nombre: 'Jacó'
                        },
                        {
                            secuencia: 2,
                            'número': 60,
                            nombre: 'Tárcoles'
                        }
                    ],
                    'número': 11,
                    nombre: 'Garabito'
                }
            ],
            'número': 6,
            nombre: 'Puntarenas'
        },
        {
            'cantón': [
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 1,
                            nombre: 'Limón'
                        },
                        {
                            secuencia: 2,
                            'número': 2,
                            nombre: 'Valle La Estrella'
                        },
                        {
                            secuencia: 3,
                            'número': 3,
                            nombre: 'Río Blanco'
                        },
                        {
                            secuencia: 4,
                            'número': 4,
                            nombre: 'Matama'
                        }
                    ],
                    'número': 1,
                    nombre: 'Limón'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 5,
                            nombre: 'Guápiles'
                        },
                        {
                            secuencia: 2,
                            'número': 6,
                            nombre: 'Jiménez'
                        },
                        {
                            secuencia: 3,
                            'número': 7,
                            nombre: 'La Rita'
                        },
                        {
                            secuencia: 4,
                            'número': 8,
                            nombre: 'Roxana'
                        },
                        {
                            secuencia: 5,
                            'número': 9,
                            nombre: 'Cariari'
                        },
                        {
                            secuencia: 6,
                            'número': 10,
                            nombre: 'Colorado'
                        },
                        {
                            secuencia: 7,
                            'número': 11,
                            nombre: 'La Colonia'
                        }
                    ],
                    'número': 2,
                    nombre: 'Pococí'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 12,
                            nombre: 'Siquirres'
                        },
                        {
                            secuencia: 2,
                            'número': 13,
                            nombre: 'Pacuarito'
                        },
                        {
                            secuencia: 3,
                            'número': 14,
                            nombre: 'Florida'
                        },
                        {
                            secuencia: 4,
                            'número': 15,
                            nombre: 'Germania'
                        },
                        {
                            secuencia: 5,
                            'número': 16,
                            nombre: 'Cairo'
                        },
                        {
                            secuencia: 6,
                            'número': 17,
                            nombre: 'Alegría'
                        }
                    ],
                    'número': 3,
                    nombre: 'Siquirres'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 18,
                            nombre: 'Bratsi'
                        },
                        {
                            secuencia: 2,
                            'número': 19,
                            nombre: 'Sixaola'
                        },
                        {
                            secuencia: 3,
                            'número': 20,
                            nombre: 'Cahuita'
                        },
                        {
                            secuencia: 4,
                            'número': 21,
                            nombre: 'Telire'
                        }
                    ],
                    'número': 4,
                    nombre: 'Talamanca'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 22,
                            nombre: 'Matina'
                        },
                        {
                            secuencia: 2,
                            'número': 23,
                            nombre: 'Batán'
                        },
                        {
                            secuencia: 3,
                            'número': 24,
                            nombre: 'Carrandi'
                        }
                    ],
                    'número': 5,
                    nombre: 'Matina'
                },
                {
                    distrito: [
                        {
                            secuencia: 1,
                            'número': 25,
                            nombre: 'Guácimo'
                        },
                        {
                            secuencia: 2,
                            'número': 26,
                            nombre: 'Mercedes'
                        },
                        {
                            secuencia: 3,
                            'número': 27,
                            nombre: 'Pocora'
                        },
                        {
                            secuencia: 4,
                            'número': 28,
                            nombre: 'Río Jiménez'
                        },
                        {
                            secuencia: 5,
                            'número': 29,
                            nombre: 'Duacarí'
                        }
                    ],
                    'número': 6,
                    nombre: 'Guácimo'
                }
            ],
            'número': 7,
            nombre: 'Limón'
        }
    ]
}