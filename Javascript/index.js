window.onload = function(){

    const menu_hamburger = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');
    const mobile_menu_nav = document.querySelector('.remove-mobile-nav');

    menu_hamburger.addEventListener('click', function(){
        menu_hamburger.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });

    // THE VALIDATING THE HOMEPAGE CONTACT FORM
    const contact_form = document.querySelector('.home-contact');
    const fullName = document.getElementById('.name')
    const emailAddress = document.getElementById('.email')
    const phoneNumber = document.getElementById('.phone')
    const subject = document.getElementById('.subject')
    const message = document.getElementById('.message')

    function sendEmail(){
        const bodyMessage = `Subject: ${subject.value}<br>
                             Full Name: ${fullName.value}<br>
                             Email Address: ${emailAddress.value}<br>
                             Phone Number: ${phoneNumber.value}<br><br><br>
                             Message: ${message.value}<br>`
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "twizald.03@gmail.com",
            Password : "808EEED423FD0754F6A9443316D6A98AD97C",
            To : 'twizald.03@gmail.com',
            From : "you@isp.com",
            Subject : subject.vlaue,
            Body : bodyMessage
        }).then(
          message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success"
                  });
            }
          }
        );
    }
    function checkInputs(){
        const inputs = document.querySelectorAll(".inputs");

        for (const input of inputs) {
            if (input.value == "") {
                input.classList.add("error-txt");
                input.parentElement.classList.add(error-txt);
            }

            input.addEventListener("keyup", () => {
                if (input.value != ""){
                    input.classList.remove("error-txt");
                    input.parentElement.classList.remove(error-txt)
                }
                else {
                    
                }
            })
        }
    }

    contact_form.addEventListener("submit", (e) => {
        e.preventDefault();

        checkInputs();
        // sendEmail();
    })

}