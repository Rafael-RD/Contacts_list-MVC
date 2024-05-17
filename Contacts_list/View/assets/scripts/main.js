const url = "https://localhost:7223/api/Contacts";
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".contact-form");
const emailsDiv = document.querySelector(".email-inputs");
let contacts = [];
let selecting = false;

function createContact() {
  const inputs = form.querySelectorAll("input");
  inputs.forEach(input => {
    input.removeAttribute("disabled")
    input.value = "";
  });
  emailsDiv.innerHTML = "";
  form.querySelector(".add-email-btn").classList.remove("hidden");
  form.querySelector(".add-email-btn").classList.remove("hidden");
  form.querySelector(".save-contact").classList.remove("hidden");
  form.querySelector(".actions").classList.add("hidden");
  form.querySelector(".add-email-btn").removeAttribute("disabled");
  form.setAttribute("onsubmit", `formSubmitHandler(event)`);

  openOverlay();
}

function deleteContact(contactId) {
  if (confirm("Do you want to delete this contact?")) {
    axios.delete(`${url}/${contactId}`)
      .then(resp => {
        fetchContacts();
        closeOverlay();
      })
      .catch(resp => {
        alert("Error deleting contact!");
        console.log(resp.response);
      })
  }
}

function contactClickHandler(contactId) {
  const contact = contacts.find(contact => contact.id === contactId);
  form.querySelector(".add-email-btn").removeAttribute("disabled");
  populateForm(contact);

  const inputs = form.querySelectorAll("input");
  inputs.forEach(input => input.setAttribute("disabled", true));
  form.querySelector(".add-email-btn").classList.add("hidden");
  form.querySelector(".save-contact").classList.add("hidden");
  form.querySelector(".actions").classList.remove("hidden");
  form.querySelector(".actions .edit-contact").setAttribute("onclick", `editContact(${contact.id})`);
  form.querySelector(".actions .delete-contact").setAttribute("onclick", `deleteContact(${contact.id})`);
  form.setAttribute("onsubmit", `formSubmitEditHandler(event, ${contactId})`);

  openOverlay();
}

function editContact(contactId) {
  const inputs = form.querySelectorAll("input");
  inputs.forEach(input => input.removeAttribute("disabled"));
  form.querySelector(".add-email-btn").classList.remove("hidden");
  form.querySelector(".add-email-btn").classList.remove("hidden");
  form.querySelector(".save-contact").classList.remove("hidden");
  form.querySelector(".actions").classList.add("hidden");
}

function addEmailField(email) {
  const input = document.createElement("input");
  input.type = "email";
  if (email) input.value = email;
  emailsDiv.appendChild(input);

  if (emailsDiv.children.length >= 5) {
    const btn = document.querySelector(".add-email-btn");
    btn.setAttribute("disabled", true);
  }
}

function populateForm(contact) {

  form.name.value = contact.name;
  form.company.value = contact.company;
  form.businessPhone.value = contact.businessPhone;
  form.privatePhone.value = contact.privatePhone;

  emailsDiv.innerHTML = "";

  for (const email of contact.email) {
    addEmailField(email);
  }
}

function formGenContact(form) {
  const contact = {
    name: form.name.value,
    company: form.company.value,
    businessPhone: form.businessPhone.value,
    privatePhone: form.privatePhone.value,
    email: []
  };

  const emailInputs = form.querySelectorAll("input[type=email]");
  emailInputs.forEach(input => {
    if (input.value) {
      contact.email.push(input.value);
    }
  });

  return contact;
}

function formSubmitEditHandler(event, contactId) {
  event.preventDefault();

  const contact = formGenContact(form);

  if (confirm("Do you want to save this contact?")) {
    axios.put(`${url}/${contactId}`, contact)
      .then(resp => {
        fetchContacts();
        closeOverlay();
      })
      .catch(resp => {
        alert("Error creating contact!");
        console.log(resp.response);
      })
  }
}

function formSubmitHandler(event) {
  event.preventDefault();
  const form = event.target;

  const contact = formGenContact(form);

  if (confirm("Do you want to save this contact?")) {
    axios.post(url, contact)
      .then(resp => {
        fetchContacts();
        closeOverlay();
      })
      .catch(resp => {
        alert("Error creating contact!");
        console.log(resp.response);
      })
  }
};

function renderContacts(filteredContacts = contacts) {
  const tableBody = document.querySelector("#table-body");

  if (filteredContacts.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center">No contacts found</td>
      </tr>
    `;
  } else if (filteredContacts.length > 0) {
    tableBody.innerHTML = ""
    filteredContacts.forEach(contact => {
      switch (contact.email.length) {
        case 0:
          tableBody.innerHTML += `
            <tr onclick="contactClickHandler(${contact.id})">
              <td>${contact.name}</th>
              <td>${contact.company}</td>
              <td>${contact.businessPhone}</td>
              <td>${contact.privatePhone}</td>
              <td></td>
            </tr>
          `;
          break;

        case 1:
          tableBody.innerHTML += `
            <tr onclick="contactClickHandler(${contact.id})">
              <td>${contact.name}</th>
              <td>${contact.company}</td>
              <td>${contact.businessPhone}</td>
              <td>${contact.privatePhone}</td>
              <td>${contact.email[0]}</td>
            </tr>
          `;
          break;

        default:
          tableBody.innerHTML += `
            <tr onclick="contactClickHandler(${contact.id})">
              <td>${contact.name}</th>
              <td>${contact.company}</td>
              <td>${contact.businessPhone}</td>
              <td>${contact.privatePhone}</td>
              <td>${contact.email[0]} +${contact.email.length - 1}</td>
            </tr>
          `;
          break;
      }
    });
  }

}

function fetchContacts() {
  axios.get(url)
    .then(resp => {
      contacts = resp.data;
      renderContacts();
    })
    .catch(resp => {
      alert("Error fetching contacts!");
      console.log(resp.response);
    })
}

function filterChangeHandler(event) {
  const filter = event.target.value.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter) ||
    contact.company.toLowerCase().includes(filter) ||
    contact.businessPhone.includes(filter) ||
    contact.privatePhone.includes(filter) ||
    contact.email.some(email => email.includes(filter))
  );

  renderContacts(filteredContacts);
}

function openOverlay() {
  overlay.classList.remove("hidden");
}

function closeOverlay() {
  overlay.classList.add("hidden");
}

overlay.addEventListener("mousedown", closeOverlay);
form.addEventListener("mousedown", event => event.stopPropagation());

fetchContacts();

