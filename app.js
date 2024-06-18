document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".hidden");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animation = entry.target.getAttribute("data-animation");
          const duration = entry.target.getAttribute("data-duration");

          entry.target.style.animation = `${animation} ${duration} ease-out forwards`;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Optional: Stop observing once it's visible
        }
      });
    },
    {
      threshold: 0.1, // Adjust this value as needed
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var burgerMenu = document.querySelector(".burger-menu");
  var sideNav = document.getElementById("sideNav");

  function toggleNav() {
    sideNav.classList.toggle("active");
    burgerMenu.classList.toggle("hidden");
  }

  burgerMenu.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the click from propagating to the document
    toggleNav();
  });

  document.addEventListener("click", function () {
    if (sideNav.classList.contains("active")) {
      sideNav.classList.remove("active");
      burgerMenu.classList.remove("hidden");
    }
  });

  sideNav.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent clicks inside the sideNav from closing it
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  // Handle modals triggered by hovering
  const modalTriggers = document.querySelectorAll(".modal-trigger");
  const closeButtons = document.querySelectorAll(".close-button");

  modalTriggers.forEach((trigger) => {
    const modalId = trigger.getAttribute("data-modal");
    const modal = document.getElementById(modalId);

    if (modal) {
      trigger.addEventListener("mouseover", () => {
        modal.style.display = "block";
      });
    }
  });

  closeButtons.forEach((button) => {
    const modalId = button.getAttribute("data-modal");
    const modal = document.getElementById(modalId);

    if (modal) {
      button.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
  });

  window.addEventListener("click", (event) => {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  });

  // Handle the specific "Hire me!" button
  const hireMeButton = document.getElementById("hireMeButton");
  const hireMeModal = document.getElementById("modal"); // Assuming this is the ID for the "Hire me!" modal

  if (hireMeButton && hireMeModal) {
    const hireMeCloseButton = hireMeModal.querySelector(".close-button");

    hireMeButton.addEventListener("click", () => {
      hireMeModal.style.display = "block";
    });

    if (hireMeCloseButton) {
      hireMeCloseButton.addEventListener("click", () => {
        hireMeModal.style.display = "none";
      });
    }

    window.addEventListener("click", (event) => {
      if (event.target == hireMeModal) {
        hireMeModal.style.display = "none";
      }
    });

    // Handle form submission
    const form = hireMeModal.querySelector("form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Show loading screen
        const loadingScreen = document.getElementById("loadingScreen");
        loadingScreen.style.display = "block";

        fetch("https://formsubmit.co/ajax/ecbmrockstar15@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Hide loading screen
            loadingScreen.style.display = "none";
            // Display success message or handle success
            Swal.fire({
              title: "Success!",
              text: "Email Submitted Thank you!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              hireMeModal.style.display = "none"; // Close the modal after submission
            });
          })
          .catch((error) => {
            console.log(error);
            // Hide loading screen
            loadingScreen.style.display = "none";
            // Display error message or handle error
            Swal.fire({
              title: "Error!",
              text: "There was an error submitting the form.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      });
    }
  }
});
