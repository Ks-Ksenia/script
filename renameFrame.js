// Функция для переименовки кадров
// Горьковец Ксения
// Дата последней правки: 07.02.2020

function renameFrame(){ // функция интерфейса программы renameFrame

	window = new QWidget()
	layout = new QVBoxLayout()
	line = new QLineEdit()
	text = new QLabel(window)  // отвечает за получение текста для дальнейшей обработки
	button_s = new QPushButton("С какого кадра")
	button_range = new QPushButton("Диапозон")

	line.acceptDrops = true  // разрешаем перетаскивать окно

	layout.addWidget(text,0,Qt.AlignTop)
	layout.addWidget(line,1,Qt.AlignTop)
	layout.addWidget(button_s,2,Qt.AlignBottom)
	layout.addWidget(button_range,3,Qt.AlignBottom)

	window.adjustSize() // подгоняет размеры окна под его содержимое
	window.setWindowTitle("Перенумерация кадров"); // название окна
	window.setGeometry(800,500,270,100) // создаём геометрию окна(х,у, высота, ширина). Х и У задаются относительно размеров экрана монитора
	window.setStyleSheet("font-size: 18px;background-color: qlineargradient( x1: 0, y1: 0, x2: 0, y2: 1,stop: 0.3 #5926f0, stop: 1 #26e2f0);")
	
	text.setText("Введите число:")
	text.setStyleSheet("padding:0px; color: #fff; font-size: 18px; background-color: #5926f0;")

	// придали кнопке вид
	button_s.setStyleSheet("padding:10px; color: #fff; font-size: 14px;border: 1px none #080d45; border-radius: 18px;\
						background-color: qlineargradient( x1: 0, y1: 0, x2: 0, y2: 1,stop: 0 #d38aeb, stop: 1 #5926f0);\
						")
	

	button_s.pressed("color: #000")
	button_range.setStyleSheet("padding:10px; color: #fff; font-size: 14px;border: 1px none #080d45; border-radius: 18px;\
								background-color: qlineargradient( x1: 0, y1: 0, x2: 0, y2: 1,stop: 0 #d38aeb, stop: 1 #5926f0);")

	// придали окну для ввода текста вид
	line.setStyleSheet("padding:10px; color: #fff; font-size: 14px;border: 1px solid #080d45; border-radius: 5px;\
						background-color: qlineargradient( x1: 0, y1: 0, x2: 0, y2: 1,stop: 0 #080d45, stop: 1 #210845);")

	button_s.clicked.connect(this,renameFrame_S)
	
	button_range.clicked.connect(this,renameFrame_range)

	window.setLayout(layout) // всё что внутри вертикального виджета будет распологаться в окне
	window.show()
}


function renameFrame_S(){  // функция переименовки кадров с определённого значения

	var nom_frame = parseInt(this.line.text);

	var n = selection.numberOfNodesSelected();  // выбираем имя модуля, который мы выбрали

	if (n == 0) { return; }

	scene.beginUndoRedoAccum("Переименование");

	MessageLog.trace("chislo:" +nom_frame);

	var columnRealName = node.linkedColumn(selection.selectedNode(0),"DRAWING.ELEMENT"); // находим колонку к которой обращаемся(путь к колонке, имя)
	var listFrames = column.getDrawingTimings(columnRealName);   // список кадров = извлекаем список таймингов, используемых в стобце чертежа(указываем имя колонки)

	MessageLog.trace("timings: "+listFrames);

	for (i = 0; i < listFrames.length; ++i){
		if (listFrames[i].indexOf("_temp") < 0){

			var today="";

			if (listFrames.indexOf(listFrames[i]+"_temp") > -1){
				MessageLog.trace("ADD DATE: "+listFrames[i])
				today = new Date(); // создаём объект времени
today=today.getDate().toString()+today.getMonth().toString()+today.getYear().toString()+today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString();
			}
			var renameChek = column.renameDrawing(columnRealName, listFrames[i], listFrames[i]+"_temp"+today);  // переименовывает указанный чертёж в указ столбце из строго имени listFrames[i] в новое listFrames[i]+"_temp"+today. возвращ: true/false

			if (renameChek == false){  // если имя не переименовано, тогда
				MessageLog.trace("ERROR RENAME: "+listFrames[i]+"    TO     "+listFrames[i]+"_temp");
			}
		}
	}

	var naidennyeFrames = [];  // создаём пустой список - найденых кадров
	var rightName = [];  // создаём список - правильное имя
	var frSchetchik=nom_frame;  // счётчик кадров

	for (x = 1; x <= frame.numberOf(); ++x){  // цикл от 1 до номера кадра в сцене с увел на ед

		drName = column.getEntry(columnRealName,1,x)  // находим значение ячейки в столбе(действиетельное имя стобца, подколонка,  удвоенный кадр)
		MessageLog.trace("drName: "+drName);

		if (drName != ""){
			if (naidennyeFrames.indexOf(drName) < 0 ){
				MessageLog.trace("timings2: "+column.getDrawingTimings(columnRealName));
				naidennyeFrames.push(drName.toString());
				rightName.push(frSchetchik.toString());
				frSchetchik=frSchetchik+1;
			}
		}
	}

	for (i = 0; i < naidennyeFrames.length; ++i){ // цикл с 0 до длинны найденных кадров с увел на ед
		var renameREZ = column.renameDrawing(columnRealName, naidennyeFrames[i], rightName[i]);  // переименовываем указ чертёж в указ столбце из старого имени naidennyeFrames[i] в новое rightName[i]
		MessageLog.trace("rename: "+naidennyeFrames[i]+"   "+renameREZ+"   to   "+rightName[i]);
	}
	MessageLog.trace("naidennyeFrames: "+naidennyeFrames);
	MessageLog.trace("rightName: "+rightName);
	MessageLog.trace(this.line.text)

	scene.endUndoRedoAccum();
	
	this.window.close()

}

function renameFrame_range(){
	scene.beginUndoRedoAccum("Переименование");

	var nom_frame = parseInt(this.line.text);
	sNode = selection.selectedNode(0);
	var useTiming = node.getAttr( sNode, 1, "drawing.elementMode" ).boolValue();

	drawColumn = node.linkedColumn( sNode, useTiming ? "drawing.element" : "drawing.customName.timing" );

	var firstFrame = Timeline.firstFrameSel;
	var lastFrame = firstFrame + Timeline.numFrameSel -1;

MessageLog.trace("firstFrame "+firstFrame)
MessageLog.trace("lastFrame "+lastFrame)


	nameCels = [];      // Список кадров, которые мы выделяем
	selectedCels = [];  
	// Список позиции, выделенных, кадров
	excludedCels = [];  // Список ячеек, которые мы не выбрали
	name = []           // Список новых имён файла
	rename = []
	renameREZ = []

	var allCels = column.getDrawingTimings( drawColumn );
	var i = nom_frame
MessageLog.trace("66666 "+allCels)
	// Цикл, где записывабтся кадры ,которые выделены и их позиция
	for( var curFrame = firstFrame; curFrame <= lastFrame; curFrame++ ){
		var curCelName = column.getEntry( drawColumn, 1, curFrame );

		if(nameCels.indexOf( curCelName ) == -1 ){
			nameCels.push( curCelName );
			selectedCels.push( curFrame );
			name.push(i.toString());
			i+=1
		}
	}
	MessageLog.trace("nameCels "+nameCels)
	MessageLog.trace("selectedCels "+selectedCels)
	MessageLog.trace("name "+name)


	// Цикл ячееек, которые мы не выбрали
	excludedCels = allCels.slice();	

	for( var i = 0; i < allCels.length; i++ ){
		for( var k = 0; k < nameCels.length; k++ ){
			if( allCels[i] == nameCels[k] ){
				excludedCels.splice( i, 1, "" );
			}
		}
	}
	excludedCels = excludedCels.filter(Boolean);
	MessageLog.trace("excludedCels "+excludedCels)
	
	// Цикл переименовки, выбранных ячеек
	for (i = 0; i < selectedCels.length;i++){ 

			var rename = column.renameDrawing(drawColumn, nameCels[i], name[i]+"_");

		MessageLog.trace("rename: "+selectedCels[i]+"   "+rename+"   to   "+selectedCels[i]+"_");
	}

	MessageLog.trace("nameCels "+nameCels)

	scene.endUndoRedoAccum();
	
	this.window.close()
}
