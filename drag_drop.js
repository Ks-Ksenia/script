// Функция переноса файлов из папки в Toom Boom
// Жарков Никита, Горьковец Ксения
// Дата последней правки: 10.02.2020


include("error.js"); 

function drag_drop(){
  window = new QWidget()       // Создаём виджет окна
  layout = new QVBoxLayout()   // Выстраиваем виджеты вертикально
  text = new QLabel(window)    // Создаём текст "Открыть файл"
  line = new QTextEdit()       // Сюда записываются файлы, которые перетащили
  line.objectName = "MyLine"   // Даём имя объекту QLineEdit

  label = new QLabel("Перетащите файл сюда ") // Создаём область для перетаскивания
  check_box = new QCheckBox("Протянуть картинку",this)
  check_box_1 = new QCheckBox("Добавить на новый слой",this)

  // Переопределяем, чтобы функция была связана с ladel
  label.error = error        // Функция ошибок
  label.add_new_layer = add_new_layer
  label.add_one_layer = add_one_layer
  label.movie = movie

  label.globalObject = this

  window.acceptDrops = false    // запрещаем перетаскивать в окно
  label.acceptDrops = true      // разрешаем перетаскивать в окно
  line.readOnly = true          //запрещаем редактировать текст
  check_box.checked = false
  check_box_1.checked = false

  label.setStyleSheet("padding:100px; color: #000; font-size: 20px;border-right: 3px solid #6c6874;border-bottom: 3px solid #6c6874;\
              border-top: 1px solid #6c6874; border-left: 1px solid #6c6874; border-radius: 5px;\
              background-color: #A6D4E7;") 

  check_box.setStyleSheet("color: #000;")
  check_box_1.setStyleSheet("color: #000;")

  layout.addWidget(check_box,0,Qt.AlignBottom)
  layout.addWidget(check_box_1,1,Qt.AlignBottom)
  layout.addWidget(label,2,Qt.AlignTop)
  layout.addWidget(text,3,Qt.AlignTop)
  layout.addWidget(line,4,Qt.AlignTop)
  
  window.setWindowTitle("Открытие файла(ов)"); // название окна
  window.setGeometry(300,300,500,500)      // создаём геометрию окна(х,у, высота, ширина). Х и У задаются относительно размеров экрана монитора
  window.setStyleSheet("font-size: 18px; background-color: #6BBBDD;")
  
  text.setText("Открытые файлы:")
  text.setStyleSheet("padding:0px; color: #000; font-size: 18px; background-color: #6BBBDD;")

  line.setStyleSheet("padding:10px; color: #000;  font-size: 20px; border-right: 3px solid #6c6874;border-bottom: 3px solid #6c6874;\
              border-top: 1px solid #6c6874; border-left: 1px solid #6c6874; border-radius: 5px; height: 90px; width: 28;\
              background-color: #A6D4E7;")
  
  window.setLayout(layout) // всё что внутри вертикального виджета будет распологаться в окне
  window.show()

  label.dragEnterEvent  = function (event){ // Переопределили событие event, когда взяли объект перетаскивания
    if(event.type()){ 
      MessageLog.trace(event.type().toString());    
      event.acceptProposedAction();         // Получаем сигнал, что действие выполнено
    } 
  }; 
  label.dragMoveEvent  = function (event){ // Переопределили событие event, когда перемещаем объект перетаскивания
    if(event.type()){ 
      MessageLog.trace(event.type().toString()); 
      event.acceptProposedAction()       // Получаем сигнал, что действие выполнено
    } 
  }; 
  label.dropEvent  = function (event){ // Переопределили событие event, когда положили объект в область, принимающую его  
    if(event.type()){                              // Если это event тип, тогда
      MessageLog.trace(event.type().toString());  // Выводим этот тип в дебаг сообщение
      
      checkBox = this.parent().layout().itemAt(0).widget()  // Передаём в event класс CheckBox
      
      checkBox_1 = this.parent().layout().itemAt(1).widget()
      
      var dir_temp = System.getenv("Temp")  
      MessageLog.trace("Temp "+dir_temp)

      var dir = new QDir(dir_temp)

   if (!dir.exists("images")){
      dir.mkdir("images")
      MessageLog.trace("Папка images была создана")
   }
   if (!dir.exists("audio")){
      dir.mkdir("audio")
      MessageLog.trace("Папка audio была создана")
   }
      
      if (checkBox_1.checkState() == Qt.Unchecked){ // Добавляем всё на один слой

        for (url in event.mimeData().urls()){          // Создаём цикл, где обходим каждый объект в списке event.mimeData().urls()

           myurl = new QUrl(event.mimeData().urls()[url]) // Создаём класс, для работы с url-адресами
           myfile = new QFile(myurl.toLocalFile())        // Создаём класс для работы с файлами
           myinfo = new QFileInfo(myfile.fileName())  

           myfile.copy(dir_temp+"\\images\\"+myinfo.fileName());
           MessageLog.trace("1 "+event.mimeData().urls()) // список файлов, которые мы одним разом закридываем для переноса
           MessageLog.trace("2 "+event.mimeData().urls()[url])
           MessageLog.trace("88888"+myinfo.fileName())
           this.parent().layout().itemAt(4).widget().append(myinfo.fileName());
        }

          this.add_one_layer(dir_temp)
      }

      if (checkBox_1.checkState() == Qt.Checked){ // Добавляем всё на разные слои

        for (var url in event.mimeData().urls()){          // Создаём цикл, где обходим каждый объект в списке event.mimeData().urls()

          myurl = new QUrl(event.mimeData().urls()[url]) // Создаём класс, для работы с url-адресами
          myfile = new QFile(myurl.toLocalFile())        // Создаём класс для работы с файлами
          myinfo = new QFileInfo(myfile.fileName())    // Создаём класс для работы с информациейо файле

          var name = myinfo.fileName();
          var path = myinfo.absoluteDir().absolutePath()+"/"+myinfo.fileName();

          if (myinfo.fileName().indexOf(" ")!=-1){
            name = name.replace(" ","_")
            MessageLog.trace("замена "+name)
          }

          // метод append() - это метод QTextEdit,который добавляет текст с новой строчки
          MessageLog.trace(this.parent().layout().itemAt(4).widget().append(myinfo.fileName()));

          if (myinfo.completeSuffix() === "mov"){
            this.movie(myinfo,dir_temp)
          }
          else{
            this.add_new_layer(name,path,checkBox);
          }
        }
      }

      for (i=0; i<this.parent().layout().count(); i++){
        if (String(this.parent().layout().itemAt(i).widget().objectName)=="MyLine"){
  // this - указывает на окно qlabel, parent - указывает на родительское окно(qwidget(window)), layout - отвечает за qboxlayout
  // itemAS(i) - указывает на номер виджета в главноем окне в расставление виджета qboxlayout, 

        this.parent().layout().itemAt(i).widget();
        }
      }
      MessageLog.trace("Файл существует 666  ")
      event.accept(); // Получаем сигнал, что действие выполнено
    } // закрывает dropEvent
}
} // конец


// Проверям существует ли папки или нет
// Если нет, то создаём их

function directori(dir_temp){ 
   dir = new QDir(dir_temp)

   if (!dir.exists("images")){
      dir.mkdir("images")
      MessageLog.trace("Папка images была создана")
   }
   if (!dir.exists("audio")){
      dir.mkdir("audio")
      MessageLog.trace("Папка audio была создана")
   }
}


// Функция добавления на один и тот же слой

function add_one_layer(dir_temp){

   dir = new QDir(dir_temp+"\\images\\")   // создаём класс дириктории(папки)
   list = dir.entryInfoList() // Записываем количесво файлов в папаке в список

   var l = [];
   MessageLog.trace("list ")

   for (i=2; i<list.length;i++){
      l.push(list[i].fileName().replace(" ","_")); // Добавляем в список имена файлов без пробелов
   }
   MessageLog.trace("list "+l)

   elemname = l[0];      // Имя файла
         
   MessageLog.trace("name----"+elemname);
   MessageLog.trace("path----"+dir_temp);


   file = new QFile(dir_temp+"\\images\\"+elemname)
   info = new QFileInfo(elemname)

  if (info.completeSuffix() === "mov"){
      MessageLog.trace("видео");
      var er = "Нажмите на галочку \n\"Добавить на новый слой\" \nи подгрузите видео ещё раз "
      this.error(er)
      file.remove()
      break
   }
   else if (info.completeSuffix() === "jpg"){
      MessageLog.trace("картинка формата JPG");
      var type = "JPG";
   }
   else if (info.completeSuffix() === "png"){
      MessageLog.trace("картинка формата PNG");
      var type = "PNG";
    }
   else if (info.completeSuffix() === "psd"){
      MessageLog.trace("картинка формата PSD");
      var type = "PSD";
   }
   else if (elemname.indexOf(".tga")){
      MessageLog.trace("картинка формата TGA"); 
      var type = "TGA";
   }
   else if (info.completeSuffix() === "tif"){
      MessageLog.trace("картинка формата TIF"); 
      var type = "TIF";
   }
   else{
      var er = "Неизвестный фортмат файла.\n\nПожалуйста, обратитесь к Горьковец Ксении."
      this.error(er)
      file.remove()
      break
   }

   var elemId = element.add(elemname, "BW", scene.numberOfUnitsZ(), type, "None");  //Дабалвяем элемент указывая параметры, с которыми он откроется     
   var vnode = node.add(node.root(), elemname, "READ",0,0,0);   // Добавляем ноду

   MessageLog.trace("elemId "+elemId) 

   column.add(elemname, "DRAWING");
   MessageLog.trace("column " +column.setElementIdOfDrawing(elemname,elemId));

   node.linkAttr(vnode, "DRAWING.ELEMENT", elemname); // Связываем столбец xsheet с элементом
   node.link(vnode,0,"Top/Composite",0);
         

   //в цикле   если в качестве имени elemname подаём список
   for (i=0;i<l.length;i++){
      MessageLog.trace(l.length)

      elemname = l[i]

      path = dir_temp +"\\images\\"+ l[i]
      MessageLog.trace("path----- "+path)

      MessageLog.trace("create "+Drawing.create(elemId,i+1,true));  // Создёем чертёж
      MessageLog.trace("++ "+Drawing.filename(elemId,i+1));

      file_1 = new QFile(path)
      MessageLog.trace("copy "+file_1.copy(Drawing.filename(elemId,i+1)));

      MessageLog.trace("elemId "+elemId) 
      MessageLog.trace("elemname "+elemname);
      MessageLog.trace("setEntry "+column.setEntry(l[0],1,i+1,i+1));     // цикл для xsheet

      file_1.remove() // удаляем файлы в папке "C:/temp/images" 
   }
}


// Функция добавления на разные слои

function add_new_layer(name,path,checkBox){

MessageLog.trace(this)

   var elemname = name;
   file = new QFile(path)

   var type = "";
   var number = 1;

   if (myinfo.completeSuffix() === "jpg"){
      MessageLog.trace("картинка формата JPG");
      type = "JPG";
   }
   else if (myinfo.completeSuffix() === "png"){
      MessageLog.trace("картинка формата PNG"); 
      type = "PNG";
   }
   else if (myinfo.completeSuffix() === "psd"){
      MessageLog.trace("картинка формата PSD"); 
      type = "PSD";
   }
   else if (name.indexOf(".tga")){
      MessageLog.trace("картинка формата TGA"); 
      type = "TGA";
   }
   else if (myinfo.completeSuffix() === "tif"){
      MessageLog.trace("картинка формата TIF"); 
      type = "TIF";
   }
   else{
      var er = "Неизвестный фортмат файла."+"\n"+"\n"+"Пожалуйста, обратитесь к Горьковец Ксении."
      this.error(er)
      break
   }

   var elemId = element.add(elemname, "BW", scene.numberOfUnitsZ(), type, "None");  //Дабалвяем элемент указывая параметры, с которыми он откроется
   var vnode = node.add(node.root(), elemname, "READ",0,0,0);   // Добавляем ноду

   Drawing.create(elemId,"1",true);  // Создёем чертёж

   file.copy(Drawing.filename(elemId,"1"));

   column.add(elemname, "DRAWING");
   column.setElementIdOfDrawing(elemname, elemId );

   node.linkAttr(vnode, "DRAWING.ELEMENT", elemname);
   node.link(vnode,0,"Top/Composite",0);
   
   MessageLog.trace("88888888 "+column.setElementIdOfDrawing(elemname,elemId));

   if (checkBox.checkState() == Qt.Checked){
      while(scene.setStopFrame(number)==true){
         MessageLog.trace(column.setEntry(elemname,1,number,1));     // цикл для xsheet
         number++
      }
   }
   else{
      MessageLog.trace(column.setEntry(elemname,1,number,1))
   }
   MessageLog.trace("++"+Drawing.filename(elemId,1));
}

function movie(myinfo,dir_temp){

  MovieImport.setMovieFilename(myinfo.absoluteDir().absolutePath()+"/"+myinfo.fileName());  // определяет входное имя файла видео
  MessageLog.trace("fgfg")
  MovieImport.setImageFolder(dir_temp+"\\images"); // Определяет, где хранить извлечённые изображения
  MovieImport.setImagePrefix("video");     // Имя картинок, в которые импортируется видео
  MovieImport.setAudioFile(dir_temp+"\\audio\\audio.wav"); // Записываем звук от видео в указанную папку с указанным именем
  MovieImport.isAudioFileCreated()
  MessageLog.trace("import "+MovieImport.doImport());

  mov_path = dir_temp; 
  dir = new QDir(mov_path+"\\images\\")   // создаём класс дириктории(папки)
  list = dir.entryInfoList()  // записываем в list все файлы в папке images

  var l = [];
  MessageLog.trace("list ")
  for (i=2; i<list.length;i++){
    l.push(list[i].fileName().replace(" ","_")); // Добавляем в список имена файлов без пробелов
  }
  var customSort = function(a,b){return Number((a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))} // функция сортировки 

  var name = l.sort(customSort)

  elemname = myinfo.fileName();// Имя файла

    MessageLog.trace("name----"+elemname);
    MessageLog.trace("path----"+mov_path);

    var elemId = element.add(elemname, "BW", scene.numberOfUnitsZ(), "PNG", "None");  //Дабалвяем элемент указывая параметры, с которыми он откроется     
    var vnode = node.add(node.root(), elemname, "READ",0,0,0);   // Добавляем ноду

    column.add(elemname, "DRAWING");       
    MessageLog.trace("column " +column.setElementIdOfDrawing(elemname,elemId));

    node.linkAttr(vnode, "DRAWING.ELEMENT", elemname); // Связываем столбец xsheet с элементом
    node.link(vnode,0,"Top/Composite",0);

    // Увеличиваю количество кадров в Timeline под видео

    // Находим последний кадр
    var stop_fr = frame.numberOf()

    var add_frame = name.length-stop_fr // Число кадров, которые добавляем в Timeline к видео
    frame.insert(stop_fr,add_frame) // Добавляем пустые кадры(add_frame) после stop_fr-1

     //в цикле   если в качестве имени elemname подаём список
     for (i=0;i<name.length;i++){

        path = mov_path +"\\images\\"+ name[i]
        MessageLog.trace("path----- "+path)
        file = new QFile(path)

        MessageLog.trace("create "+Drawing.create(elemId,i+1,true));  // Создёем чертёж
        MessageLog.trace("copy "+file.copy(Drawing.filename(elemId,i+1)));

        MessageLog.trace("elemId "+elemId) 
        MessageLog.trace("elemname "+name[i]);
        MessageLog.trace("setEntry "+column.setEntry(elemname,1,i+1,i+1));     // цикл для xsheet
        MessageLog.trace("++ "+Drawing.filename(elemId,i+1));

        file.remove() // удаляем файлы в папке "C:/temp/images" 
    }
} // конец функции
