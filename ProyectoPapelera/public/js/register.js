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

      if(campoApellido.value == ""){
          errores.push("El campo de apellido debe estar completo");
      }
      else if((campoApellido.value.length< 3)){
          errores.push("El campo de apellido debe tener al menos 2 caracteres");
      }
      
      let campoEmail= document.querySelector("input.email")
      
      if(campoEmail.value == ""){
          errores.push("El campo de correo electrónico debe estar completo");
      }
      else if (!campoEmail.value.includes("@")){
          errores.push("El correo electrónico debe tener una arroba");
      }
      else if (!campoEmail.value.includes(".")){
          errores.push("El correo electrónico debe tener un punto");
      }
      
      let campoPassword= document.querySelector("input.password")
      
      if(campoPassword.value == ""){
          errores.push("El campo de contraseña debe estar completo");
      }
      else if((campoPassword.value.length< 6)){
          errores.push("La contraseña debe tener al menos 6 caracteres");
      }
      
      let campoImagen= document.querySelector("input.image")
      
      if(campoImagen.value == ""){
          errores.push("Debe seleccionar una imagen");
      }
      
      if (errores.length > 0){
          e.preventDefault();
      
          let ulErrores= document.querySelector("div.errores ul");
      
          for (let i=0; i< errores.length; i++){
              ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
            }
  
        }
        
          })
        
        })
    


/*

      let campoApellido= document.querySelector("input.lastName")

      if(campoApellido.value == ""){
          errores.push("El campo de apellido debe estar completo");
      }
      else if((campoApellido.value.length< 3)){
          errores.push("El campo de apellido debe tener al menos 2 caracteres");
      }
      
      let campoEmail= document.querySelector("input.email")
      
      if(campoEmail.value == ""){
          errores.push("El campo de correo electrónico debe estar completo");
      }
      else if (!campoEmail.value.includes("@")){
          errores.push("El correo electrónico debe tener una arroba");
      }
      else if (!campoEmail.value.includes(".")){
          errores.push("El correo electrónico debe tener un punto");
      }
      
      let campoPassword= document.querySelector("input.password")
      
      if(campoPassword.value == ""){
          errores.push("El campo de contraseña debe estar completo");
      }
      else if((campoPassword.value.length< 6)){
          errores.push("La contraseña debe tener al menos 6 caracteres");
      }
      
      let campoImagen= document.querySelector("input.image")
      
      if(campoImagen.value == ""){
          errores.push("Debe seleccionar una imagen");
      }
      
      if (errores.length > 0){
          e.preventDefault();
      
          let ulErrores= document.querySelector("div.errores ul");
      
          for (let i=0; i< errores.length; i++){
              ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
          }
      
      }
      let campoApellido= document.querySelector("input.lastName")
    
      if(campoApellido.value == ""){
          errores.push("El campo de apellido debe estar completo");
      }
      else if((campoApellido.value.length< 3)){
          errores.push("El campo de apellido debe tener al menos 2 caracteres");
      }
      
      let campoEmail= document.querySelector("input.email")
      
      if(campoEmail.value == ""){
          errores.push("El campo de correo electrónico debe estar completo");
      }
      else if (!campoEmail.value.includes("@")){
          errores.push("El correo electrónico debe tener una arroba");
      }
      else if (!campoEmail.value.includes(".")){
          errores.push("El correo electrónico debe tener un punto");
      }
      
      let campoPassword = document.querySelector("input.password")
      
      if(campoPassword.value == ""){
          errores.push("El campo de contraseña debe estar completo");
      }
      else if((campoPassword.value.length< 6)){
          errores.push("La contraseña debe tener al menos 6 caracteres");
      }
      
      let campoImagen= document.querySelector("input.image")
      
      if(campoImagen.value == ""){
          errores.push("Debe seleccionar una imagen");
      }
      
      if (errores.length > 0){
          e.preventDefault();
      
          let ulErrores= document.querySelector("div.errores ul");
      
          for (let i=0; i< errores.length; i++){
              ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
            }
  
        }
        
          })
        
        })*/
      
    
      


  

  