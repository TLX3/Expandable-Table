//  Generate markup for rows here
// User inputs data set and keys to expandable row by layer
let fixedColumns = 0;
let numOfLayers = 3;
let childKeys = ['children1', 'children2', 'children3'];

function createTable(dataSet, childKeys, numOfLayers) {
  let headerNames = Object.keys(dataSet[0]);

  headerNames = headerNames.filter((name) => {
    return !childKeys.includes(name);
  });

  let headerRow = document.getElementById('headers');
  headerNames.forEach((name) => {
    let newTableHeader = document.createElement('th');
    let newContent = document.createTextNode(name);
    newTableHeader.appendChild(newContent);
    headerRow.appendChild(newTableHeader);
  });

  dataSet.forEach((datum, index) => {
    let dataKeys = Object.keys(datum);
    dataKeys = dataKeys.filter((key) => {
      return !childKeys.includes(key);
    });
      //add table row
      let tableBody = document.getElementById('body');
      let newTableRow = document.createElement('tr');
      newTableRow.id = `row_${index}`;
      tableBody.appendChild(newTableRow);
      //add table data for given row
      dataKeys.forEach((key, keyIndex) => {
        let currentRow = document.getElementById(`row_${index}`);
        let newTableData = document.createElement('td');
        let newContent = document.createTextNode(datum[key]);
        if (keyIndex === 0) {
          let newCaret = document.createElement('i');
          newCaret.className = "fa fa-caret-right";
          newCaret.setAttribute("onclick", `toggleExpandable(${index}, 0, ${numOfLayers})`);
          newTableData.appendChild(newCaret);
          newTableData.appendChild(newContent);
          currentRow.append(newTableData);
        } else {
          newTableData.appendChild(newContent);
          currentRow.append(newTableData);
        }
      });
      buildChildExpandables(currentLayer = 0, index, datum[childKeys[currentLayer]], childKeys);
    });
}

function buildChildExpandables (currentLayer, index, childArray, childKeys) {
  if (childArray) {

    childArray.forEach((child) => {
      let expandableKeys = Object.keys(child);
      expandableKeys = expandableKeys.filter((key) => {
        return !childKeys.includes(key);
      });

      let tableBody = document.getElementById('body');
      let newTableRow = document.createElement('tr');
      newTableRow.id = `expandable_row${index}_layer${currentLayer}`;
      newTableRow.className = "expandable";
      tableBody.appendChild(newTableRow);

      expandableKeys.forEach((key, keyIndex) => {
        let currentExpandableRow = document.getElementById(`expandable_row${index}_layer${currentLayer}`);
        let newTableData = document.createElement('td');
        let newContent = document.createTextNode(child[key]);
        if (keyIndex === 0) {
          let newCaret = document.createElement('i');
          newCaret.className = "fa fa-caret-right";
          newCaret.style.marginLeft = `${(currentLayer + 1)*15}px`;
          newCaret.setAttribute("onclick", `toggleExpandable(${index}, ${currentLayer + 1}, ${childKeys.length})`);
          newTableData.appendChild(newCaret);
          newTableData.appendChild(newContent);
          currentExpandableRow.appendChild(newTableData);
        } else {
          newTableData.appendChild(newContent);
          currentExpandableRow.appendChild(newTableData);
        }
      });

      let currentChildKey = Object.keys(child).filter((key) => {
        return childKeys.includes(key);
      })[0];

      childArray = child[currentChildKey];
      if (childArray) {
        currentLayer += 1;
        buildChildExpandables(currentLayer, index, childArray, childKeys);
      }
    });
  }
}

function toggleExpandable (rowId, layer, numOfLayers) {
  for (let i = layer; i < numOfLayers; i++) {
    let clickedRow = document.getElementById(`expandable_row${rowId}_layer${i}`);
    if (i === layer) {
      clickedRow.classList.toggle('expandable');
      if (layer === 0) {
        let caret = document.getElementById(`row_${rowId}`).firstChild.firstChild;
        if (caret.className === "fa fa-caret-down") {
          caret.className = "fa fa-caret-right"
        } else {
          caret.className = "fa fa-caret-down"
        }
      } else {
        let caret = document.getElementById(`expandable_row${rowId}_layer${i - 1}`).firstChild.firstChild;
        if (caret.className === "fa fa-caret-down") {
          caret.className = "fa fa-caret-right"
        } else {
          caret.className = "fa fa-caret-down"
        }
      }
    } else if (i > layer) {
      if (clickedRow.offsetParent !== null) {
        clickedRow.classList.toggle('expandable');
        let caret = document.getElementById(`expandable_row${rowId}_layer${i - 1}`).firstChild.firstChild;
        caret.className = "fa fa-caret-right";
      }
    }
  }
}

let tbody = document.getElementById('body');
let thead = document.getElementById('head');
tbody.addEventListener('scroll', function(e) {
  thead.style.left = tbody.scrollLeft;
});

// $('#body').scroll(function (e) {
//     $('#headers th:nth-child(1)').css("left", $("#body").scrollLeft()); //fix the first cell of the header
//     $('#body td:nth-child(1)').css("left", $("#body").scrollLeft()); //fix the first column of tdbody
//   });

var request = new XMLHttpRequest();

request.open('GET', 'https://api.myjson.com/bins/kzzk1', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    let dataSet = JSON.parse(request.responseText).response;
    createTable(dataSet, childKeys, numOfLayers);
  }
};

request.onerror = function() {
  console.log(request.responseText);
};

request.send();
