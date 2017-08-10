//  Generate markup for rows here
//  Each expandable row will have a distinct id
for(let i = 1; i <= 30; i++) {
    $("#body").append(`
        <tr>
        <td><i onclick='openExpandable(${i})' class="fa fa-caret-right"></i>Row ${i}</td>
        <td>Row ${i}</td>
        <td>Row ${i}</td>
        <td>Row ${i}</td>
        <td>Row ${i}</td>
        </tr>
        <tr id='expandable1_${i}' class="expandable">
        <td>Hidden Row ${i}</td>
        <td>Hidden Row ${i}</td>
        <td>Hidden Row ${i}</td>
        <td>Hidden Row ${i}</td>
        <td>Hidden Row ${i}</td>
        </tr>
        `);
};

function openExpandable (rowId) {
    $("#expandable1_" + rowId).toggle();
}
