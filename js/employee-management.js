/*eslint-env browser*/

var btnDel = [], i;

for (i = 0; i < 6; i += 1) {
    btnDel[i] = "<button class='btnDel" + String(i) + "'>delete</button>";
}

var employeeLst = [["Sally Smith", "Quality Assurance", 5555, btnDel[0]],
                    ["Mark Martin", "VP Sales", 4444, btnDel[1]],
                    ["Hitensh Kharva", "Backend Developer", 3300, btnDel[2]],
                    ["Pritesh Choksi", "Frontend Developer", 3301, btnDel[3]],
                    ["Yash Thakkar", "Accountant", 2222, btnDel[4]],
                    ["Nishant Shah", "CEO", 1111, btnDel[5]]];

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

function viewEmployees() {
    "use strict";
    var row, col, table, tbody, tableString = "";
    
    table = document.getElementsByTagName("table")[0];
    tbody = document.createElement('tbody');
    
    $("qtyEmployee").innerHTML = "Showing " + employeeLst.length + " employees";
        
    for (row = 0; row < employeeLst.length; row += 1) {
        tableString += "<tr>";
        for (col = 0; col < 4; col += 1) {
            tableString += "<td>" + employeeLst[row][col] + "</td>";
        }
        tableString += "</tr>";
    }
    tableString += "</tbody>";
    table.appendChild(tbody);
    $("tblBody").innerHTML = tableString;
}

var addEmployee = function () {
    "use strict";
    var name, title, extension, employee = [];
       
    name = $("name").value;
    title = $("title").value;
    extension = $("extension").value;
       
    if (name === "") {
        $("requireName").innerHTML = "This field is required.";
        return;
    } else {
        $("requireName").innerHTML = "";
        employee.push(name);
    }
    
    if (title === "") {
        $("requireTitle").innerHTML = "This field is required.";
        return;
    } else {
        $("requireTitle").innerHTML = "";
        employee.push(title);
    }
    
    if (extension === "") {
        $("requireExt").innerHTML = "This field is required.";
        return;
    }
    
    if (isNaN(extension) || extension.length !== 4) {
        $("requireExt").innerHTML = "The extension must be a 4-digit number";
        return;
    } else {
        $("requireExt").innerHTML = "";
        employee.push(extension);
        window.console.log(employeeLst.length);
        btnDel[employeeLst.length + 1] = "<button class='btnDel" + String(employeeLst.length + 1) + "'>delete</button>";
        employee.push(btnDel[employeeLst.length + 1]);
    }
    
    if (employee.length > 0) {
        employeeLst.push(employee);
    }
    viewEmployees();
   
    $("regForm").reset();
    $("name").innerHTML = "";
    $("title").innerHTML = "";
    $("extension").innerHTML = "";
};

var deleteEmployee = function (index) {
    "use strict";
    employeeLst.splice(index, 1);
    viewEmployees();
};

window.addEventListener("load", function () {
    "use strict";
    viewEmployees();
    $("add").addEventListener("click", addEmployee);
    $("tblBody").addEventListener("click", function (e) {
        if (e.target.textContent.match(/delete/)) {
            var i, index, tblBody, btnElements;

            tblBody = $("tblBody");
            btnElements = tblBody.getElementsByTagName("button");
            for (i = 0; i < btnElements.length; i += 1) {
                if (event.target.className === btnElements[i].className) {
                    index = i;
                }
            }
            deleteEmployee(index);
        }
    });
});