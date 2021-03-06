
const signUpForm = document.querySelector('.sign-up__action')
const loginForm = document.querySelector('.modal-board login-signup-board')
const signup = document.querySelector('#singup-btn')
const username = document.querySelector('#userName')
const email = document.querySelector('#userEmail')
const password = document.querySelector('#userPassword')

function clearInput() {
    username.value = email.value = password.value = null
}

signUpForm.onsubmit  =  (e) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const usernameVal = username.value.trim()
    const emailVal = email.value.trim()
    const passwordVal = password.value.trim()
    
    let avatar
    gender == 'male' ? avatar = "./assets/img/avatar-nam.jpg" : avatar = "./assets/img/avatar-nu.jpg"

    const checkUser = users.filter((user) => {
        return passwordVal == user.password
    })

    if (checkUser.length === 0) {
        
        const obj = {
            id: users.length,
            username: usernameVal,
            email: emailVal,
            password: passwordVal,
            avatar,
            postLiked: [],
            cmtLiked: [],
            isLogin: true,
            onl: 0,
        };
        
        users.push(obj)
        clearInput()
        localStorage.setItem('users', JSON.stringify(users))
    } else {
        e.preventDefault()
        cuteAlert({
            type: "error",
            title: "Lỗi",
            message: "Sdt hoặc email đã tồn tại!",
            buttonText: "Okay"
        })
    }
}


//logn form

loginForm.onsubmit = (e) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const email = email.value.trim()
    const pw = password.value.trim()
    
    let id
    
    const checkUser = users.find((user, index) => {
        id = index;
        return email == user.email && pw == user.password
    })
    
    if(checkUser){
        users.forEach(user => {
            user.isLogin = false;
        })
        users[id].isLogin = true;
        localStorage.setItem('users', JSON.stringify(users))
    } else {
        e.preventDefault()
        cuteAlert({
            type: "error",
            title: "Lỗi",
            message: "Sai tên tài khoản hoặc mật khẩu!",
            buttonText: "Okay"
        })
    }
    
}

const cuteAlert = ({
    type,
    title,
    message,
    buttonText = "OK",
    confirmText = "OK",
    cancelText = "Cancel",
    closeStyle,
  }) => {
    return new Promise((resolve) => {
      const existingAlert = document.querySelector(".alert-wrapper");
  
      if (existingAlert) {
        existingAlert.remove();
      }
  
      const body = document.querySelector("body");
  
      const scripts = document.getElementsByTagName("script");
  
      let src = "";
  
      for (let script of scripts) {
        if (script.src.includes("cute-alert.js")) {
          src = script.src.substring(0, script.src.lastIndexOf("/"));
        }
      }
  
      let btnTemplate = `
      <button class="alert-button ${type}-bg ${type}-btn">${buttonText}</button>
      `;
  
      if (type === "question") {
        btnTemplate = `
        <div class="question-buttons">
          <button class="confirm-button ${type}-bg ${type}-btn">${confirmText}</button>
          <button class="cancel-button error-bg error-btn">${cancelText}</button>
        </div>
        `;
      }
  
      const template = `
      <div class="alert-wrapper">
        <div class="alert-frame">
          <div class="alert-header ${type}-bg">
            <span class="alert-close ${closeStyle === "circle" ? "alert-close-circle" : "alert-close-default"}">X</span>
            <img class="alert-img" src="./assets/img/cute-alert/${type}.svg" />
          </div>
          <div class="alert-body">
            <span class="alert-title">${title}</span>
            <span class="alert-message">${message}</span>
            ${btnTemplate}
          </div>
        </div>
      </div>
      `;
  
      body.insertAdjacentHTML("afterend", template);
  
      const alertWrapper = document.querySelector(".alert-wrapper");
      const alertFrame = document.querySelector(".alert-frame");
      const alertClose = document.querySelector(".alert-close");
  
      if (type === "question") {
        const confirmButton = document.querySelector(".confirm-button");
        const cancelButton = document.querySelector(".cancel-button");
  
        confirmButton.addEventListener("click", () => {
          alertWrapper.remove();
          resolve("confirm");
        });
  
        cancelButton.addEventListener("click", () => {
          alertWrapper.remove();
          resolve();
        });
      } else {
        const alertButton = document.querySelector(".alert-button");
  
        alertButton.addEventListener("click", () => {
          alertWrapper.remove();
          resolve();
        });
      }
  
      alertClose.addEventListener("click", () => {
        alertWrapper.remove();
        resolve();
      });
  
      alertWrapper.addEventListener("click", () => {
        alertWrapper.remove();
        resolve();
      });
  
      alertFrame.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  }
  
  const cuteToast = ({ type, message, timer = 5000 }) => {
    return new Promise((resolve) => {
      const existingToast = document.querySelector(".toast-container");
  
      if (existingToast) {
        existingToast.remove();
      }
  
      const body = document.querySelector("body");
  
      const scripts = document.getElementsByTagName("script");
  
      let src = "";
  
      for (let script of scripts) {
        if (script.src.includes("cute-alert.js")) {
          src = script.src.substring(0, script.src.lastIndexOf("/"));
        }
      }
  
      const template = `
      <div class="toast-container ${type}-bg">
        <div>
          <div class="toast-frame">
            <img class="toast-img" src="./assets/img/cute-alert/${type}.svg" />
            <span class="toast-message">${message}</span>
            <div class="toast-close">X</div>
          </div>
          <div class="toast-timer ${type}-timer" style="animation: timer ${timer}ms linear;"/>
        </div>
      </div>
      `;
  
      body.insertAdjacentHTML("afterend", template);
  
      const toastContainer = document.querySelector(".toast-container");
  
      setTimeout(() => {
        toastContainer.remove();
        resolve();
      }, timer);
  
      const toastClose = document.querySelector(".toast-close");
  
      toastClose.addEventListener("click", () => {
        toastContainer.remove();
        resolve();
      });
    });
  }