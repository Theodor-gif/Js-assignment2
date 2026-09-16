function isActivePage() {
  const links = document.querySelectorAll(".nav-links li a");
  const activeLink = [...links].find(
    (link) => link.href === window.location.href,
  );
  activeLink.classList.add("activeLink");
}

isActivePage();