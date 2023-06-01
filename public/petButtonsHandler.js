let pcount = document.getElementById("pcount");

// automatically fetch pet list when render
const fetchListAndRenderPet = () => {
  axios
    .get("/api/pet/list?page=1&limit=50")
    .then((res) => {
      res = res.data;

      pcount.innerHTML = res.length;
      let tbody = document.querySelector("tbody");

      tbody.innerHTML = res
        .map(
          (item) => `<tr>
                <td>${item._id}</td>
                <td>${item.name}</td> 
                 <td>${item.species}</td>
                 <td>${item.age}</td>
                 <td>${item.owner_name}</td>
                 <td>${item.owner_phone}</td>
                 <td>${item.GP_in_charge.username}</td>
                   <td>${new Date(
                     item.admission_date
                   ).toLocaleDateString()}</td>

                 <td><button class="btn btn-secondary" onclick=dischargeHandler('${
                   item._id
                 }')>Discharge</button> </td>
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

fetchListAndRenderPet();

const pregistrationForm = document.getElementById("pregistrationForm");

// New pet registration button
pregistrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const pformData = new FormData(pregistrationForm);

  // Set the default value for admission_date to today's date
  const currentDate = new Date().toLocaleDateString();

  pformData.append("admission_date", currentDate);

  axios
    .post("/api/pet", pformData) // here axios.post without header is still OK.
    .then((res) => {
      res&&toastr.success("Register success")
      fetchListAndRenderPet();
    })
    .catch((err) => console.log(err)  );

    // reset the form content after registration
    pregistrationForm.reset(); 
});

// delete button handler
const deleteHandler = (id) => {
  console.log("deleted:", id);
  axios
    .delete(`/api/pet/${id}`)
    .then((res) => {
      console.log(res.data);
      toastr.success("Delete success");
      fetchListAndRenderPet();
    })
    .catch((err) => console.log(err));
};

// discharge button handler
const dischargeHandler = (id) => {
  axios.post(`/api/history/${id}`);
  deleteHandler(id);
  toastr.success("Discharge success");
  fetchListAndRenderPet();
};
