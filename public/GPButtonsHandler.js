// automatically fetch list when render
const fetchListAndRenderGP = () => {

  axios
    .get("/api/GP/list?page=1&limit=50")
    .then((res) => {
      res = res.data;
      console.log(res);
      count.innerHTML = res.length;
      let tbody = document.querySelector("tbody");

      tbody.innerHTML = res
        .map(
          (item) => `<tr>
        <td><img class="avatarImg" src="${item.avatar}"/></td>
                <td>${item._id}</td>
                <td>${item.username}</td>
                 <td>${item.birth_year}</td>
                 <td>${item.occupation}</td>
                   <td>${new Date(item.createdAt).toLocaleString()}</td>
                    <td><button class="btn btn-warning" onclick=updateHandler('${
                      item._id
                    }') >Exclude</button></td>
                  <td><button class="btn btn-danger" onclick=deleteHandler('${
                    item._id
                  }') > Delete</button></td>
                </tr>`
        )
        .join("");
    })
    .catch((err) => {
      console.log(err);
    });
};
fetchListAndRenderGP();

// create new gp and add to the list
const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(registrationForm);

  axios
    .post("/api/GP", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      console.log("res is " + res);
      if (!res) {
        toastr.error("An Error Occurred");
      } else {
        toastr.success("Register sucess");
        fetchListAndRenderGP();
      }
    })
    .catch((error) => {
      console.log("error:", error); ////////////////////////////error is not passed from  validateGP in addGP
      const errorMessage = error.response.data.error;
      toastr.error(errorMessage);
    });
});

// update button handler
const updateHandler = (id) => {
  axios
    .put(`/api/GP/${id}`, {
      hashedPassword: "password_reset",
    })
    .then((res) => {
      if (!res) {
        toastr.error("Not authenticated");
      } else if (res && res.status == 200) {
        console.log(res);
        toastr.success("Update success");
        fetchListAndRenderGP();
      }
    })
    .catch((err) => console.log(err));
};

// delete button handler
const deleteHandler = (id) => {
  axios
    .delete(`/api/GP/${id}`)
    .then((res) => {
      if (!res) {
        toastr.error("Not authenticated");
      } else if (res && res.status == 200) {
        toastr.success("Delete success");
        //delete sucess and then re-fetch the list
        fetchListAndRenderGP();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
