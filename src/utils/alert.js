import Swal from "sweetalert2";

export default {
  install: (app) => {
    const alertInstance = {
      fireModal(
        title,
        html,
        input = null,
        inputPlaceholder = null,
        inputValue = null
      ) {
        if (input) {
          return Swal.fire({
            title,
            html,
            input,
            inputValue,
            inputPlaceholder,
            showCloseButton: true,
            confirmButtonText: "OK",
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
          });
        }
        return Swal.fire({
          title,
          html,
          showCloseButton: true,
          confirmButtonText: "OK",
          confirmButtonClass: "btn btn-success",
        });
      },
      fireConfirm(title, text, cancelButtonText = "Cancel") {
        return new Promise((resolve, reject) => {
          Swal.fire({
            icon: "warning",
            title,
            text,
            type: "danger",
            showCancelButton: true,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            cancelButtonText,
            buttonsStyling: false,
          }).then((res) => {
            if (res.value) {
              resolve();
            } else {
              reject();
            }
          });
        });
      },
    };

    app.config.globalProperties.$alert = alertInstance;
    app.config.globalProperties.$store.$alert = alertInstance;
  },
};
