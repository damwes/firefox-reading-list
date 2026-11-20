export const accordions = document.getElementsByClassName("accordion");

function setAccordionsToggle() {
  for (const accordion of accordions) {
    accordion.addEventListener("click", async function () {
      this.classList.toggle("active");

      let panel = this.nextElementSibling;
      let isPanelActive = panel.style.maxHeight;

      if (isPanelActive) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}

export function setInitialState() {
  const panel = accordions[0].nextElementSibling;
  accordions[0].classList.add("active");
  panel.style.maxHeight = panel.scrollHeight + "px";
}

setAccordionsToggle();
