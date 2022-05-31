# Chat App

## Description

Create real time communication channel between two user.

### chatApp video

> can see video of chat app 😎 https://drive.google.com/file/d/1I9H_mKptXuFyXZgtRTGI3MaGjsHGZs8e/view?usp=sharing

https://user-images.githubusercontent.com/59959472/165110800-06f1c26e-b7dc-48d8-8b78-5939c79f0bc1.mp4

### Installing

- You cane download my project.

```
git clone https://github.com/aml-fakhry/chatApp.git
```

- project requires having node installed https://nodejs.org/en/download/

## Project build depended on

- The language used and application logic

1. [TypeScript](https://www.typescriptlang.org/docs/)
2. [Node.JS](https://nodejs.org/dist/latest-v16.x/docs/api/)
3. [Express](https://expressjs.com/)
4. [socket.io](https://socket.io.com/)

- For Fixing and Formatting Code

1. [ESLint](https://eslint.org/docs/user-guide/getting-started)
2. [Prettier](https://prettier.io/docs/en/index.html)

### Executing program (scripts)

- Install all dependencies

```
yarn
```

- Run the program in development environment.

```
yarn dev
```

- ports the backend.

```
http://localhost:5555
```



### Views

1- index.html.

```javascript
 <script>
    const from = window.prompt('Enter your name: ');
    const to = window.prompt('Enter friend name: ');
    const socket = io();
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const typing = document.getElementById('typing');
    userInfo.textContent = from;
    input.addEventListener('input', function () {
      socket.emit('typing', to.value);
    });

    input.addEventListener('blur', function () {
      socket.emit('noTyping', to.value);
    });

    // when we receive a typing event, show that a user is typing
    socket.on('typing', function (data) {
      typing.innerHTML = '<span class ="typing">is typing......</span>';
    });
    // when we receive a no typing event, show that a user is typing
    socket.on('noTyping', function (data) {
      typing.innerHTML = '';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (input.value) {
        socket.emit('chat message', { text: input.value, to });
        const item = document.createElement('div');
        const img = document.createElement('img');
        const span = document.createElement('span');

        img.className = 'user_img_msg';
        img.style.float = 'left';
        img.src = 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg';
        span.textContent = input.value;
        span.setAttribute('id', 'span_msg');
        span.style.margin = '18px';
        span.style.marginTop = 'auto';
        span.style.marginBottom = 'auto';
        span.style.marginLeft = '10px';
        span.style.borderRadius = '25px';
        span.style.backgroundColor = '#82ccdd';
        span.style.padding = '10px';
        span.style.position = 'relative';
        item.style.color = 'blue';
        item.style.marginBottom = '-11px';
        item.style.marginBottom = '12px';
        messages.appendChild(item);
        item.appendChild(span);
        item.appendChild(img);
        // window.scrollTo(1, document.body.scrollHeight);
        input.value = '';
      }
    });
    socket.on('connect', () => {
      socket.emit('name', from);
    });
    socket.on('chat message', (msg) => {
      const item = document.createElement('div');
      const img = document.createElement('img');
      const span = document.createElement('span');

      img.className = 'user_img_msg';
      img.style.float = 'right';
      img.src =
        'https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg';
      item.appendChild(span);
      span.textContent = msg;
      span.setAttribute('id', 'span_msg');
      span.style.margin = '18px';
      span.style.marginTop = 'auto';
      span.style.marginBottom = 'auto';
      span.style.marginLeft = '10px';
      span.style.borderRadius = '25px';
      span.style.backgroundColor = '#78e08f';
      span.style.padding = '10px';
      span.style.position = 'relative';
      span.style.margin = '18px';
      item.style.color = 'red';
      item.style.textAlign = 'right';
      item.style.marginBottom = '-11px';
      item.style.marginBottom = '12px';
      messages.appendChild(item);
      item.appendChild(img);
      // window.scrollTo(1, document.body.scrollHeight);
    });
  </script>

```

## Endpoints

```

> url to be connect to anther one.

```

http://localhost:5555

```

```

## License

This project is licensed under the Aml Fakhri License - see the LICENSE.md file for details

```

## Authors

Contributors names and contact info

ex. Aml fakhri @aml-fakhry
ex. [@aml_fakhri](amlfakhry13@gmail.com)
```
