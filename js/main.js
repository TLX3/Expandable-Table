//  Generate markup for rows here
//  Each expandable row will have a distinct id

// User inputs data set and keys to expandable row by layer
let numOfLayers = 3;
let childKeys = ['child1', 'child2', 'child3'];
let dataSet = [
{'row1': 'First Item row 1', 'row2': 'First Item row 2', 'row3': 'First Item row 3', 'row4': 'First Item row 4', 'row5': 'First Item row 5',
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
{'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
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
{'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
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
{'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
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
{'row1': 'row 1', 'row2': 'row 2', 'row3': 'row 3', 'row4': 'row 4', 'row5': 'row 5',
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
        <td><i onclick='openExpandable(expandable_${index})' class="fa fa-caret-right"></i>${datum[key]}</td>
        `);
    } else {
      $(`#row_${index}`).append(`
        <td>${datum[key]}</td>
        `);
    }
  });
  let currentLayer = 0;
  while (currentLayer !== numOfLayers) {
    if (datum[childKeys[currentLayer]]) {
      let expandableKeys = Object.keys(datum[childKeys[currentLayer]]);
      expandableKeys = expandableKeys.filter((key) => {
        return !childKeys.includes(key);
      });
      currentLayer += 1;
      $(`#row_${index}`).append(`
        <tr class="expandable" id='expandable_${index}'></tr>
        `);
    } else {
      break;
    }
  };
  //     `
  // <tr id='expandable1_${i}' class="expandable">
  // <td>Hidden Row ${i}</td>
  // <td>Hidden Row ${i}</td>
  // <td>Hidden Row ${i}</td>
  // <td>Hidden Row ${i}</td>
  // <td>Hidden Row ${i}</td>
  // </tr>
  // `
  // }
});

function openExpandable (rowId) {
  $("#expandable_" + rowId).toggle();
}
