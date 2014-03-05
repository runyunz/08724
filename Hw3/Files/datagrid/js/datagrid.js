function DataGrid(options) {
	this.data = options.data;
	this.rootElement = options.rootElement;
	this.columns = options.columns;
	this.onDraw = options.onDraw;
	this.init();
}

(function(win) {

DataGrid.prototype.sort = function(label) {
	this.data.sort(
		function(a, b) {
			return ((a[label] < b[label]) ? -1 : ((a[label] > b[label]) ? 1 : 0));
		}
	);
	this.drawTable();
	// console.log("sort");
	// console.log(this.data);	
};

DataGrid.prototype.reverse = function() {
	this.data.reverse();
	this.drawTable();
	// console.log("reverse");
	// console.log(this.data);
};

DataGrid.prototype.drawTable = function() {
	this.destroy();
	if (typeof(this.onDraw) !== 'undefined') {
		var that = this 
		this.onDraw(that);
	}
	var table = document.createElement("table");
	/* colgroup */
	// var colgroup = document.createElement("colgroup");
	/* head */
	var thead = document.createElement("thead");
	var tr = document.createElement("tr");
	for (var c in this.columns) {
		var th = document.createElement("th");
		th.innerHTML = this.columns[c]["name"];
		th.setAttribute("align", this.columns[c]["align"]);
		th.setAttribute("width", this.columns[c]["width"]);	
		th.setAttribute("data-name", this.columns[c]["dataName"]);
		th.setAttribute("title", "Sort by " + this.columns[c]["name"]);
		th.addEventListener("click", this.onclick.bind(this), false);
		tr.appendChild(th);
		// var col = document.createElement("col");
		// col.setAttribute("id", this.columns[c]["dataName"])
		// colgroup.appendChild(col);			
	}
	thead.appendChild(tr);
	// table.appendChild(colgroup);
	table.appendChild(thead);
	/* table body */
	var tbody = document.createElement("tbody");
	for (var d in this.data) {
		var tr = document.createElement("tr");
		for (var c in this.columns) {
			var td = document.createElement("td");
			var label = this.columns[c]["dataName"];
			td.innerHTML = this.data[d][label];
			td.setAttribute("align", this.columns[c]["align"]);
			td.setAttribute("width", this.columns[c]["width"]);
			td.setAttribute("class", label);
			tr.appendChild(td);			
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	if (typeof(this.rootElement) !== 'undefined') {
		this.rootElement.appendChild(table);
	}
};

DataGrid.prototype.onclick = function(event) {
	if (typeof(event.target) !== 'undefined' && this.rootElement !== 'undefined') {
		var name = event.target.getAttribute("data-name");
		var col = this.rootElement.getElementsByClassName(name);

		if (col[0].className == name + " col-select") {
			this.reverse();
		}
		else {
			this.sort(name);
		}
		col = this.rootElement.getElementsByClassName(name);
		for(i=0;i<col.length;i++) {
			col[i].className += " col-select";
		}
		
	}
};

DataGrid.prototype.destroy = function() {
	if (typeof(this.rootElement) !== 'undefined') {
		this.rootElement.innerHTML = "";
	}
};

DataGrid.prototype.init = function() {
	if (typeof(this.columns) !== 'undefined') {
		this.sort(this.columns[0].dataName);

		var col = this.rootElement.getElementsByClassName(this.columns[0].dataName);
		for(i=0;i<col.length;i++) {
			col[i].className += " col-select";
		}		
	}
};

})(window);
