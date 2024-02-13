window.onload = function(){

    const menu_hamburger = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_hamburger.addEventListener('click', function(){
        menu_hamburger.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });

    

}

const form = document.querySelector('form');
const fullName = document.getElementById("name")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const subject = document.getElementById("subject")
const message = document.getElementById("message")

function sendEmail() {
    const bodyMessage = `Subject: ${subject.value}<br>Full Name: ${fullName.value}<br>Email Address: ${email.value}<br>Phone Number: ${phone.value}<br><br><br>Message: ${message.value}<br>`
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "twizald.03@gmail.com",
        Password : "808EEED423FD0754F6A9443316D6A98AD97C",
        To : 'twizald.03@gmail.com',
        From : "twizald.03@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => alert(message)
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    sendEmail();
})