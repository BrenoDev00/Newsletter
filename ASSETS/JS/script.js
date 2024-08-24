document.addEventListener(`DOMContentLoaded`, function () {
  // Menu de Navegação
  const btnMobileNavigation = document.querySelector(".btn-mobile-menu");
  const navigationItems = document.querySelector(".container-navigation-items");

  function showMobileNavigation() {
    btnMobileNavigation.addEventListener("click", function () {
      navigationItems.classList.toggle("navigation-open");
    });

    if (navigationItems.classList.contains("navigation-open")) {
      btnMobileNavigation.src =
        "ASSETS/IMAGES/icone_fechar_menu_responsivo.svg";
    } else {
      btnMobileNavigation.src = "ASSETS/IMAGES/icone_botao_menu_responsivo.svg";
    }
  }

  showMobileNavigation();

  // Conteúdo Principal
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
    option.addEventListener("change", showEditorialOptions);
  });

  editorial.addEventListener("change", validateEditorialFields);

  // Validação de formulário após envio
  newsletterForm.addEventListener(`submit`, function (event) {
    event.preventDefault();
    validateNameField();
    validateEmailField();
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
        editorialOption[2].textContent = "Notícias Tech";
        editorialOption[3].textContent = "Mundo Tecnologia";
        editorialOption[4].textContent = "Lorem Tech Notícias";
        break;
      case 1:
        editorialOption[1].textContent = "Bem-Estar Notícias";
        editorialOption[2].textContent = "Cuidando da Saúde";
        editorialOption[3].textContent = "Lorem Bem-Estar";
        editorialOption[4].textContent = "Mundo Fitness";
        break;
      case 2:
        editorialOption[1].textContent = "Cuidando do Dinheiro";
        editorialOption[2].textContent = "Economia Lorem";
        editorialOption[3].textContent = "Dicas de Finanças";
        editorialOption[4].textContent = "Mundo da Economia";
        break;
      default:
        editorialOption[1].textContent = "Mundo do Cinema";
        editorialOption[2].textContent = "Viagens pelo Brasil";
        editorialOption[3].textContent = "Entretenimento nas Cidades";
        editorialOption[4].textContent = "Mundo Geek";
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
    } else {
      removeError(3);
    }
  }

  function showFeedbackModal() {
    if (
      nameField.value.trim().length >= 3 &&
      emailRegex.test(emailField.value.trim()) &&
      (editorialOption[1].selected === true ||
        editorialOption[2].selected === true ||
        editorialOption[3].selected === true ||
        editorialOption[4].selected === true)
    ) {
      feedbackModal.showModal();

      document.body.style.position = "fixed";

      formatNewsletterFormFields();
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
