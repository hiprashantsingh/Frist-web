document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
  
    alert(`Thanks ${name}, I’ll reach out to you at ${email}!`);
  });
