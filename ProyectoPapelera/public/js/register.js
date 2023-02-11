windows.addEventListener("load", function(){
    let formulario= document.querySelector ("form.reservation");
  
    formulario.addEventListener("submit", function(e){
  
      let errores=[];
  
      let campoNombre= document.querySelector("input.firstName")
  
      if(campoNombre.value == ""){
          errores.push("El campo de nombre debe estar completo");
      }
      else if((campoNombre.value.length< 3)){
          errores.push("El campo de nombre debe tener al menos 2 caracteres");
      }
  
      let campoApellido= document.querySelector("input.lastName")
  
      if(campoApellido.value= ""){
          errores.push("El campo de apellido debe estar completo");
      }
      else if((campoApellido.value.length< 3)){
          errores.push("El campo de apellido debe tener al menos 4 caracteres");
      }
  
      let campoEmail= document.querySelector("input.email")
  
      if(campoEmail.value= ""){
          errores.push("El campo de email debe estar completo");
      }
      else if((campoEmail.value === "@")){
          errores.push("El campo de email debe tener formato @ para ser válido");
      }
      else if((campoEmail.value != a )){
          errores.push("Este email ya existe, cambielo");
      }
      
      let campoContraseña= document.querySelector("input.password")
  
      if(campoContraseña.value= ""){
          errores.push("El campo de contraseña debe estar completo");
      }
      else if((campoContraseña.value.length< 3)){
          errores.push("El campo de contraseña debe tener al menos 8 caracteres");
      }
  
  
  
  if (errores.length > 0){
  e.preventDefault();
  let ulErrores= document.querySelector("div.errores ul");
  for (let i=0; i< errores.length; i++){
      ulErrores.innerHTML += "<li> " + errores[i] + "</li>"
  }
  
  }
  
    })
  
  })