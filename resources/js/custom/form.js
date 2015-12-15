$("#email-form").submit(function(e) {

    e.preventDefault();

    var url = "php-files/email.php";
    var email = $('#email-input').val();

    if(email){
        $.ajax({
           type: "POST",
           url: url,
           data: $("#email-form").serialize(),
           success: function(data)
           {
               // Set value of the e-mail input field to empty
               $("#email-input").delay(1000).queue(function (next) { 
                    $(this).val('');
                    next();
                });
           },
           error: function(data) {
                
           }
        });
    }
    
});