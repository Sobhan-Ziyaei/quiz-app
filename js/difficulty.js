const buttons = document.querySelectorAll("button");

const selectDiffultyButton = (event) => {
    const level = event.target.innerText.toLowerCase();
    localStorage.setItem("level",level);
    window.location.assign("/html")
};

buttons.forEach((button) => {
  button.addEventListener("click", selectDiffultyButton);
});
