//  Generate markup for all rows here
//  Each row will have a distinct id and hidden expandable rows under them
for(let i = 1; i <= 30; i++) {
    $("#body").append(`
        <tr id='row_${i}''>
        <td>Row ${i}</td>
        <td>Row ${i}</td>
        <td>Row ${i}</td>
        <td>Row ${i}</td>
        <td>Row ${i}</td>
        </tr>
        <tr class="expandable">
        <td>Row ${i}</td>
        <td>Row ${i}</td>
        <td>Row ${i}</td>
        <td>Row ${i}</td>
        <td>Row ${i}</td>
        </tr>
        `);
};
