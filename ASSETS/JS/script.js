document.addEventListener(`DOMContentLoaded`, function () {
  const newsletterForm = document.getElementById(`newsletter-form`);
  const url = "https://reqres.in/api/users";
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
  const modalIcon = document.querySelector(".modal-icon");
  const modalMessage = document.querySelector(".modal-message");
  const btnCloseModal = document.querySelector("#btn-close-modal");
  const secundaryBtnCloseModal = document.querySelector(
    "#secundary-btn-close-modal"
  );

  // Validação de formulário em tempo real
  nameField.addEventListener("input", validateNameField);
  emailField.addEventListener("input", validateEmailField);

  radioOption.forEach(function (option) {
    option.addEventListener("change", showEditorialOptions);
  });

  editorial.addEventListener("change", validateEditorialFields);

  // Validação de formulário após envio
  newsletterForm.addEventListener(`submit`, function (event) {
    event.preventDefault();
    const formData = new FormData(newsletterForm);
    const data = Object.fromEntries(formData);

    if (
      validateNameField() &&
      validateEmailField() &&
      validateEditorialFields()
    ) {
      submitForm(data);
    }

    closeModal();
  });

  async function submitForm(data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status == 201) {
        showSuccessModal("Formulário enviado com Sucesso!");
      } else {
        throw new Error("Não foi possível enviar o formulário.");
      }
    } catch (error) {
      showErrorModal(error.message);
    }
  }

  function showError(index) {
    errorMessage[index].style.display = `flex`;
  }

  function removeError(index) {
    errorMessage[index].style.display = `none`;
  }

  function validateNameField() {
    if (nameField.value.trim().length < 3) {
      showError(0);
      return false;
    } else {
      removeError(0);
      return true;
    }
  }

  function validateEmailField() {
    if (emailRegex.test(emailField.value.trim())) {
      removeError(1);
      return true;
    } else {
      showError(1);
      return false;
    }
  }

  function showEditorialOptions() {
    let checkedOption;

    for (let i = 0; i < radioOption.length; i++) {
      if (radioOption[i].checked === true) {
        checkedOption = i;
      }
    }

    switch (checkedOption) {
      case 0:
        editorialOption[1].textContent = "Tech Tudo Notícias";
        editorialOption[1].value = "Tech-Everything-News";

        editorialOption[2].textContent = "Notícias Tech";
        editorialOption[2].value = "Tech-News";

        editorialOption[3].textContent = "Mundo Tecnologia";
        editorialOption[3].value = "Tech-World";

        editorialOption[4].textContent = "Lorem Tech Notícias";
        editorialOption[4].value = "Lorem-Tech-News";
        break;
      case 1:
        editorialOption[1].textContent = "Bem-Estar Notícias";
        editorialOption[1].value = "Wellness-News";

        editorialOption[2].textContent = "Cuidando da Saúde";
        editorialOption[2].value = "Taking-Care-of-Health";

        editorialOption[3].textContent = "Lorem Bem-Estar";
        editorialOption[3].value = "Lorem-Wellness";

        editorialOption[4].textContent = "Mundo Fitness";
        editorialOption[4].value = "Fitness-World";
        break;
      case 2:
        editorialOption[1].textContent = "Cuidando do Dinheiro";
        editorialOption[1].value = "Taking-Care-of-Money";

        editorialOption[2].textContent = "Economia Lorem";
        editorialOption[2].value = "Lorem-Economy";

        editorialOption[3].textContent = "Dicas de Finanças";
        editorialOption[3].value = "Finance-Tips";

        editorialOption[4].textContent = "Mundo da Economia";
        editorialOption[4].value = "World-of-Economy";
        break;
      default:
        editorialOption[1].textContent = "Mundo do Cinema";
        editorialOption[1].value = "World-of-Cinema";

        editorialOption[2].textContent = "Viagens pelo Brasil";
        editorialOption[2].value = "Traveling-Through-Brazil";

        editorialOption[3].textContent = "Entretenimento nas Cidades";
        editorialOption[3].value = "Entertainment-in-the-Cities";

        editorialOption[4].textContent = "Mundo Geek";
        editorialOption[4].value = "Geek-World";
        break;
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
      return false;
    } else {
      removeError(3);
      return true;
    }
  }

  function showSuccessModal(message) {
    modalIcon.src = "ASSETS/IMAGES/icone_sucesso.svg";
    modalIcon.alt =
      "Ícone de seta positiva representando formulário bem-sucedido.";
    modalMessage.textContent = message;

    feedbackModal.showModal();

    document.body.style.position = "fixed";

    formatNewsletterFormFields();
    preventEscKeyFunctionality();
  }

  function showErrorModal(message) {
    modalIcon.src = "ASSETS/IMAGES/icone-erro.svg";
    modalIcon.alt = "Ícone de X representando formulário não enviado.";
    modalMessage.textContent = message;

    feedbackModal.showModal();

    document.body.style.position = "fixed";

    preventEscKeyFunctionality();
  }

  function closeModal() {
    btnCloseModal.addEventListener("click", function () {
      feedbackModal.close();

      document.body.style.position = "static";
    });

    secundaryBtnCloseModal.addEventListener("click", function () {
      feedbackModal.close();

      document.body.style.position = "static";
    });
  }

  function formatNewsletterFormFields() {
    nameField.value = "";
    emailField.value = "";
    radioOption[0].checked = true;

    editorialOption.forEach(function (option) {
      if (option.selected === true) {
        return (option.selected = false);
      }
    });

    editorialOption[1].textContent = "Tech Tudo Notícias";
    editorialOption[2].textContent = "Notícias Tech";
    editorialOption[3].textContent = "Mundo Tecnologia";
    editorialOption[4].textContent = "Lorem Tech Notícias";

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
