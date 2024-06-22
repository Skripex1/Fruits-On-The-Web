document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const submitButton = document.querySelector(".submit-button");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm("service_na4n37e", "template_pmvfxgi", this).then(
      () => {
        console.log("SUCCESS!");
        submitButton.value = "Submitted";
      },
      (error) => {
        console.log("FAILED...", error);
        submitButton.value = "Submit";
      }
    );
  });
});
