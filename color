// Программа, для создания слоёв с определённым цветом
// Горьковей Ксения
// Дата последней правки: 20.01.2020

function color(){

  window = new QWidget()  // создаём виджет окна
  layout = new QGridLayout() // выстраиваем виджеты вертикально

  button_peg = new QPushButton("Peg ")
  button_anim = new QPushButton("Anim ")
  button_popr_anim = new QPushButton("Popr_anim")
  button_deform = new QPushButton("Deformer")
  button_meshwarp = new QPushButton("Meshwarp")
  button_pro = new QPushButton("Pro ")
  button_popr_pro = new QPushButton("Popr_pro ")
  button_fon_3d = new QPushButton("Fon_predmet or 3d")
  button_fon = new QPushButton("Fon ")
  button_zal = new QPushButton("Zal ")
  button_teni = new QPushButton("Teni, teni_FX ")
  button_FX = new QPushButton("FX")
  button_blik = new QPushButton("Blik, blik_FX")

  layout.addWidget(button_peg,1,1)
  layout.addWidget(button_anim,1,2)
  layout.addWidget(button_popr_anim,1,3)
  layout.addWidget(button_deform,1,4)
  layout.addWidget(button_meshwarp,1,5)
  layout.addWidget(button_pro,2,1)
  layout.addWidget(button_popr_pro,2,2)
  layout.addWidget(button_fon_3d,2,3)
  layout.addWidget(button_fon,2,4)
  layout.addWidget(button_zal,2,5)
  layout.addWidget(button_teni,3,1,1,2)
  layout.addWidget(button_FX,3,3)
  layout.addWidget(button_blik,3,4,1,2)


  window.adjustSize() // подгоняет размеры окна под его содержимое
  window.setWindowTitle("Цвет"); // название окна
  window.setGeometry(800,500,270,100) // создаём геометрию окна(х,у, высота, ширина). Х и У задаются относительно размеров экрана монитора
  window.setStyleSheet("font-size: 18px; background-color: #FFCA96;")

  // придали кнопке вид
  button_peg.setStyleSheet("padding:10px; color: #000; font-size: 18px;font-weight: 700; font-family: Comic Sans MS,cursive; border: 1px solid #000; border-radius: 18px;\
            background-color: #ff0000;")

  button_anim.setStyleSheet("padding:10px; color: #000; font-size: 18px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
            background-color: #00ffff;")

  button_popr_anim.setStyleSheet("padding:10px; color: #000; font-size: 18px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
          background-color: #00aa00;")

  button_deform.setStyleSheet("padding:10px; color: #FFF; font-size: 18px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
            background-color: #ff5500;")

  button_meshwarp.setStyleSheet("padding:10px; color: #000; font-size: 16px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
            background-color: #ff00ff;")

  button_pro.setStyleSheet("padding:10px; color: #000; font-size: 18px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
            background-color: #55ff7f;")

  button_popr_pro.setStyleSheet("padding:10px; color: #000; font-size: 18px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
          background-color: #ffff00;")

  button_fon_3d.setStyleSheet("padding:10px; color: #FFF; font-size: 18px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
            background-color: #005500;")

  button_fon.setStyleSheet("padding:10px; color: #000; font-size: 18px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
            background-color: #fff;")

  button_zal.setStyleSheet("padding:10px; color: #fff; font-size: 18px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
            background-color: #0000ff;")

  button_teni.setStyleSheet("padding:10px; color: #000; font-size: 18px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
            background-color: #aaaaff;")

  button_FX.setStyleSheet("padding:10px; color: #FFF; font-size: 18px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
            background-color: #55007f;")

  button_blik.setStyleSheet("padding:10px; color: #000; font-size: 18px;font-weight: 700;font-family: Comic Sans MS,cursive;border: 1px solid #000; border-radius: 18px;\
          background-color: #ffaa00;")

  button_peg.clicked.connect(this,color_peg) // clicked - действие при нажатии и отпускании кнопки, connect()-соединяет окно с функцией, которое при нажатии кнопки будет срабатывать
  button_anim.clicked.connect(this,color_anim)
  button_popr_anim.clicked.connect(this,color_popr_anim)
  button_deform.clicked.connect(this,color_deform)
  button_meshwarp.clicked.connect(this,color_meshwarp) // clicked - действие при нажатии и отпускании кнопки, connect()-соединяет окно с функцией, которое при нажатии кнопки будет срабатывать
  button_pro.clicked.connect(this,color_pro)
  button_popr_pro.clicked.connect(this,color_popr_pro)
  button_fon_3d.clicked.connect(this,color_fon_3d)
  button_fon.clicked.connect(this,color_fon) // clicked - действие при нажатии и отпускании кнопки, connect()-соединяет окно с функцией, которое при нажатии кнопки будет срабатывать
  button_zal.clicked.connect(this,color_zal)
  button_teni.clicked.connect(this,color_teni)
  button_FX.clicked.connect(this,color_FX)
  button_blik.clicked.connect(this,color_blik)


  // расположение кнопки по нижнему краю
  window.setLayout(layout) // всё что внутри вертикального виджета будет распологаться в окне
  window.show()
}




function color_peg(){
  var n = selection.numberOfNodesSelected();

  if (n == 0) { return; } 

  var c = new ColorRGBA(255,0,0)

  for(var i=0; i<n; i++){
    node.setColor(selection.selectedNode(i), c);
  }
}


function color_anim(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(170,255,255)
  for(var i=0; i<n; i++){
    node.setColor(selection.selectedNode(i), c);
  }
}


function color_popr_anim(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(0,170,0)
  for(var i=0; i<n; i++){
    node.setColor(selection.selectedNode(i), c);
  }
}


function color_deform(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(255,85,0)
  for(var i=0;i<n;i++){
    node.setColor(selection.selectedNode(i), c);
  }
}

function color_meshwarp(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(255,0,255)
  for(var i=0;i<n;i++){
    node.setColor(selection.selectedNode(i), c);
  }
}


function color_pro(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(170,255,127)
  for(var i=0; i<n; i++){
    node.setColor(selection.selectedNode(i), c);
  }
}


function color_popr_pro(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(255,255,0)
  for(var i=0; i<n; i++){
    node.setColor(selection.selectedNode(i), c);
  }
}


function color_fon_3d(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(0,85,0)
  for(var i=0; i<n; i++){
    node.setColor(selection.selectedNode(i), c);
  }
}

function color_fon(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(255,255,255)
  for(var i=0; i<n; i++){
    node.setColor(selection.selectedNode(i), c);
  }
}

function color_zal(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(0,0,255)
  for(var i=0; i<n; i++){
    node.setColor(selection.selectedNode(i), c);
  }
}


function color_teni(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(170,170,255)
  for(var i=0; i<n; i++){
    node.setColor(selection.selectedNode(i), c);
  }
}


function color_FX(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(85,0,127)
  for(var i=0; i<n; i++){
    node.setColor(selection.selectedNode(i), c);
  }
}


function color_blik(){
  var n = selection.numberOfNodesSelected();
  if (n == 0) { return; } 

  var c = new ColorRGBA(255,170,0)
  for(var i=0; i<n; i++){
    node.setColor(selection.selectedNode(i), c);
  }
}
