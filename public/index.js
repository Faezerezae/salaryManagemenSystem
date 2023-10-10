"use strict";
const form = document.getElementById("form");
const container = document.getElementById("container");
const nameInput = document.getElementById("name");
const salaryInput = document.getElementById("salary");
const btnSubmit = document.getElementById("submit");
let editMode = false;
let userEditId = null;
const sortElement = document.getElementById("sort");
const deleteAllElement = (document.getElementById("delete all"));
const sortBtn = document.getElementById("sort-btn");
const date = new Date().getTime();
// ایجاد ارایه خالی
// let user:User[]=[]
let users = JSON.parse(localStorage.getItem("users")) || [];
const getUserData = () => {
    let newDate = new Date().getTime();
    return {
        name: nameInput.value,
        salary: salaryInput.value,
        id: newDate - date,
    };
};
const renderUI = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
    container.innerHTML = "";
    users.forEach((user) => {
        const divItem = document.createElement("div");
        divItem.setAttribute("class", "item");
        const nameSpan = document.createElement("span");
        nameSpan.innerText = user.name;
        const salarySpan = document.createElement("span");
        salarySpan.innerText = `${user.salary} تومان`;
        const btnEdit = document.createElement("button");
        btnEdit.innerText = "Edit";
        btnEdit.classList.add("btn-edit");
        btnEdit.addEventListener("click", () => editUser(user));
        const btnDelete = document.createElement("button");
        btnDelete.innerText = "X";
        btnDelete.classList.add("btn-white");
        btnDelete.addEventListener("click", () => deleteUser(user.id));
        divItem.append(nameSpan, salarySpan);
        divItem.append(btnDelete, btnEdit);
        container.append(divItem);
    });
};
renderUI(users);
const addUser = (edit) => {
    if (edit) {
        const myUser = users.find((user) => user.id === userEditId);
        myUser.name = nameInput.value;
        myUser.salary = salaryInput.value;
        editMode = false;
        userEditId = null;
        btnSubmit.innerText = "ثبت نهایی";
    }
    else {
        const myUser = getUserData();
        users = [...users, myUser];
    }
    renderUI(users);
    emptyForm();
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addUser(editMode);
});
const emptyForm = () => {
    nameInput.value = "";
    salaryInput.value = "";
};
// اونایی که مخالف این آی دی هستند را نگه دار
const deleteUser = (id) => {
    users = users.filter((user) => user.id !== id);
    renderUI(users);
};
const editUser = (user) => {
    nameInput.value = user.name;
    salaryInput.value = user.salary;
    btnSubmit.innerText = "ویرایش";
    editMode = true;
    userEditId = user.id;
};
const sortHandler = (event) => {
    const sortelem = event.target;
    switch (sortelem.value) {
        case "+1":
            users.sort((data1, data2) => +data2.salary - +data1.salary);
            break;
        case "-1":
            users.sort((data1, data2) => +data1.salary - +data2.salary);
            break;
    }
    renderUI(users);
};
sortElement.addEventListener("change", sortHandler);
deleteAllElement.addEventListener("click", () => {
    container.remove();
    localStorage.clear();
    alert("همه اطلاعات پاک شد");
});
