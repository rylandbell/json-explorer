define(function(){
	// Take data, and use the Directory constructor to help display map of object, given a current path
	function Directory(object, path, domTargets){
		this.content = object;
		this.domTargets = domTargets;
		if(path){
			this.path = path;
		} else {
			this.path = [];
		}
	}

	Directory.prototype.printLevel = function(){
		var level = this.content;
		for (var i = 0; i<this.path.length; i++){
			level = level[this.path[i]];
		}
		var keys = getKeys(level);

		function getKeys(object){
			var names = [];
			for (var key in object){
				if (object.hasOwnProperty(key)) {
				        names.push(key);
				    }
			}
			return names;
		}

		var newSelect = document.createElement('select');
		newSelect.setAttribute('multiple','multiple');
		newSelect.setAttribute('size',10);
		newSelect.setAttribute('class','level'+this.path.length);

		if (typeof level === 'object'){
			keys.forEach(function(name,i){
				var newOption = document.createElement('option');
				newOption.textContent = name;
				newOption.setAttribute('class','item'+name);
				newSelect.appendChild(newOption);
			});
			newSelect.addEventListener('click',this.handleClick.bind(this));
		} else {
			var newOption = document.createElement('option');
			newOption.textContent = level;
			newSelect.appendChild(newOption);
		}

		var typeTD = document.createElement('td');
		if (level instanceof Array) {
			typeTD.textContent = 'Array';
		} else {
			var type = typeof level;
			type = type[0].toUpperCase()+type.substring(1);
			typeTD.textContent = type;
		}
		
		typeTD.setAttribute('class','header'+this.path.length);
		var typeRow = this.domTargets.typeDisplay;
		typeRow.appendChild(typeTD);

		var newTD = document.createElement('td');
		newTD.appendChild(newSelect);
		var contentsRow = this.domTargets.contentsDisplay;
		contentsRow.appendChild(newTD);			
	};

	Directory.prototype.handleClick = function (e){
		if(e.target.tagName==='OPTION'){
			var clickedLevel = parseInt(e.target.parentNode.getAttribute('class').substring(5));
			var clickedItem = e.target.getAttribute('class').substring(4);

			if (clickedLevel !== this.path.length){
				this.backUp(clickedLevel);
			}
			this.addLevel(clickedItem);
			this.printPath();
		} else {
			console.log('Sorry, that\'s not meant to be clickable');
		}
	};

	Directory.prototype.addLevel = function(key){
		this.path.push(key);
		this.printLevel();
	};

	Directory.prototype.backUp = function(level){
		this.path = this.path.slice(0,level);
		var lastKeeper = document.querySelector('.level'+level).parentNode;
		while(lastKeeper.nextSibling){
			lastKeeper.parentNode.removeChild(lastKeeper.nextSibling);
		}
		var lastHeader = document.querySelector('.header'+level);
		while(lastHeader.nextSibling){
			lastHeader.parentNode.removeChild(lastHeader.nextSibling);
		}
	};

	//displays current path in div below object browser:
	Directory.prototype.printPath = function(){
		var pathNode = document.createElement('p');
		var pathString = '';

		this.path.forEach(function(name){
			if(isNaN(parseInt(name))){
				pathString += '.'+name;	
			} else {
				pathString += '['+name+']';
			}
		});

		pathNode.textContent = pathString;
		
		var pathBox = this.domTargets.pathDisplay;
		while(pathBox.firstChild){
			pathBox.removeChild(pathBox.firstChild);
		}
		pathBox.appendChild(pathNode);
	};

	return Directory;
});