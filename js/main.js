// Generate markup for rows here
// TODO: 
// Update following code using jsDOM for node and remove all non js files
// Using fs, take user's input data set json or link to it along with expansion keys by layer/level
// Create README
let fixedColumns = 0;
let numOfLayers = 2;
let childKeys = ['children1', 'children2'];

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
      newTableRow.id = `row${index}`;
      tableBody.appendChild(newTableRow);
      //add table data for given row
      dataKeys.forEach((key, keyIndex) => {
        let currentRow = document.getElementById(`row${index}`);
        let newTableData = document.createElement('td');
        let newContent = document.createTextNode(datum[key]);
        if (keyIndex === 0) {
          let newCaret = document.createElement('i');
          newCaret.className = "fa fa-caret-right";
          newCaret.setAttribute("onclick", `toggleExpandable(${index}, 0, ${numOfLayers}, ${index}, 0, event)`);
          newTableData.appendChild(newCaret);
          newTableData.appendChild(newContent);
          currentRow.append(newTableData);
      } else {
          newTableData.appendChild(newContent);
          currentRow.append(newTableData);
      }
  });
      buildChildExpandables(currentLayer = 0, index, datum[childKeys[currentLayer]], childKeys, newTableRow, index);
  });
}

function buildChildExpandables (currentLayer, index, childArray, childKeys, parentRow, parentIndex) {
  if (childArray) {

    childArray.forEach((child, childIndex) => {
        let expandableKeys = Object.keys(child);
        expandableKeys = expandableKeys.filter((key) => {
            return !childKeys.includes(key);
        });

        let tableBody = document.getElementById('body');
        let newTableRow = document.createElement('tr');
        let uniqueKey = Math.random().toString(36).substr(2, 10);
        if(document.getElementById(`row${index}_layer${currentLayer}_item${childIndex + 1}_key${uniqueKey}`)) {
          uniqueKey += 1;
        }
        newTableRow.id = `row${index}_layer${currentLayer}_item${childIndex + 1}_key${uniqueKey}`;
        newTableRow.className = `expandable row${index}_layer${currentLayer}_parent${parentIndex}_child${childIndex}`;
      
        tableBody.appendChild(newTableRow);

        expandableKeys.forEach((key, keyIndex) => {
            let currentExpandableRow = document.getElementById(`row${index}_layer${currentLayer}_item${childIndex + 1}_key${uniqueKey}`);
            let newTableData = document.createElement('td');
            let newContent = document.createTextNode(child[key]);
            if (keyIndex === 0) {
              if (currentLayer + 1 === numOfLayers) {
                newTableData.style.maxWidth = `15px`;
                newTableData.style.paddingLeft = `${(currentLayer + 3)*15}px`;
              }
              else if (currentLayer + 1 !== numOfLayers) {
                let newCaret = document.createElement('i');
                let childName = child.name;
                newCaret.className = "fa fa-caret-right";
                newCaret.style.marginLeft = `${(currentLayer + 1)*15}px`;
                newCaret.setAttribute("onclick", `toggleExpandable(${index}, ${currentLayer + 1}, ${childKeys.length}, ${childIndex}, ${parentIndex}, event)`);
                newTableData.appendChild(newCaret);
              }
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
            buildChildExpandables(currentLayer + 1, index, childArray, childKeys, newTableRow, childIndex);
        }
    });
}
}

function toggleExpandable (rowId, layer, numOfLayers, childIndex, parentIndex, event) {
  let caret = event.target;
  if (caret.className === "fa fa-caret-down") {
    caret.className = "fa fa-caret-right"
  } else {
    caret.className = "fa fa-caret-down"
  }
  for (let i = layer; i < numOfLayers; i++) {
    if (i === layer) {
      if(parentIndex !== childIndex) {
        parentIndex = childIndex;
      }
      for (let k = 0; k < 5; k++) {
        let clickedRows = document.getElementsByClassName(`row${rowId}_layer${i}_parent${parentIndex}_child${k}`);
        for (let j = 0; j < clickedRows.length; j++) {
            clickedRows[j].classList.toggle('expandable');
        }
      }
    } else if (i > layer) {
      //   for (let j = 0; j < clickedRows.length; j++) {
      //       if (clickedRows[j].offsetParent !== null) {
      //         clickedRows[j].classList.toggle('expandable');
      //     }
      // }
        // let caret = document.getElementById(`expandable_row${rowId}_layer${i - 1}`).firstChild.firstChild;
        // caret.className = "fa fa-caret-right";
    }
}
}

// Update thead position to match tbody position on scroll
let tbody = document.getElementById('body');
let thead = document.getElementById('head');
tbody.addEventListener('scroll', function(e) {
  thead.style.left = -tbody.scrollLeft + 'px';
});


// $('tbody').scroll(function (e) {
//     $('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
//      $('thead th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
//      $('tbody td:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
//  });


var request = new XMLHttpRequest();

request.open('GET', 'https://api.myjson.com/bins/1c98eh', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    let dataSet = JSON.parse(request.responseText);
    createTable(dataSet, childKeys, numOfLayers);
}
};

request.onerror = function() {
  console.log(request.responseText);
};

request.send();
