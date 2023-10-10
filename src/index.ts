const form = <HTMLFormElement>document.getElementById("form");
const container = <HTMLDivElement>document.getElementById("container");
const nameInput = <HTMLInputElement>document.getElementById("name");
const salaryInput = <HTMLInputElement>document.getElementById("salary");
const btnSubmit = <HTMLButtonElement>document.getElementById("submit");
let editMode = false;
let userEditId: null | number = null;

const sortElement = document.getElementById("sort")!;
const deleteAllElement = <HTMLButtonElement>(
  document.getElementById("delete all")
);

const sortBtn = <HTMLButtonElement>document.getElementById("sort-btn");

const date = new Date().getTime();
// مشخص کردن نوع داده ها
type User = {
  id: number;
  name: string;
  salary: string;
};

// ایجاد ارایه خالی
// let user:User[]=[]
let users: Array<User> = JSON.parse(localStorage.getItem("users")!) || [];

const getUserData = (): User => {
  let newDate = new Date().getTime();
  return {
    name: nameInput.value,
    salary: salaryInput.value,
    id: newDate - date,
  };
};

const renderUI = (users: User[]): void => {
  localStorage.setItem("users", JSON.stringify(users));
  container.innerHTML = "";
  users.forEach((user: User) => {
    const divItem = <HTMLDivElement>document.createElement("div");
    divItem.setAttribute("class", "item");
    const nameSpan = <HTMLSpanElement>document.createElement("span");
    nameSpan.innerText = user.name;
    const salarySpan = <HTMLSpanElement>document.createElement("span");
    salarySpan.innerText = `${user.salary} تومان`;
    const btnEdit = <HTMLButtonElement>document.createElement("button");
    btnEdit.innerText = "Edit";
    btnEdit.classList.add("btn-edit");
    btnEdit.addEventListener("click", () => editUser(user));
    const btnDelete = <HTMLButtonElement>document.createElement("button");
    btnDelete.innerText = "X";
    btnDelete.classList.add("btn-white");
    btnDelete.addEventListener("click", () => deleteUser(user.id));
    divItem.append(nameSpan, salarySpan);
    divItem.append(btnDelete, btnEdit);
    container.append(divItem);
  });
};

renderUI(users);

const addUser = (edit: boolean) => {
  if (edit) {
    const myUser: User = users.find((user: User) => user.id === userEditId)!;
    myUser.name = nameInput.value;
    myUser.salary = salaryInput.value;
    editMode = false;
    userEditId = null;
    btnSubmit.innerText = "ثبت نهایی";
  } else {
    const myUser: User = getUserData();
    users = [...users, myUser];
  }
  renderUI(users);
  emptyForm();
};

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  addUser(editMode);
});

const emptyForm = () => {
  nameInput.value = "";
  salaryInput.value = "";
};
// اونایی که مخالف این آی دی هستند را نگه دار
const deleteUser = (id: number) => {
  users = users.filter((user: User) => user.id !== id);
  renderUI(users);
};

const editUser = (user: User) => {
  nameInput.value = user.name;
  salaryInput.value = user.salary;
  btnSubmit.innerText = "ویرایش";
  editMode = true;
  userEditId = user.id;
};

const sortHandler = (event: Event) => {
  const sortelem = event.target as HTMLSelectElement;
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
