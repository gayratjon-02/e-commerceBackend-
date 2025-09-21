console.log("Users frontend javascript file");

$(function () {
  $(".member-status").on("change", function (e) {
    const id = e.target.id;

    const memberStatus = $(this).val();

    // TODO Axios updateChosenUser
    axios
      .post("/admin/user/edit", {
        _id: id,
        memberStatus: memberStatus,
      })
      .then((response) => {
        console.log("response", response);
        const result = response.data;

        if (result.data) {
          $(".member-status").blur();
        } else alert("User Update Failed!");
      })
      .catch((err) => {
        console.log("error:", err);
        alert("User update failed!");
      });
  });
});
