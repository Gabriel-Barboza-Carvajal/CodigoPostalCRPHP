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
        <title>Código Postal CR</title>
    </head>
      <body>

        <div id="wrapper">
            <header></header>
            <div id="contents">
                <div id="menu">
                    <section>
                        <p><strong><h2>Menú para Código Postal</h2></strong></p>
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
                <div id="MostrarCodigo">
                    <p >
                        <strong>El Codigo es:</strong>
                        <strong><span id="codigo">(No hay ninguna opción seleccionada)</span></strong>
                    </p>
                </div>               
            </div>
            <footer>
                
            </footer>
        </div>
    </body>
</html>
