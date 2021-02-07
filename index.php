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
        
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!-- Tell the browser to be responsive to screen width -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
        <!-- Ionicons -->
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <!-- Tempusdominus Bbootstrap 4 -->
        <link rel="stylesheet" href="plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
        <!-- iCheck -->
        <link rel="stylesheet" href="plugins/icheck-bootstrap/icheck-bootstrap.min.css">
        <!-- JQVMap -->
        <link rel="stylesheet" href="plugins/jqvmap/jqvmap.min.css">
        <!-- Theme style -->
        <link rel="stylesheet" href="dist/css/adminlte.css">
        <!-- overlayScrollbars -->
        <link rel="stylesheet" href="plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
        <!-- Daterange picker -->
        <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker.css">
        <!-- summernote -->
        <link rel="stylesheet" href="plugins/summernote/summernote-bs4.css">
        <!-- Google Font: Source Sans Pro -->
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet"> 
        <link href="default.css" rel="stylesheet" type="text/css"/>
        <link href="estilos.css" rel="stylesheet" type="text/css"/>   
    
        <title>Código Postal CR</title>
    </head>
    <body>
        <div class="wrapper">
            <!--<div class="content-wrapper">-->
            <!-- Main content -->
            
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <!-- left column -->
                        <div class="col-md-3 formulario">
                            <!-- general form elements -->
                            <div class="card card-primary formularioColor">
                                <div class="card-header formularioColor">
                                    <h3 class="card-title formularioTitulo">Menú para Código Postal</h3>
                                </div>
                                <!-- /.card-header -->
                                <!-- form start -->
                                <form role="form">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="MenuProvincia">Provincia : </label>
                                            <select class="form-control" id="MenuProvincia"  onchange="filtrarMenuCanton()">
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="MenuCanton">Cantón : </label>
                                            <select class="form-control"  id="MenuCanton" onchange="filtrarMenuDistrito()"  >
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="MenuDistrito">Distrito : </label>
                                            <select class="form-control"   id="MenuDistrito" onchange="calcularCodigo()"  >
                                            </select>
                                        </div>
                                    </div><strong><h2 class="codigoFondo" >
                                    El Código es: 
                                    <span id="codigo">(No hay ninguna opción seleccionada)</span>
                                        </h2>  </strong>
                                </form>
                                 
                            </div>
                        </div>
                    </div>
                    <!-- /.row -->
                </div><!-- /.container-fluid -->
            </section>
            <!-- /.content -->
            <!--</div>-->
        </div>
    </body>
    
</html>
