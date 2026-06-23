document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById("contactForm");
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("popupOverlay");
  const btn = document.getElementById("sendBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      btn.innerText = "Sending...";
      btn.disabled = true;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (res.ok) {
        popup.classList.add("show");
        overlay.classList.add("show");
        form.reset();
      } else {
        alert(data.msg);
      }

    } catch (err) {
      alert("Server error");
      console.log(err);
    }

    btn.innerText = "Send Message";
    btn.disabled = false;
  });

});