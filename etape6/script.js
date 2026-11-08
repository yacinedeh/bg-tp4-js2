"use strict";

let lignes = 0;
let total_points = 0;

const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

function doInsertRowTable(num, nom, prenom, points) {
    const tableBody = document.getElementById("table_body");

    const row = document.createElement("tr");
    row.setAttribute("class", "row");

    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.append(checkbox);

    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    row.append(col1, col2, col3, col4, col5);
    tableBody.append(row);
}

function update_summary() {
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    element_lignes.innerText = `${lignes} row(s)`;
    element_points.innerText = `Total point(s)= ${total_points}`;
}


function doInsert(nom, prenom, points) {
    total_points += points;
    lignes++;
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary();
}

function doNewData() {
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    const nom = elt_nom.value;
    const prenom = elt_prenom.value;
    const points = parseInt(elt_points.value);

    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        window.alert("Incomplete form!");
    } else {
        doInsert(nom, prenom, points);
        persons.push({ nom: nom, prenom: prenom, points: points });

        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

function deleteRow() {
    if (lignes === 0) {
        window.alert("The table is empty!");
        return;
    }

    const tableBody = document.querySelector("#table_body");
    const checkedBoxes = tableBody.querySelectorAll(".col_chkbox input:checked");

    if (checkedBoxes.length === 0) {
        window.alert("Select at least one row!");
        return;
    }

    if (!window.confirm("Delete the selected rows?")) {
        return;
    }

    const rows = tableBody.querySelectorAll("tr");

    for (let i = rows.length - 1; i >= 0; i--) {
        const checkbox = rows[i].querySelector("input");
        if (checkbox.checked) {
            const points = parseInt(rows[i].children[3].innerText);
            total_points -= points;
            lignes--;
            rows[i].remove();
            persons.splice(i, 1);
        }
    }

    const remainingRows = tableBody.querySelectorAll("tr");
    remainingRows.forEach((row, index) => {
        row.children[0].innerText = index + 1;
    });

    window.alert("Rows deleted successfully!");
    update_summary();
}

function init() {
    for (const { nom, prenom, points } of persons) {
        doInsert(nom, prenom, points);
    }
}

function consoleTableau() {
    console.log(persons);
}

init();