import Store from "data-store";

import { User, Message } from "./components/storageComponents";

const store = new Store({ path: "store.json" });

store.set("users", [
  new User("anna", [
    new Message("anna", "Hello!", "0"),
    new Message("anna", "How are you?", "1")
  ])
]);

export default store;fgo