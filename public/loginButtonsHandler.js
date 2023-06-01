let username = document.getElementById("username");
let password = document.getElementById("password");
let login = document.getElementById("login");
let errorMsg = document.getElementById("errorMsg");

toastr.options = {
  // Add any custom options or configurations here
};

// login button click handler
login.onclick = (event) => {
  event.preventDefault();
  console.log(username.value, password.value);
  axios
    .post(
      "/login",
      JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      } //axios post request NEEDS HEADER! when involved with Token.
    )
    .then(function (res) {
      if (res.data.ok === 1) {
       localStorage.setItem("username", username.value);
       toastr.success('Login success');
        location.replace("/");
      } else {
         errorMsg.innerHTML = "Username or password incorrect";
         toastr.warning("Username or password incorrect");
       
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};
