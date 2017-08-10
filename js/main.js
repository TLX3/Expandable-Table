//  Generate markup for rows here

// User inputs data set and keys to expandable row by layer
let numOfLayers = 3;
let childKeys = ['child1', 'child2', 'child3'];
let dataSet = [
{'row1': 'First Item row 1', 'row2': 'First Item row 2', 'row3': 'First Item row 3', 'row4': 'First Item row 4', 'row5': 'First Item row 5',
'child1': [{
  'row1': 'expand1 row 1', 'row2': 'expand1 row 2', 'row3': 'expand1 row 3', 'row4': 'expand1  row 4', 'row5': 'expand1 row 5',
  'child2': [{
    'row1': 'expand2 row 1', 'row2': 'expand2 row 2', 'row3': 'expand2 row 3', 'row4': 'expand2 row 4', 'row5': 'expand2 row 5',
    'child3': [{
      'row1': 'expand3 row 1', 'row2': 'expand3 row 2', 'row3': 'expand3 row 3', 'row4': 'expand3 row 4', 'row5': 'expand3 row 5',
    }]
  }]
}]
},
{'row1': 'First Item row 1', 'row2': 'First Item row 2', 'row3': 'First Item row 3', 'row4': 'First Item row 4', 'row5': 'First Item row 5',
'child1': [{
  'row1': 'expand1 row 1', 'row2': 'expand1 row 2', 'row3': 'expand1 row 3', 'row4': 'expand1  row 4', 'row5': 'expand1 row 5',
  'child2': [{
    'row1': 'expand2 row 1', 'row2': 'expand2 row 2', 'row3': 'expand2 row 3', 'row4': 'expand2 row 4', 'row5': 'expand2 row 5',
    'child3': [{
      'row1': 'expand3 row 1', 'row2': 'expand3 row 2', 'row3': 'expand3 row 3', 'row4': 'expand3 row 4', 'row5': 'expand3 row 5',
    }]
  }]
}]
},
{'row1': 'First Item row 1', 'row2': 'First Item row 2', 'row3': 'First Item row 3', 'row4': 'First Item row 4', 'row5': 'First Item row 5',
'child1': [{
  'row1': 'expand1 row 1', 'row2': 'expand1 row 2', 'row3': 'expand1 row 3', 'row4': 'expand1  row 4', 'row5': 'expand1 row 5',
  'child2': [{
    'row1': 'expand2 row 1', 'row2': 'expand2 row 2', 'row3': 'expand2 row 3', 'row4': 'expand2 row 4', 'row5': 'expand2 row 5',
    'child3': [{
      'row1': 'expand3 row 1', 'row2': 'expand3 row 2', 'row3': 'expand3 row 3', 'row4': 'expand3 row 4', 'row5': 'expand3 row 5',
    }]
  }]
}]
},
{'row1': 'First Item row 1', 'row2': 'First Item row 2', 'row3': 'First Item row 3', 'row4': 'First Item row 4', 'row5': 'First Item row 5',
'child1': [{
  'row1': 'expand1 row 1', 'row2': 'expand1 row 2', 'row3': 'expand1 row 3', 'row4': 'expand1  row 4', 'row5': 'expand1 row 5',
  'child2': [{
    'row1': 'expand2 row 1', 'row2': 'expand2 row 2', 'row3': 'expand2 row 3', 'row4': 'expand2 row 4', 'row5': 'expand2 row 5',
    'child3': [{
      'row1': 'expand3 row 1', 'row2': 'expand3 row 2', 'row3': 'expand3 row 3', 'row4': 'expand3 row 4', 'row5': 'expand3 row 5',
    }]
  }]
}]
},
{'row1': 'First Item row 1', 'row2': 'First Item row 2', 'row3': 'First Item row 3', 'row4': 'First Item row 4', 'row5': 'First Item row 5',
'child1': [{
  'row1': 'expand1 row 1', 'row2': 'expand1 row 2', 'row3': 'expand1 row 3', 'row4': 'expand1  row 4', 'row5': 'expand1 row 5',
  'child2': [{
    'row1': 'expand2 row 1', 'row2': 'expand2 row 2', 'row3': 'expand2 row 3', 'row4': 'expand2 row 4', 'row5': 'expand2 row 5',
    'child3': [{
      'row1': 'expand3 row 1', 'row2': 'expand3 row 2', 'row3': 'expand3 row 3', 'row4': 'expand3 row 4', 'row5': 'expand3 row 5',
    }]
  }]
}]
}
];


function createTable(dataSet, childKeys, numOfLayers) {
  dataSet.forEach((datum, index) => {
    let keys = Object.keys(datum);
    keys = keys.filter((key) => {
      return !childKeys.includes(key);
    });
    //add table row
    $("#body").append(`
      <tr id="row_${index}">
      </tr>
      `);
    //add table data for given row
    keys.forEach((key, keyIndex) => {
      if (keyIndex === 0) {
        $(`#row_${index}`).append(`
          <td><i onclick="toggleExpandable(${index}, 0, ${numOfLayers})" class="fa fa-caret-right"></i>${datum[key]}</td>
          `);
      } else {
        $(`#row_${index}`).append(`
          <td>${datum[key]}</td>
          `);
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

      $(`#body`).append(`
        <tr class="expandable" id="expandable_row${index}_layer${currentLayer}"></tr>
        `);

      expandableKeys.forEach((key, keyIndex) => {
        if (keyIndex === 0) {
          $(`#expandable_row${index}_layer${currentLayer}`).append(`
            <td><i onclick="toggleExpandable(${index}, ${currentLayer + 1}, ${childKeys.length})" style="margin-left: ${(currentLayer + 1)*10}px;" class="fa fa-caret-right"></i>${child[key]}</td>
            `);
        } else {
          $(`#expandable_row${index}_layer${currentLayer}`).append(`
            <td>${child[key]}</td>
            `);
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
  for (let i = 0; i < numOfLayers; i++) {
    if (i === layer) {
      $("#expandable_row" + rowId + '_layer' + layer).toggle();
    }
    let el = $("#expandable_row" + rowId + '_layer' + i);
    if (i > layer && el.is(":visible")) {
      el.toggle();
    }
  }
}

createTable(dataSet, childKeys, numOfLayers);
