document.addEventListener(`DOMContentLoaded`, function () {
  const newsletterForm = document.getElementById(`newsletter-form`);
  const nameField = document.getElementById(`user-name`);
  const emailField = document.getElementById(`user-email`);
  const emailRegex =
    /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
  const radioOption = document.querySelectorAll(".radio-option");
  const editorial = document.getElementById("editorial");
  const editorialOption = document.querySelectorAll(".editorial-option");
  const emailAccept = document.getElementById("email-accept");
  const errorMessage = document.querySelectorAll(`.error-message`);
  const feedbackModal = document.querySelector(".feedback-modal");
  const btnCloseModal = document.querySelector("#btn-close-modal");
  const secundaryBtnCloseModal = document.querySelector(
    "#secundary-btn-close-modal"
  );

  // Validação de formulário em tempo real
  nameField.addEventListener("input", validateNameField);
  emailField.addEventListener("input", validateEmailField);
  radioOption.forEach(function (option) {
    option.addEventListener("change", validateGenreFields);
  });
  editorial.addEventListener("change", validateEditorialFields);

  // Validação de formulário após envio
  newsletterForm.addEventListener(`submit`, function (event) {
    event.preventDefault();
    validateNameField();
    validateEmailField();
    validateGenreFields();
    validateEditorialFields();
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
    if (nameField.value.trim().length < 3) {
      showError(0);
    } else {
      removeError(0);
    }
  }

  function validateEmailField() {
    if (emailRegex.test(emailField.value.trim())) {
      removeError(1);
    } else {
      showError(1);
    }
  }

  function validateGenreFields() {
    if (
      radioOption[0].checked === false &&
      radioOption[1].checked === false &&
      radioOption[2].checked === false &&
      radioOption[3].checked === false
    ) {
      showError(2);
    } else {
      removeError(2);
    }
  }

  function validateEditorialFields() {
    if (
      editorialOption[1].selected === false &&
      editorialOption[2].selected === false &&
      editorialOption[3].selected === false &&
      editorialOption[4].selected === false
    ) {
      showError(3);
    } else {
      removeError(3);
    }
  }

  function showFeedbackModal() {
    if (
      nameField.value.trim().length >= 3 &&
      emailRegex.test(emailField.value.trim()) &&
      (radioOption[0].checked === true ||
        radioOption[1].checked === true ||
        radioOption[2].checked === true ||
        radioOption[3].checked === true) &&
      (editorialOption[1].selected === true ||
        editorialOption[2].selected === true ||
        editorialOption[3].selected === true ||
        editorialOption[4].selected === true)
    ) {
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

    radioOption.forEach(function (option) {
      if (option.checked === true) {
        return (option.checked = false);
      }
    });

    editorialOption.forEach(function (option) {
      if (option.selected === true) {
        return (option.selected = false);
      }
    });

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
