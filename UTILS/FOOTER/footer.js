document.addEventListener("DOMContentLoaded", function () {
    fetch("../UTILS/FOOTER/footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("footer").innerHTML = data;
      });
  });