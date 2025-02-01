/* Count to a specific number */
function count(els) {
    els.each(function () {
        $(this)
            .prop("Counter", 0)
            .animate(
                {
                    Counter: $(this).text(),
                },
                {
                    duration: 4000,
                    easing: "swing",
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    },
                }
            );
    });
}

/* Count when the counter section is in viewport */
const counterEls = $(".counter .counter__count");
new Waypoint({
    element: counterEls,

    handler: function () {
        count(counterEls);

        this.destroy();
    },

    offset: "bottom-in-view",
});

// Sidebar menu with JS
// function ShowSidebar() {
// 	const sidebar = document.querySelector('.nav-side-bar');
// 	sidebar.style.display = 'flex';

// }

// function HideSidebar() {
// 	const sidebar = document.querySelector('.nav-side-bar');
// 	sidebar.style.display = 'none';
// }

// // Toggle sidebar when clicking the menu button
// document.querySelector('.menu-btn').addEventListener('click', function (event) {
// 	event.stopPropagation();
// 	ShowSidebar();
// });

// // Close sidebar when clicking outside
// document.addEventListener('click', function (event) {
// 	const sidebar = document.querySelector('.nav-side-bar');
// 	if (!sidebar.contains(event.target) && event.target !== document.querySelector('.menu-btn')) {
// 		HideSidebar();
// 	}
// });

// Work section - change projects/certificates
function showSection(sectionId) {
    const sections = document.querySelectorAll(".work__content");

    sections.forEach(function (section) {
        section.classList.remove("visible");
        section.classList.add("hidden");
    });

    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove("hidden");
    selectedSection.classList.add("visible");
}

// Send emails
const contactForm = document.querySelector("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Name: ${username.value}<br> Email: ${email.value}<br> Message: ${message.value}`;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "",
        Password: "",
        To: "",
        From: "",
        Subject: subject.value,
        Body: bodyMessage,
    }).then((message) => {
        if (message == "OK") {
            Swal.fire({
                title: "Success!",
                text: "Message send successfully!",
                icon: "success",
            });
        }
    });
}

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    sendEmail();
    username.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";
});
