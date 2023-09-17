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


//mostrar graficos del dia y del mes
const verGraficoDia = document.getElementById("VERDIA");
const verGraficoMes = document.getElementById("VERMES");

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



//console.log(mesActual)


let fechaDiaRegistro = date.getDate();  // Inicializar con el día de hoy
let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);  // Inicializar con el mes de hoy
let mesActualTemp = currentMonth + "_" + date.getFullYear();
const mifechaInput = document.getElementById('mifecha');



// Escuchar cambios en el campo de fecha
mifechaInput.addEventListener('change', (e) => {





  const selectedDate = new Date(`${e.target.value}T00:00:00`); // Si
  // const PrototypeDate = new Date(`${date}`); // No


  const selectedDay = selectedDate.getDate();

  const selectedMonth = selectedDate.getMonth() + 1; // Sumamos 1 ya que los meses en JavaScript van de 0 a 11

  const day = selectedDate.getDate();
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();
  const superResult = String(day) + "/" + String(month) + "/" + String(year);
 // console.log("superResult: ", superResult)


  // Validar si el día seleccionado es válido en el mes seleccionado
  const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedMonth, 0).getDate();

  if (selectedDay <= lastDayOfMonth) {
    fechaDiaRegistro = selectedDay;
    mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(selectedDate);
    mesActualTemp = String(month) + '_' + date.getFullYear();
    // Mostrar la fecha seleccionada
 //   console.log(`Fecha seleccionada: ${fechaDiaRegistro} de ${mesActual}`);
   // console.log(mesActualTemp)
  } else {
    // El día seleccionado no es válido en el mes, mostrar un mensaje de error
    console.error('Día no válido en el mes seleccionado');

  }
});

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

verGraficoMes.addEventListener("click", async (e) => {
  e.preventDefault();

  detonar2();
});

verGraficoDia.addEventListener("click", async (e) => {
  e.preventDefault();

  detonar();
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




  // detonar();
  // const querySnapshotu = await q;
  onGetDia((querySnapshot) => {
    tasksContainer.innerHTML = "";

    const arr = [];
    const arrcanvasCategorias = [];
    const arrcanvasCategoriasytotales = [];


    querySnapshot.forEach((doc) => {
      const task = doc.data();

      // const sumatotal = ;


      if (task.title == "Gastos") {
        let myString = parseFloat(task.cantidad);
        // console.log(task.category)
        //console.log(myString)
        arr.push(myString);

        arrcanvasCategorias.push(task.category);
        arrcanvasCategoriasytotales.push({ categoria: task.category, total: task.cantidad });




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
    // console.log(arrcanvas)

    //console.log(arrultotales)
    localStorage.setItem("key", JSON.stringify(arrcanvasCategoriasytotales));

    tasksContainer.innerHTML += `<tr><td>Total</td><td>$` + total.toLocaleString('es-MX') + `</td><td style='font-size: 0;' id='mytotaldia'>`+total+`</td><td></tr>`


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
          detonar();
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

          const taskDate = task.date; // Suponiendo que task.date es un número que representa el día del mes
          const year = new Date().getFullYear(); // Obtener el año actual
          const month = new Date().getMonth() + 1; // Obtener el mes actual (se suma 1 porque en JavaScript los meses van de 0 a 11)
          const formattedTaskDate = `${year}-${month.toString().padStart(2, '0')}-${taskDate.toString().padStart(2, '0')}`; // Formato YYYY-MM-DD

          // Establecer la fecha en el input "mifecha"
          mifechaInput.value = formattedTaskDate;

          console.log(formattedTaskDate); // Imprimir la fecha en la consola




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
    const arrcanvasgetmes = [];

    //ir a mi div para editar
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      if (task.title == "Gastos") {
        let myString = parseFloat(task.cantidad);


        arr2.push(myString);


        arrcanvasgetmes.push({ categoria: task.category, total: task.cantidad });
        //   console.log(arrcanvasgetmes)




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

    tasksContainer2.innerHTML += `<tr><td>Total</td><td></td><td style='font-size: 0;' id='mytotalmes'>`+total+`</td><td>$` + total.toLocaleString('es-MX') + `</td><td></td><td></td></tr>`
    //sdetonar2();
    var totalActual = parseFloat(obtctag) - total;
    document.getElementById('totalCuenta').innerHTML = "$" + totalActual.toLocaleString('es-MX');
    localStorage.setItem("key2", JSON.stringify(arrcanvasgetmes));
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
            detonar2()
          } else {

          }




          await deleteTask(dataset.id);
          detonar2()
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

          const taskDate = task.date; // Suponiendo que task.date es un número que representa el día del mes
          const year = new Date().getFullYear(); // Obtener el año actual
          const month = new Date().getMonth() + 1; // Obtener el mes actual (se suma 1 porque en JavaScript los meses van de 0 a 11)
          const formattedTaskDate = `${year}-${month.toString().padStart(2, '0')}-${taskDate.toString().padStart(2, '0')}`; // Formato YYYY-MM-DD

          // Establecer la fecha en el input "mifecha"
          mifechaInput.value = formattedTaskDate;

          console.log(formattedTaskDate); // Imprimir la fecha en la consola


          localStorage.setItem('numeroViejito', parseFloat(task.cantidad));

          editStatus = true;
          id = doc.id;
          detonar2()
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
let myChart;

function detonar() {

  var micat = JSON.parse(localStorage.getItem("key"));
  //console.log(micat)
  var mitotalst = parseInt(document.getElementById('mytotaldia').innerHTML)

  const arrultcat = [];
  const arrultotales = [];
  const rta = micat
    .map(item => item.categoria)
    .reduce((obj, categoria, indice) => {


      if (obj[categoria]) {

        obj[categoria] = obj[categoria] + parseInt(micat[indice].total);

        // console.log(indice)

      }
      else {

        obj[categoria] = parseInt(micat[indice].total);



      }



      return obj;


    }, []);


  //console.log(arrultcat)
  //console.log(rta)

  // Obteniendo todas las claves del JSON
  for (var clave in rta) {
    // Controlando que json realmente tenga esa propiedad
    if (rta.hasOwnProperty(clave)) {
      // Mostrando en pantalla la clave junto a su valor
      //alert("La clave es " + clave+ " y el valor es " + rta[clave]);
      arrultcat.push(clave);
      //si quieres obtener los totales de cada categoria descomenta
      //arrultotales.push(rta[clave])
     // console.log(rta[clave])
      //aqui hacemos la conversión de cantidad a %

      var porcentaje = Math.round(rta[clave] / mitotalst * 100);
      arrultotales.push(porcentaje);
      

    }
  }

  var ctx = document.getElementById('myChart').getContext("2d");
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: arrultcat,
      datasets: [{
        label: 'cantidad gastada %',
        data: arrultotales,
        backgroundColor: [
          '#ED6464',
          '#BF6370',
          '#87586C',
          '#574759',
          '#1A1B1C',
          '#6D2243',
          '#BA2640',
          '#EC5E0C',
          '#F78F1E',
          '#85871A',


        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  });

}


function detonar2() {

  var micat = JSON.parse(localStorage.getItem("key2"));
  //console.log(micat)
var mitotalst = parseInt(document.getElementById('mytotalmes').innerHTML)

  const arrultcat = [];
  const arrultotales = [];
  const rta = micat
    .map(item => item.categoria)
    .reduce((obj, categoria, indice) => {


      if (obj[categoria]) {

        obj[categoria] = obj[categoria] + parseInt(micat[indice].total);

        // console.log(indice)

      }
      else {

        obj[categoria] = parseInt(micat[indice].total);



      }



      return obj;


    }, []);


  //console.log(arrultcat)
  //console.log(rta)

  // Obteniendo todas las claves del JSON
  for (var clave in rta) {
    // Controlando que json realmente tenga esa propiedad
    if (rta.hasOwnProperty(clave)) {
      // Mostrando en pantalla la clave junto a su valor
      //alert("La clave es " + clave+ " y el valor es " + rta[clave]);
      arrultcat.push(clave);
      //si quieres obtener los totales de cada categoria descomenta
      //arrultotales.push(rta[clave])
     // console.log(rta[clave])
      //aqui hacemos la conversión de cantidad a %

      var porcentaje = Math.round(rta[clave] / mitotalst * 100);
      arrultotales.push(porcentaje);
      console.log(rta[clave] / mitotalst * 100)
      console.log(porcentaje)
      

    }
  }

  var ctx = document.getElementById('myChart').getContext("2d");
  if (myChart) {
    myChart.destroy();
  }
  console.log(arrultotales);
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: arrultcat,
      datasets: [{
        label: 'cantidad gastada %',
        data: arrultotales,
        backgroundColor: [
          '#ED6464',
          '#BF6370',
          '#87586C',
          '#574759',
          '#1A1B1C',
          '#6D2243',
          '#BA2640',
          '#EC5E0C',
          '#F78F1E',
          '#85871A',
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  });

}

botonVerTodo.addEventListener("click", async (e) => {
  e.preventDefault();

  tasksContainer3.innerHTML = "";

  for (var i = 0; i < arrtotal.length; i++) {
    console.log(arrtotal[i].category);
    tasksContainer3.innerHTML += `
    <tr >
      <td>${arrtotal[i].mesActual}</td>    
       
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
      await saveTask(fechaDiaRegistro, title.value, categoria.value, description.value, cantidad.value, mesActual, mesActualTemp,  uid);
      //esto sirve para sumar ingreso a mi total

      detonar();
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


        document.getElementById('totalCuenta').innerHTML = "$" + mequedadelpresu.toLocaleString('es-MX');

      }

    } else {

      await updateTask(id, {
        title: title.value,
        category: categoria.value,
        description: description.value,
        cantidad: cantidad.value,
        date: fechaDiaRegistro

      });
      detonar();

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
        document.getElementById('totalCuenta').innerHTML = "$" + ingresarDineroMod.toLocaleString('es-MX');
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
    taskForm["task-category"].value = newcategory;
    alert('agregaste una nueva categoría!')
    $('#myModale').modal('hide')
  } catch (error) {
    console.log(error);
  }

});





window.addEventListener('load', function () {
  detonar();
});
