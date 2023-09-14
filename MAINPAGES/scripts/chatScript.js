// Функция для отправки сообщения
function sendMessage(messageText) {
  const chatMessages = document.querySelector(".chat-messages");
  const message = document.createElement("div");
  message.className = "message";
  message.innerHTML = `
      <div class="message-avatar">
          <img src="../../img/avatar.png">
      </div>
      <div class="message-content message-user">
          <div class="message-sender">Вы</div>
          <div class="message-text">${messageText}</div>
          <div class="message-timestamp">${getCurrentTime()}</div>
      </div>
  `;
  chatMessages.appendChild(message);
  
  // Очистите поле ввода после отправки сообщения
  const chatInput = document.querySelector(".chat-input");
  chatInput.value = "";
}

// Функция для получения текущего времени в формате "чч:мм:сс"
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}


// Функция для отображения переписки с выбранным пользователем
function displayChatWithUser(userName) {
  // Очистите текущий чат
  clearChat();

  // Создайте заголовок чата с именем пользователя
  const chatHeader = document.createElement("div");
  chatHeader.className = "chat-header";
  chatHeader.innerHTML = `<h2>${userName}</h2>`;
  const chatMessages = document.querySelector(".chat-messages");
  chatMessages.appendChild(chatHeader);

  // Здесь вы можете добавить код для отображения переписки с выбранным пользователем
  // Например, загрузить историю чата или начать новый чат с этим пользователем
}

// Очистка текущего чата
function clearChat() {
  const chatHeader = document.querySelector(".chat-header");
  const chatMessages = document.querySelector(".chat-messages");
  if (chatHeader) {
      chatHeader.remove();
  }
  if (chatMessages) {
      chatMessages.innerHTML = ""; // Очищаем содержимое сообщений
  }
}

let selectedUserName = null; // Переменная для хранения выбранного имени

// Обработчик события для кнопок выбора пользователя
const personButtons = document.querySelectorAll(".person-selector-button");
personButtons.forEach(button => {
    button.addEventListener("click", () => {
        const userName = button.querySelector("span").textContent;
        selectedUserName = userName; // Сохраняем выбранное имя
        displayChatWithUser(userName);
    });
});
// Функция для отправки сообщения и получения ответа
function sendMessageAndReceiveResponse(messageText) {
  const chatMessages = document.querySelector(".chat-messages");
  
  // Отправляем сообщение пользователя
  const userMessage = createMessageElement("Вы", messageText, true);
  chatMessages.appendChild(userMessage);
  
  // Генерируем ответ от выбранного пользователя
  if (selectedUserName) {
    const responseMessageText = generateResponse(messageText, selectedUserName);
    setTimeout(() => {
      const responseMessage = createMessageElement(selectedUserName, responseMessageText, false);
      chatMessages.appendChild(responseMessage);
    }, 1000);
    
    if (!messageHistory[selectedUserName]) {
      messageHistory[selectedUserName] = [];
    }
    messageHistory[selectedUserName].push({ sender: "Вы", text: messageText, isUser: true });
    
    // Генерируем и сохраняем ответ

    const responseMessage = { sender: selectedUserName, text: responseMessageText, isUser: false };
    messageHistory[selectedUserName].push(responseMessage);
  }
}



function createMessageElement(sender, messageText, senderAvatar, timestamp) {
  const message = document.createElement("div");
  message.className = "message";
  
  // Создаем элемент аватара
  const messageAvatar = document.createElement("div");
  messageAvatar.className = "message-avatar";
  const avatarImg = document.createElement("img");
  avatarImg.src = "../../img/avatar.png"; // URL аватарки отправителя
  avatarImg.alt = "../../img/avatar.png";
  messageAvatar.appendChild(avatarImg);
  
  // Создаем элемент контента сообщения
  const messageContent = document.createElement("div");
  messageContent.className = "message-content";
  const messageSender = document.createElement("div");
  messageSender.className = "message-sender";
  messageSender.textContent = sender;
  const messageTextDiv = document.createElement("div");
  messageTextDiv.className = "message-text";
  messageTextDiv.textContent = messageText;
  const messageTimestamp = document.createElement("div");
  messageTimestamp.className = "message-timestamp";
  messageTimestamp.textContent = timestamp;
  
  // Добавляем элементы в контент сообщения
  messageContent.appendChild(messageSender);
  messageContent.appendChild(messageTextDiv);
  messageContent.appendChild(messageTimestamp);
  
  // Добавляем элементы в сообщение
  message.appendChild(messageAvatar);
  message.appendChild(messageContent);
  
  return message;
}


// Функция для генерации ответа (вы можете настроить ее по своему усмотрению)
const responses = {
  "Виталий Алексеевич": [
    "Привет, как я могу вам помочь?",
    "Чем я могу быть полезен?",
  ],
  "Дмитрий Викторович": [
    "Здравствуйте!",
    "Чем могу помочь?",
  ],
  // Добавьте другие имена и соответствующие им ответы здесь
};

function generateResponse(userMessage, userName) {
  if (responses[userName]) {
    const userResponses = responses[userName];
    const randomIndex = Math.floor(Math.random() * userResponses.length);
    return userResponses[randomIndex];
  } else {
    return "Извините, я не знаю, как на это ответить.";
  }
}

// Обработчик события для отправки сообщения
const chatInputForm = document.querySelector(".chat-input-form");
chatInputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageText = e.target.querySelector(".chat-input").value;
  if (messageText.trim() !== "") {
      sendMessageAndReceiveResponse(messageText);
  }
});
const messageHistory = {};
function displayChatWithUser(userName) {
  // Очистите текущий чат
  clearChat();

  // Создайте заголовок чата с именем пользователя
  const chatHeader = document.createElement("div");
  chatHeader.className = "chat-header";
  chatHeader.innerHTML = `<h2>${userName}</h2>`;
  const chatMessages = document.querySelector(".chat-messages");
  chatMessages.appendChild(chatHeader);

  // Отображаем переписку с выбранным пользователем
  if (messageHistory[userName]) {
    messageHistory[userName].forEach((message) => {
      const messageElement = createMessageElement(message.sender, message.text, message.isUser);
      chatMessages.appendChild(messageElement);
    });
  }
}