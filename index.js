import {
  onGetDia,
  // q,
  updateCtaGral,
  getCantidad,
  ver,
  saveCat,
  getTotalCtaGral,
  onGetMes,
  onGetAnual01,
  onGetAnual02,
  onGetAnual03,
  onGetAnual04,
  onGetAnual05,
  onGetAnual06,
  onGetAnual07,
  onGetAnual08,
  onGetAnual09,
  onGetAnual10,
  onGetAnual11,
  onGetAnual12,
  onGetCategorias,
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


//formulario para agregar gastos o ingresos
const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

//tabla para visualizar el mes
const tasksContainer2 = document.getElementById("tasks-container2");
const botonCerrar = document.getElementById("cerrar");


const botonVerTodo = document.getElementById("miVerTodo");


//formulario para agregar una nueva categoria
const taskForm3 = document.getElementById("task-form3");
const tasksContainerCategory = document.getElementById("task-category");

//tabla para visualizar el año
const tasksContainer3 = document.getElementById("tasks-container3");
//formulario para agregar una nuevas cuentas
const taskForm4 = document.getElementById("task-form4");


const menu3 = document.getElementById("menuAnio");

let editStatus = false;
let id = "";
const date = new Date();
const currentMonth = date.getMonth() + 1;
//const fechaComp = date.getFullYear() + "/" + currentMonth + "/" + date.getDate();
const fechaComp = currentMonth + "_" + date.getFullYear();
const fechaRegistrar = date.getDate() + "_" + currentMonth + "_" + date.getFullYear();

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
  // console.log(task);
  document.getElementById('nombre').innerHTML = task;

  const ctaG = await getTotalCtaGral();
  const obtctag = ctaG.data().presupuesto;



  onGetTareas((querySnapshot) => {
    // tasksContainer2.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      //console.log(doc.data());

      //  document.getElementById('nombre').innerHTML = doc.data().name;

    });

  });


  onGetCategorias((Snapshot) => {
    // tasksContainer2.innerHTML = "";

    Snapshot.forEach((doc) => {
      const cate = doc.data().categoria;
      // console.log(cate);



      tasksContainerCategory.innerHTML += `
    
        <option>${doc.data().categoria}</option>    
         

   `;



      //  document.getElementById('nombre').innerHTML = doc.data().name;

    });

  });





  // const querySnapshotu = await q;
  onGetDia((querySnapshot) => {
    tasksContainer.innerHTML = "";

    const arr = [];
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      // const sumatotal = ;


      if (task.title == "Gastos") {
        let myString = parseFloat(task.cantidad);

        arr.push(myString);
      } else {

      }


      tasksContainer.innerHTML += `
      <tr >
         
 <td>${task.category}</td>

 <td>${task.cantidad}</td>
 <td>${task.description}</td>
 <td> 
 <div class="btn-group btn-group-sm"> 

<button onclick="location.href='#FormRegistrar'"  class="btn btn-secondary btn-edit" data-id="${doc.id}">
 🖉 Editar
</button>
<button class="btn btn-secondary btn-delete" data-id="${doc.id}">
 🗑 Eliminar
</button></div>
</td> </tr>

   `;

    });

    let total = arr.reduce((a, b) => a + b, 0);

    tasksContainer.innerHTML += `<tr><td>Total</td><td>$` + total + `</td><td></td><td></tr>`

    //console.log(arr.length)

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          const docu = await getCantidad(dataset.id);
          const micantidadactual = docu.data().cantidad;
          //console.log(dataset.id)

          if (docu.data().title == 'Ingresos') {
            const ctaG = await getTotalCtaGral();
            const obtctag = ctaG.data().presupuesto;
            //console.log(obtctag);
            var ingresarDinero = parseFloat(obtctag) - parseFloat(micantidadactual);
            console.log(ingresarDinero)
            await updateCtaGral({

              presupuesto: ingresarDinero,

            })
            await deleteTask(dataset.id);
          } else {

          }




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
          localStorage.setItem('numeroViejito', parseFloat(task.cantidad));
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
    const arr2 = [];

    //ir a mi div para editar


    querySnapshot.forEach((doc) => {
      const task = doc.data();

      if (task.title == "Gastos") {
        let myString = parseFloat(task.cantidad);


        arr2.push(myString);
      } else {

      }


      tasksContainer2.innerHTML += `
      <tr >
        <td>${task.date}</td>    
         
 <td>${task.category}</td>
 <td>${task.title}</td>
 <td>${task.cantidad}</td>
 <td>${task.description}</td>
 <td>  
 <div class="btn-group btn-group-sm"> 

<button onclick="location.href='#FormRegistrar'"  class="btn btn-secondary btn-edit" data-id="${doc.id}">
🖉 Editar
</button>
<button class="btn btn-secondary btn-delete" data-id="${doc.id}">
 🗑 Eliminar
</button></div>
</td> </tr>
   `;
    });
    //suma total de los gastos del mes
    let total = arr2.reduce((a, b) => a + b, 0);

    tasksContainer2.innerHTML += `<tr><td>Total</td><td></td><td></td><td>$` + total + `</td><td></td><td></td></tr>`

    var totalActual = parseFloat(obtctag) - total;
    document.getElementById('totalCuenta').innerHTML = "$" + totalActual;

    //obtener el total del mes, para actualizar en el navbar de total
    localStorage.setItem('arreglo2', total);

    const btnsDelete = tasksContainer2.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          const docu = await getCantidad(dataset.id);
          const micantidadactual = docu.data().cantidad;
          //console.log(dataset.id)


          if (docu.data().title == 'Ingresos') {
            const ctaG = await getTotalCtaGral();
            const obtctag = ctaG.data().presupuesto;
            //console.log(obtctag);
            var ingresarDinero = parseFloat(obtctag) - parseFloat(micantidadactual);
            console.log(ingresarDinero)
            await updateCtaGral({

              presupuesto: ingresarDinero,

            })
            await deleteTask(dataset.id);
          } else {

          }




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
          localStorage.setItem('numeroViejito', parseFloat(task.cantidad));

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });

  });



  //suma total de los gastos del mes



});



const arrtotal = [];
onGetAnual10((querySnapshot) => {
  // tasksContainer3.innerHTML = "";


  querySnapshot.forEach((doc) => {
    const task = doc.data();
    // console.log(task)
    arrtotal.push(task);

  })

})



//aTEST///////////////////////////////////////////////////////////


menu3.addEventListener("click", async (e) => {
  e.preventDefault();

  //enero
  onGetAnual01((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      arrtotal.push(task);
    })
  });
  //febrero
  onGetAnual02((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      arrtotal.push(task);
    })
  });

  //marzo
  onGetAnual03((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      arrtotal.push(task);
    })
  });

  //abril
  onGetAnual04((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      arrtotal.push(task);
    })
  });

  //mayo
  onGetAnual05((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      arrtotal.push(task);
    })
  });


  //junio
  onGetAnual06((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      arrtotal.push(task);
    })
  });

  //julio
  onGetAnual07((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      arrtotal.push(task);
    })
  });

  //agosto
  onGetAnual08((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      arrtotal.push(task);
    })
  });

  //septiembre
  onGetAnual09((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      arrtotal.push(task);
    })
  });

    //octubre
    onGetAnual10((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const task = doc.data();
  
        arrtotal.push(task);
      })
    });

  //noviembre
  onGetAnual11((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      arrtotal.push(task);
    })
  });
  //diciembre
  onGetAnual12((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      arrtotal.push(task);
    })
  });

  //se termina evento click 
});


botonVerTodo.addEventListener("click", async (e) => {
  e.preventDefault();

  tasksContainer3.innerHTML = "";

  for (var i = 0; i < arrtotal.length; i++) {
    console.log(arrtotal[i].category);
    tasksContainer3.innerHTML += `
    <tr >
      <td>${arrtotal[i].date}</td>    
       
<td>${arrtotal[i].category}</td>
<td>${arrtotal[i].title}</td>
<td>${arrtotal[i].cantidad}</td>
<td>${arrtotal[i].description}</td>
 </tr>
 `;
  }

});




//guardar un nuevo registro
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const categoria = taskForm["task-category"];
  const description = taskForm["task-description"];
  const cantidad = taskForm["task-number"];
  const uid = document.getElementById('nombre').innerHTML;



  try {
    if (!editStatus) {
      await saveTask(fechaRegistrar, title.value, categoria.value, description.value, cantidad.value, uid);
      //esto sirve para sumar ingreso a mi total


      if (title.value == "Ingresos") {
        const ctaG = await getTotalCtaGral();
        const obtctag = ctaG.data().presupuesto;
        //console.log(obtctag);
        var ingresarDinero = parseFloat(obtctag) + parseFloat(cantidad.value);
        await updateCtaGral({

          presupuesto: ingresarDinero,

        })
        const ctaG2 = await getTotalCtaGral();
        const obtctag2 = ctaG2.data().presupuesto;

        //obtener el total del mes
        var totalMes = localStorage.getItem('arreglo2');

        var mequedadelpresu = obtctag2 - parseFloat(totalMes);


        document.getElementById('totalCuenta').innerHTML = "$" + mequedadelpresu;

      }

    } else {
      await updateTask(id, {
        title: title.value,
        category: categoria.value,
        description: description.value,
        cantidad: cantidad.value,

      });
      //si hay que modificar el ingreso, se debe restar el monto actual y sumar 
      if (title.value == "Ingresos") {
        const ctaG = await getTotalCtaGral();
        const obtctag = ctaG.data().presupuesto;


        var numeroviejo = localStorage.getItem('numeroViejito');


        //  console.log(numeroviejo);
        var ingresarDinero = parseFloat(obtctag) - numeroviejo;
        // console.log(ingresarDinero)
        var ingresarDineroMod = ingresarDinero + parseFloat(cantidad.value);
        //console.log(ingresarDineroMod)
        await updateCtaGral({

          presupuesto: ingresarDineroMod,

        })
        document.getElementById('totalCuenta').innerHTML = "$" + ingresarDineroMod;
      }

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


//agregar una nueva categoria

taskForm3.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevacategoria = taskForm3["nuevaCategoria"].value;
  const emoji = taskForm3["task-emoji"].value;

  const newcategory = nuevacategoria + " " + emoji;

  try {
    tasksContainerCategory.innerHTML = `
    
    
     

`;
    await saveCat(newcategory);


    taskForm3.reset();
    taskForm["task-category"].value = '';
    alert('agregaste una nueva categoría!')
  } catch (error) {
    console.log(error);
  }

});






