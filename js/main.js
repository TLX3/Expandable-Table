//  Generate markup for rows here
// User inputs data set and keys to expandable row by layer
let numOfLayers = 3;
let childKeys = ['children1', 'children2', 'children3'];
var request = new XMLHttpRequest();
request.open('GET', 'https://api.myjson.com/bins/kzzk1', true);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    let dataSet = JSON.parse(request.responseText).response;

    function createTable(dataSet, childKeys, numOfLayers) {
      let headers = Object.keys(dataSet[0]);
      headers = headers.filter((key) => {
        return !childKeys.includes(key);
      });
      headers.forEach((key) => {
        $("#headers").append(`
          <th>${key}</th>
          `);
      })
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
                <td><i onclick="toggleExpandable(${index}, ${currentLayer + 1}, ${childKeys.length})" style="margin-left: ${(currentLayer + 1)*15}px;" class="fa fa-caret-right"></i>${child[key]}</td>
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

    $('tbody').scroll(function (e) {
    $('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
    $('thead th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
    $('tbody td:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
  });

    createTable(dataSet, childKeys, numOfLayers);
  }
};

request.onerror = function() {
  console.log(request.responseText);
};

request.send();
