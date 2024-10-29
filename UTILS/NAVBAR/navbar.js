document.addEventListener("DOMContentLoaded", function () {
    fetch("../UTILS/NAVBAR/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar").innerHTML = data;
      });
  });