let pcount = document.getElementById("pcount");

// automatically fetch history list when render
const fetchListAndRenderHistory = () => {
  axios
    .get("/api/history/list?page=1&limit=100")
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
                   <td>${new Date(
                     item.discharge_date
                   ).toLocaleDateString()}</td>
              
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

fetchListAndRenderHistory();

// delete button handler
const deleteHandler = (id) => {
  console.log("deleted:", id);
  axios
    .delete(`/api/history/${id}`)
    .then((res) => {
      toastr.success("Delete success");
      fetchListAndRenderHistory();
    })
    .catch((err) => console.log(err));
};
