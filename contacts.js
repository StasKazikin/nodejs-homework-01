const fs = require("fs");
const path = require("path");

const contactsPath = path.join("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

 function getContactById(contactId) {
   fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => id === Number(contactId));

    console.log(contact);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
   if (err) {
     console.log(err.message);
     return;
   }

   const contacts = JSON.parse(data);

   const id = Date.now();

   const contact = { id, name, email, phone };

   contacts.push(contact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
     if (error) {
       console.log(error.message);
     }
   });
   listContacts();
 });
}

 function removeContact(contactId) {
   fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }

    const contacts = JSON.parse(data);

    const newList = contacts.filter(({ id }) => {
     return id !== Number(contactId);
    });

     fs.writeFile(contactsPath, JSON.stringify(newList, null, 2),  (error) => {
      if (error) {
        console.log(error.message);
        return;
      }}
      
     );
     listContacts();
  });
}

module.exports = { listContacts, getContactById, addContact, removeContact  };
