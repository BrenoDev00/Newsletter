document.addEventListener(`DOMContentLoaded`, function () {
  const newsletterForm = document.getElementById(`newsletter-form`);
  const nameField = document.getElementById(`user-name`);
  const emailField = document.getElementById(`user-email`);
  const emailAccept = document.getElementById("email-accept");
  const errorMessage = document.querySelectorAll(`.error-message`);
  const emailRegex =
    /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
  const feedbackModal = document.querySelector(".feedback-modal");
  const btnCloseModal = document.querySelector("#btn-close-modal");
  const secundaryBtnCloseModal = document.querySelector(
    "#secundary-btn-close-modal"
  );

  nameField.addEventListener("input", validateNameField);
  emailField.addEventListener("input", validateEmailField);

  newsletterForm.addEventListener(`submit`, function (event) {
    event.preventDefault();
    validateNameField();
    validateEmailField();
    showFeedbackModal();
    closeFeedbackModal();
  });

  function showError(index) {
    errorMessage[index].style.display = `flex`;
  }

  function removeError(index) {
    errorMessage[index].style.display = `none`;
  }

  function validateNameField() {
    if (nameField.value.length < 3) {
      showError(0);
    } else {
      removeError(0);
    }
  }

  function validateEmailField() {
    if (emailRegex.test(emailField.value)) {
      removeError(1);
    } else {
      showError(1);
    }
  }

  function showFeedbackModal() {
    if (nameField.value.length >= 3 && emailRegex.test(emailField.value)) {
      feedbackModal.showModal();

      document.body.style.position = "fixed";

      clearNewsletterFormFields();
      preventEscKeyFunctionality();
    }
  }

  function closeFeedbackModal() {
    btnCloseModal.addEventListener("click", function () {
      feedbackModal.close();

      document.body.style.position = "static";
    });

    secundaryBtnCloseModal.addEventListener("click", function () {
      feedbackModal.close();

      document.body.style.position = "static";
    });
  }

  function clearNewsletterFormFields() {
    nameField.value = "";
    emailField.value = "";
    emailAccept.checked = false;
  }

  function preventEscKeyFunctionality() {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
      }
    });
  }
});
