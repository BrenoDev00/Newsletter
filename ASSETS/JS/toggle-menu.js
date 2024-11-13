document.addEventListener("DOMContentLoaded", function () {
  // Menu de Navegação
  const btnMobileNavigation = document.querySelector(".btn-mobile-menu");
  const navigationItems = document.querySelector(".container-navigation-items");

  function toggleNavigation() {
    btnMobileNavigation.addEventListener("click", function () {
      navigationItems.classList.toggle("open-navigation");

      if (navigationItems.classList.contains("open-navigation")) {
        btnMobileNavigation.src =
          "ASSETS/IMAGES/icone_fechar_menu_responsivo.svg";
      } else {
        btnMobileNavigation.src =
          "ASSETS/IMAGES/icone_botao_menu_responsivo.svg";
      }
    });
  }

  toggleNavigation();
});
