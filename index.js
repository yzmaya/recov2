

import {
  onGetDia,
 onGetMes,
  saveTask,
  deleteTask,
  getTask,
  getTasking,
  updateTask,
  onGetTareas,
  cerrarSesion,
  getTasks,
  auth,

} from "./firebase.js";


const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

const tasksContainer2 = document.getElementById("tasks-container2");
const botonCerrar = document.getElementById("cerrar");

let editStatus = false;
let id = "";
const date = new Date();
const currentMonth = date.getMonth() + 1;
//const fechaComp = date.getFullYear() + "/" + currentMonth + "/" + date.getDate();
const fechaComp = date.getFullYear() + "/" + date.getDate() + "/" +  currentMonth;

console.log(fechaComp);

botonCerrar.addEventListener("click", async (e) => {
  e.preventDefault();




  try {
    //  console.log(correo.value)
    //console.log(contrasena.value)

    await cerrarSesion()
  } catch (error) {
    console.log(error);
  }
});



window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getTasks();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });

  const docu = await getTasking();
  const task = docu.data().name;
  //  console.log(task);
  document.getElementById('nombre').innerHTML = task;



  onGetTareas((querySnapshot) => {
    // tasksContainer2.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      //console.log(doc.data());

      //  document.getElementById('nombre').innerHTML = doc.data().name;


    });





  });

  onGetDia((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      /*
            tasksContainer.innerHTML += `
            <div class="card card-body mt-2 border-primary">
          <h3 class="h5">${task.cantidad} ${task.title}</h3>
          <p>${task.description}</p>
          <div>
            <button class="btn btn-primary btn-delete" data-id="${doc.id}">
              🗑 Eliminar
            </button>
            <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
              🖉 Editar
            </button>
          </div>
        </div>`;
          });
      */
      tasksContainer.innerHTML += `
      <tr >
        <td>${task.date}</td>    
         
 <td>${task.category}</td>
 <td>${task.title}</td>
 <td>${task.cantidad}</td>
 <td>${task.description}</td>
 <td>  
<button class="btn btn-secondary btn-edit" data-id="${doc.id}">
 🖉 Editar
</button>
<button class="btn btn-primary btn-delete" data-id="${doc.id}">
 🗑 Eliminar
</button>
</td> </tr>
   `;
    });



    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-category"].value = task.category;
          taskForm["task-description"].value = task.description;
          taskForm["task-number"].value = task.cantidad;
          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });

  });


  //aqui empieza el tab para la información mensual


  onGetMes((querySnapshot) => {
    tasksContainer2.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      console.log(doc.data())
      /*
            tasksContainer.innerHTML += `
            <div class="card card-body mt-2 border-primary">
          <h3 class="h5">${task.cantidad} ${task.title}</h3>
          <p>${task.description}</p>
          <div>
            <button class="btn btn-primary btn-delete" data-id="${doc.id}">
              🗑 Eliminar
            </button>
            <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
              🖉 Editar
            </button>
          </div>
        </div>`;
          });
      */
      tasksContainer2.innerHTML += `
      <tr >
        <td>${task.date}</td>    
         
 <td>${task.category}</td>
 <td>${task.title}</td>
 <td>${task.cantidad}</td>
 <td>${task.description}</td>
 <td>  
<button class="btn btn-secondary btn-edit" data-id="${doc.id}">
 🖉 Editar
</button>
<button class="btn btn-primary btn-delete" data-id="${doc.id}">
 🗑 Eliminar
</button>
</td> </tr>
   `;
    });



    const btnsDelete = tasksContainer2.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer2.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-category"].value = task.category;
          taskForm["task-description"].value = task.description;
          taskForm["task-number"].value = task.cantidad;
          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });

  });


});

//boton para guardar 


taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const categoria = taskForm["task-category"];
  const description = taskForm["task-description"];
  const cantidad = taskForm["task-number"];
  const uid = document.getElementById('nombre').innerHTML;




  try {
    if (!editStatus) {
      await saveTask(fechaComp, title.value, categoria.value, description.value, cantidad.value, uid);
    } else {
      await updateTask(id, {
        title: title.value,
        category: categoria.value,
        description: description.value,
        cantidad: cantidad.value,

      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});







