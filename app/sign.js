const signupForm = document.querySelector("#sign-up-form");
const loginForm = document.querySelector("#sign-in-form");
const logoutButton = document.getElementById("logout-button");

async function signup(e) {
  e.preventDefault();

  const pseudo = signupForm[0].value;
  const password = signupForm[1].value;
  const passwordConfirm = signupForm[2].value;
  const isCandidat = signupForm[3].checked;

  const response = await fetch("http://127.0.0.1:8080/user/signup", {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      pseudo: pseudo,
      password: password,
      passwordConfirm: passwordConfirm,
      candidat: isCandidat,
      theme: "",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

async function login(e) {
  e.preventDefault();

  const pseudo = loginForm[0].value;
  const password = loginForm[1].value;

  const response = await fetch("http://127.0.0.1:8080/user/signin", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      pseudo: pseudo,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

async function logout(e) {
  const response = await fetch("http://127.0.0.1:8080/user/logout", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

signupForm.addEventListener("submit", signup);
loginForm.addEventListener("submit", login);
logoutButton.addEventListener("click", logout);
