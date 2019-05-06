export class Message {
  constructor(user, text, id, sendAt) {
    this.user = user;
    this.text = text;
    this.id = id;
    this.sendAt = sendAt || new Date();
  }
}
export class User {
  constructor(username, messages) {
    this.username = username;
    this.messages = messages || [];
  }
  addMessage(text) {
    this.messages.push(new Message(this.username, text));
  }
  removeMessage(id) {
    const filtered = this.messages.filter(message => message.id !== id);
    console.log(id);
    this.messages = filtered;
  }
}
