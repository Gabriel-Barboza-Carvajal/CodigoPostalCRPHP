<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <link rel="shortcut icon" href="2.png">
        <script src="newjavascript.js" type="text/javascript"></script>
        <link href="default.css" rel="stylesheet" type="text/css"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--BOSTRAP CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <!--BOSTRAP JS -->        
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

        <title>Código Postal CR</title>
    </head>
    <body>

        <div id="wrapper" class="">
            <div id="contents" class="">
                <div id="menu">
                    <section>
                        <p><strong><h2>Menú para Código Postal</h2></strong></p>
                        <!--<strong> <a href="https:github.com/Gabriel-Barboza-Carvajal/CodigoPostalCRPHP">Source Code</a></strong>-->
                        <p style="font-size: 20px;"><strong>Provincia : </strong></p>
                        <select id="MenuProvincia" onchange="filtrarMenuCanton()">

                        </select>
                        <p style="font-size: 20px;"><strong>Canton : </strong></p>
                        <select id="MenuCanton" onchange="filtrarMenuDistrito()" >

                        </select>
                        <p style="font-size: 20px;"><strong>Distrito : </strong></p>
                        <select id="MenuDistrito" onchange="calcularCodigo()">

                        </select>
                    </section>
                </div>

                <p id="MostrarCodigo">
                    <strong>El Codigo es:</strong>
                    <strong><span id="codigo">(No hay ninguna opción seleccionada)</span></strong>
                </p>           
            </div>
            
        </div>
    </body>
</html>
