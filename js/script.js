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

    const heading = document.querySelector("#work .heading-secondary");
    if (heading) {
        heading.textContent = sectionId === "projects" ? "Things I've made" : "Things I've learned";
    } else {
        console.error("Heading element not found!");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    showSection("projects");
});


// Pagination for projects
document.addEventListener("DOMContentLoaded", function () {
    const projectsPerPage = 6;
    let currentPage = 1;

    const projectsContainer = document.querySelector("#projects .row");
    const allProjects = Array.from(projectsContainer.children);
    const totalPages = Math.ceil(allProjects.length / projectsPerPage);

    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");
    const navButtonsContainer = document.querySelector(".nav-buttons");

    function showProjects(page, shouldScroll = false) {
        projectsContainer.innerHTML = "";

        const start = (page - 1) * projectsPerPage;
        const end = start + projectsPerPage;
        const projectsToShow = allProjects.slice(start, end);

        projectsToShow.forEach(project => projectsContainer.appendChild(project));
        updatePaginationButtons();
        updatePaginationNumbers();
        if (shouldScroll) {
            document.querySelector(".tab-content").scrollIntoView({ behavior: "smooth" });
        }
    }

    function updatePaginationButtons() {
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages || totalPages === 0;
    }

    function updatePaginationNumbers() {
        // Remove existing page numbers
        document.querySelectorAll(".page-btn").forEach(btn => btn.remove());

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.add("btn", "btn--ghost", "page-btn");
            if (i === currentPage) {
                pageButton.classList.add("active");
            }
            pageButton.addEventListener("click", function () {
                currentPage = i;
                showProjects(currentPage, true);
            });
            // Insert page numbers between Prev and Next
            navButtonsContainer.insertBefore(pageButton, nextButton);
        }

    }

    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            showProjects(currentPage, true);
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            showProjects(currentPage, true);
        }
    });

    showProjects(currentPage, false);
});


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
        Username: window.env.APP_EMAIL_USERNAME,
        Password: window.env.APP_EMAIL_PASSWORD,
        To: window.env.APP_EMAIL_TO,
        From: window.env.APP_EMAIL_FROM,
        Subject: subject.value,
        Body: bodyMessage,
        Port: 2525
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
