requirejs(['dir','sample_data'], function(Directory, sample) {
	// These values are passed to the Directory constructor, which doesn't have hard-coded DOM references
	var domTargets = {
		//Expects a div:
		pathDisplay: document.getElementById('path-box'),
		//Expects a table row:
		typeDisplay: document.getElementById('type-row'),
		//Expects a table row:
		contentsDisplay: document.getElementById('contents-row')
	};

	//Helper functions for getting Directories up and running:
	function displayJSON(string){
		var newObject;
		//check that the supplied string is valid JSON:
		try {
		newObject = JSON.parse(string);
		} catch(e) {
			updateErrorBox("Whoops! That doesn't look like a valid JSON string.");
			return;
		}
		//display the full browser UI
		var unhide = document.getElementsByClassName('hide-on-load');
		for (var i = 0; i<unhide.length; i++){
			unhide[i].style.visibility='visible';
		}
		//create new directory explorer, print first level:
		var newDirectory = new Directory(newObject, null, domTargets);
		newDirectory.printLevel(domTargets);
		// Display string (with indents and newlines) beneath main explorer:
		var stringDisplay = document.getElementById('string-display');
		stringDisplay.innerText = JSON.stringify(newObject,null,2);
	}

	function updateErrorBox(msg){
		if(msg){
			document.getElementById('error-box').textContent=msg;}
	}

	function clearDisplay(){
		var rows = document.getElementsByTagName('tr');
		for (var i = 0; i<rows.length; i++){
			while(rows[i].firstChild){
				rows[i].removeChild(rows[i].firstChild);
			}
		}
		domTargets.pathDisplay.textContent='';
	}

	// Handle submission of data:
	var inputForms = document.getElementById('input-forms');

	inputForms.addEventListener('submit',function(e){
		e.preventDefault();
		updateErrorBox("");
		clearDisplay();
		inputSwitch(e);
		e.target.elements[0].value=null;
	});

	function inputSwitch(e){
		switch(e.target.elements[0].id){	
			case 'textInput':
				displayJSON(e.target.elements[0].value);
				break;
			case 'fileInput':
				parseFile(e.target.elements[0].files[0]);
				break;
			default:
				console.log('something went wrong!');
		}
	}

	function parseFile(file){
		if(file){
			var r = new FileReader();
			//this onload fires when the readAsText method below it finishes running. e.target.result doesn't exist until then.
			r.onload = function(e){
				displayJSON(e.target.result);
			};
			r.readAsText(file);
		} else {
			updateErrorBox('Please choose a valid JSON file.');
		}
	}

	// JQuery controls for tab navigation:
	$('.nav a').click(function (e){
		e.preventDefault();
		updateErrorBox();
		$(this).tab('show');
	});

});