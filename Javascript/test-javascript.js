/*
Email.send({
            Host : "smtp.elasticemail.com",
            Username : "twizald.03@gmail.com",
            Password : "808EEED423FD0754F6A9443316D6A98AD97C",
            To : 'twizald.03@gmail.com',
            From : "you@isp.com",
            Subject : subject.vlaue,
            Body : bodyMessage

*/


window.onload = function(){

    const menu_hamburger = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_hamburger.addEventListener('click', function(){
        menu_hamburger.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });

    // THE VALIDATING THE HOMEPAGE CONTACT FORM
const form = document.querySelector('form');
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
        SecureToken : "f5fc0194-8657-4337-a560-6217aa440e8f",
        To : 'twizald.03@gmail.com',
        From : emailAddress.value,
        Subject : subject.value,
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
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if(item.value == ""){
            item.classList.add("error")
            item.parentElement.classList.add("error")
        }
        if(items[1].value != "") {
            checkEmail();
        }
        items[1].addEventListener("keyup", () =>{
            checkEmail();
        });
        item.addEventListener("keyup", () => {
            if(item.value != ""){
            item.classList.remove("error")
            item.parentElement.classList.remove("error")
            }
        });
    }
}
function checkEmail(){
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    const errorTxtEmail = document.querySelector(".error-txt.email");

    if(!emailAddress.value.match(emailRegex)){
        emailAddress.classList.add("error");
        emailAddress.parentElement.classList.add("error");

        if (emailAddress.value != "") {
            errorTxtEmail.innerText = "Enter a valid Email Address"
        }
        else {
            errorTxtEmail.innerText = "Email Address can't be blank"
        }
    }
    else {
        emailAddress.classList.remove("error");
        emailAddress.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if(!fullName.classList.contains("error") && !emailAddress.classList.contains("error") && !phoneNumber.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error") ) {
        sendEmail();

        form.reset();
        return false;
    }
})

}