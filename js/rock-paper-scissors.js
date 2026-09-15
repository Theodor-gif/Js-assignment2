function isActivePage() {
  const links = document.querySelectorAll(".nav-links li a");
  console.log(links);
  const activeLink = [...links].find(
    (link) => link.href === window.location.href,
  );
  console.log(activeLink);
  activeLink.classList.add("activeLink");
}

isActivePage();
