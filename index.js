const { Command } = require("commander");

const contactsOperations = require("./contacts");

// async function getContacts() {
//   const contacts = await contactsOperations.listContacts();
//   console.log(contacts);
//   return contacts;
// }

// console.log(getContacts());

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;
    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Product with id=${id} not found`);
      }
      console.log(contact);
      break;
    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(newContact);
      break;
    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

(async () => {
  await invokeAction(argv);
})();

// invokeAction(argv);

// invokeAction({ action: "list" });

// invokeAction({ action: "get", id: "10" });

// invokeAction({
//   action: "add",
//   name: "Mykola Saliuk",
//   email: "ms@mail.com",
//   phone: "+380111111111",
// });

// invokeAction({ action: "remove", id: "f5da73c1-95c5-440d-b2d3-e3035b67310a" });
