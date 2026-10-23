// JavaScript for the contact form
const form = document.getElementById("contact-form");

const firstName = document.getElementById("first-name");

const lastName = document.getElementById("last-name");

const email = document.getElementById("email");

const message = document.getElementById("message");

const firstNameErrorMessage = document.getElementById(
  "first-name-error-message",
);

const lastNameErrorMessage = document.getElementById("last-name-error-message");

const emailErrorMessage = document.getElementById("email-error-message");

const queryTypeErrorMessage = document.getElementById(
  "QueryType-error-message",
);

const messageErrorMessage = document.getElementById("message-error-message");

const permissionErrorMessage = document.getElementById(
  "contact-permission-error-message",
);

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function isValidEmail(value) {
  return value.length <= 254 && EMAIL_RE.test(value);
}

function isInputTextEmpty(input) {
  return input.value.trim() === "";
}

function isQueryTypeSelected() {
  let selected = document.querySelector('input[name="query-type"]:checked');

  return selected ? selected : false;
}

function setInputError(input, errorElement) {
  errorElement.classList.toggle("active");

  input.setAttribute("aria-invalid", "true");
}

function removeInputError(input, errorElement) {
  errorElement.classList.toggle("active");

  input.removeAttribute("aria-invalid");
}
function toggleQueryTypeError(errorElement) {
  errorElement.classList.toggle("active");
}

function validateText(input) {
  let inputTextEmpty = isInputTextEmpty(input);

  let errorElement = document.getElementById(`${input.name}-error-message`);

  let errorActive = errorElement.classList.contains("active");

  if (!errorActive && inputTextEmpty) setInputError(input, errorElement);

  if (errorActive && !inputTextEmpty) removeInputError(input, errorElement);

  return !inputTextEmpty;
}

function validateEmail(email) {
  let validEmail = isValidEmail(email.value.trim());

  let errorElement = document.getElementById(`${email.name}-error-message`);

  let errorActive = errorElement.classList.contains("active");

  if (!validEmail && !errorActive) setInputError(email, errorElement);

  if (validEmail && errorActive) removeInputError(email, errorElement);

  return validEmail;
}

function validateQueryType() {
  let queryTypeSelected = isQueryTypeSelected();

  let errorElement = document.getElementById("query-type-error-message");

  let errorActive = errorElement.classList.contains("active");

  if (
    (!queryTypeSelected && !errorActive) ||
    (queryTypeSelected && errorActive)
  )
    toggleQueryTypeError(errorElement);

  return queryTypeSelected;
}

function validatePermisson() {
  let permission = document.getElementById("permission");
  let errorElement = document.getElementById("permission-error-message");
  let errorActive = errorElement.classList.contains("active");

  if (!permission.checked && !errorActive)
    setInputError(permission, errorElement);

  if (permission.checked && errorActive)
    removeInputError(permission, errorElement);

  return permission.checked;
}

function preventNumericInNames(input) {
  if (input.type === "text") input.value = input.value.replace(/[0-9]/g, "");
}

function validateFormData(form) {
  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  if (
    !validateText(firstName) ||
    !validateText(lastName) ||
    !validateEmail(email) ||
    !validateQueryType() ||
    !validateText(message) ||
    !validatePermisson()
  )
    return null;

  return data;
}

function showSuccessMesasge() {
  let successSubmitMessage = document.getElementById("success-submit-message");
  successSubmitMessage.classList.toggle("active");
  form.reset();

  setTimeout(() => {
    successSubmitMessage.classList.toggle("active");
  }, 5000);
}

form.addEventListener("focusout", (e) => {
  if (e.target.type === "radio" || e.target.type === "checkbox") return;

  if (e.target.type === "email" && !isInputTextEmpty(e.target)) {
    validateEmail(e.target);
    return;
  }

  validateText(e.target);
});

form.addEventListener("input", function (event) {
  if (event.target.type === "radio") {
    validateQueryType();
    return;
  }

  if (event.target.type === "checkbox") {
    validatePermisson();
    return;
  }

  if (
    event.target.type === "email" &&
    event.target.getAttribute("aria-invalid") === "true"
  ) {
    validateEmail(event.target);
    return;
  }

  preventNumericInNames(event.target);

  validateText(event.target);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = validateFormData(form);
  if (!data) return;

  showSuccessMesasge();
});
