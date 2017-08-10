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
{'row1': 'Second Item row 1', 'row2': 'Second Item row 2', 'row3': ' Second Itemrow 3', 'row4': 'Second Item row 4', 'row5': 'Second Item row 5',
'child1': [{
  'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
  'child2': [{
    'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
    'child3': [{
      'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
    }]
  }]
}]
},
{'row1': 'Third Item row 1', 'row2': 'Third Item row 2', 'row3': 'Third Item  row 3', 'row4': 'Third Item  row 4', 'row5': 'Third Item row 5',
'child1': [{
  'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
  'child2': [{
    'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
    'child3': [{
      'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
    }]
  }]
}]
},
{'row1': 'Fourth item row 1', 'row2': 'Fourth item row 2', 'row3': 'Fourth item row 3', 'row4': 'Fourth item row 4', 'row5': 'Fourth item row 5',
'child1': [{
  'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
  'child2': [{
    'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
    'child3': [{
      'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
    }]
  }]
}]
},
{'row1': 'Fifth item row 1', 'row2': 'Fifth item row 2', 'row3': 'Fifth item row 3', 'row4': 'Fifth item row 4', 'row5': 'Fifth item row 5',
'child1': [{
  'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
  'child2': [{
    'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
    'child3': [{
      'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
    }]
  }]
}]
}
];


function createTable(dataSet, childKeys, numOfLayers) {
  dataSet.forEach((datum, index) => {
    let currentLayer = 0;
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
          <td><i onclick="openExpandable(${index}, ${currentLayer})" class="fa fa-caret-right"></i>${datum[key]}</td>
          `);
      } else {
        $(`#row_${index}`).append(`
          <td>${datum[key]}</td>
          `);
      }
    });
    while (currentLayer !== numOfLayers) {
      let childArray = datum[childKeys[currentLayer]];
      if (childArray) {
        childArray.forEach((child) => {
          let expandableKeys = Object.keys(child);
          expandableKeys = expandableKeys.filter((key) => {
            return !childKeys.includes(key);
          });

          $(`#body`).append(`
            <tr class="expandable" id="expandable_${index}_${currentLayer}"></tr>
            `);

          expandableKeys.forEach((key, keyIndex) => {
            if (keyIndex === 0) {
              $(`#expandable_${index}_${currentLayer}`).append(`
                <td><i onclick="openExpandable(${index}, ${currentLayer})" class="fa fa-caret-right"></i>${child[key]}</td>
                `);
            } else {
              $(`#expandable_${index}_${currentLayer}`).append(`
                <td>${child[key]}</td>
                `);
            }
          });

        });
        currentLayer += 1;
      } else {
        break;
      }
    };
  });
}

function openExpandable (rowId, layer) {
  $("#expandable_" + rowId + '_' + layer).toggle();
}

createTable(dataSet, childKeys, numOfLayers);
