// Example starter JavaScript for disabling form submissions if there are invalid fields
		(function () {
		  'use strict'

		  // Fetch all the forms we want to apply custom Bootstrap validation styles to
		  const forms = document.querySelectorAll('.validated-form')
		  const fileInput = document.querySelector("input[type=file]")
		  // Loop over them and prevent submission
		  Array.from(forms)
		    .forEach(function (form) {
		      form.addEventListener('submit', function (event) {
		        if(fileInput.files.length > 5 || fileInput.files.length === 0) {
				    event.preventDefault();
				    event.stopPropagation();
				    fileInput.classList.add('is-invalid')
				  } else {
				  	fileInput.classList.remove('is-invalid')
				  }
		        if (!form.checkValidity()) {
		          event.preventDefault()
		          event.stopPropagation()
		        } 

		        form.classList.add('was-validated')
		      }, false)
		    })
		})()
