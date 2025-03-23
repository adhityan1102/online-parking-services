let selectedSlot = null; // Store the selected slot

let slotAreas = document.querySelectorAll(".slot-area"); // Select slot containers

slotAreas.forEach((slotArea) => {
  let slot = slotArea.querySelector(".slot"); // Select the slot inside the container
  let resetBtn = slotArea.querySelector(".reset-btn"); // Select the outside exit button

  // Slot click event
  slot.addEventListener("click", () => {
    if (slot.innerText.includes("Booked")) {
      alert("This slot is already booked!");
      return;
    }

    selectedSlot = slot;
    document.getElementById("customPrompt").style.display = "block";
    document.getElementById("ownerName").focus(); // Auto focus input field
  });

  // Outside Exit button event (Resets the slot)
  resetBtn.addEventListener("click", () => {
    resetSlot(slot);
  });
});

function submitPrompt() {
  let owner = document.getElementById("ownerName").value.trim();
  let carModel = document.getElementById("carModel").value.trim();

  if (!owner || !carModel) {
    alert("Please enter all details!");
    return;
  }

  selectedSlot.style.backgroundColor = "#FFADB0";
  selectedSlot.style.border = "4px solid red";
  selectedSlot.innerHTML = `Booked by: ${owner}<br>Car: ${carModel}`; // ❌ Removed Exit button inside slot
  selectedSlot.classList.add("booked"); // Mark as booked

  closePrompt();
}

// Function to reset a slot
function resetSlot(slot) {
  slot.style.backgroundColor = "#59e659";
  slot.style.border = "4px solid green";
  slot.innerHTML = "Available"; // Reset slot to available
  slot.classList.remove("booked"); // Remove booked class
}

// Close Prompt
function closePrompt() {
  document.getElementById("customPrompt").style.display = "none";
  document.getElementById("ownerName").value = "";
  document.getElementById("carModel").value = "";
}

// Allow Enter key to submit form
document.querySelectorAll("#ownerName, #carModel").forEach((input) => {
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitPrompt();
    }
  });
});
document.addEventListener("keydown", function(event) {
  let promptBox = document.getElementById("customPrompt");

  // Check if the Enter key is pressed & the prompt is visible
  if (event.key === "Enter" && promptBox.style.display === "block") {
      event.preventDefault(); // Prevents unwanted behavior

      let ownerName = document.getElementById("ownerName").value.trim();
      let carModel = document.getElementById("carModel").value.trim();

      if (ownerName === "" || carModel === "") {
          alert("⚠️ Please enter all your details!");
      } else {
          submitPrompt(); // Calls submit function
      }
  }
});
document.getElementById("ownerName").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      document.getElementById("carModel").focus(); // Move to next input
  }
});

document.getElementById("carModel").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      submitPrompt(); // Call the submit function
  }
});
document.addEventListener("DOMContentLoaded", function () {
  let ownerNameInput = document.getElementById("ownerName");
  let carModelInput = document.getElementById("carModel");
  let submitBtn = document.querySelector("button[onclick='submitPrompt()']");

  ownerNameInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
          event.preventDefault();
          carModelInput.focus(); // Move focus to Car Model input
      }
  });
});
