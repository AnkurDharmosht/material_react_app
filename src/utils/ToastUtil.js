import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 7000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  width: "max-content",
  // background: "#4caf50",
  background: "#fefefe",
  color: "#169816",
  iconColor: "#2fa92f",
  showCloseButton: true,
});
export const ErrorToast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 10000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  width: "max-content",
  background: "#570000",
  color: "#fff",
  iconColor: "#fff",
  showCloseButton: true,
});
export const NormalToast = Swal.mixin({
  confirmButtonColor: "#3578EA",
});
export const MySwal = withReactContent(Toast);
export const ErrorSwal = withReactContent(ErrorToast);

// type = 'success' | 'error' | 'warning' | 'info' | 'question'
export const okToast = (title, msg, type) => {
  MySwal.fire(title, msg, type);
};

export const okErrorToast = (title, msg) => {
  ErrorToast.fire(title, msg, "error");
};

export const apiErrorToast = (error, history) => {
  var msg;
  var status =
    error && error.response && error.response.status && error.response.status;
  if (error) {
    if (error.data) {
      error.response = error;
    }
    if (error.response) {
      status = error.response.status;
      if (error.response.data) {
        if (error.response.data.message) {
          if (typeof error.response.data.message === "string") {
            msg = error.response.data.message;
          } else {
            const msgObj = error.response.data.message;
            msg = "";
            for (let i in msgObj) {
              msg += msgObj[i] + "\n";
            }
          }
        } else if (error.response.data.detail) {
          if (typeof error.response.data.detail === "string") {
            msg = error.response.data.detail;
          } else {
            const msgObj = error.response.data.detail;
            msg = "";
            for (let i in msgObj) {
              msg += msgObj[i] + "\n";
            }
          }
        } else if (typeof error.response.data === "object") {
          msg = JSON.stringify(error.response.data);
        } else {
          msg = error.response.data;
        }
      } else {
        msg = JSON.stringify(error.response);
        // msg = "Something went wrong, Please try after sometime";
      }
    } else {
      if (error.message) {
        msg = error.message;
      } else {
        // msg = JSON.stringify(error);
        msg = error;
        // msg = "Something went wrong, Please try after sometime";
      }
    }
  }
  if (status === 401) {
    ErrorSwal.fire({
      title: history ? "Login Required!!" : "Error!",
      text: msg,
      icon: "error", // 'success' | 'error' | 'warning' | 'info' | 'question'
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Login",
      showConfirmButton: history,
      showLoaderOnConfirm: history,
      preConfirm: () => {},
      allowOutsideClick: () => !Swal.isLoading(),
      // backdrop: true,
    }).then((result) => {
      localStorage.clear();
      const location = window.location;
      let baseUrl = location.protocol + "//" + location.host;
      window.open(baseUrl, "_self");
    });
  }
  if (status === 500) {
    ErrorSwal.fire("", "Something Went wrong", "error");
  }
  if (status === 404 || status === 406) {
    ErrorSwal.fire("", msg ? msg : "Something Went wrong", "error");
  } else {
    ErrorSwal.fire("", msg ? msg : "Error can't be identified", "error");
  }
  return msg;
};

export const okSuccessToast = (title, msg) => {
  Toast.fire(title, msg, "success");
};

export const showCopyDialog = (title, data) => {
  MySwal.fire({
    title: title,
    text: data,
    icon: "success", // 'success' | 'error' | 'warning' | 'info' | 'question'
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Copy",
    showLoaderOnConfirm: true,
    preConfirm: () => {},
    allowOutsideClick: () => !Swal.isLoading(),
    backdrop: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${title} copied successfully`,
      });
    }
  });
};

export const toastWithTimer = (
  msg,
  timer,
  title = "Details Updated Successfully."
) => {
  let timerInterval;
  Swal.fire({
    title: `<div class="success-color">${title}</div>`,
    // html: "I will close in <b></b> milliseconds.",
    html: msg,
    timer: timer,
    timerProgressBar: true,
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      // const content = Swal.getHtmlContainer();
      // const $ = content.querySelector.bind(content);
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("strong");
      timerInterval = setInterval(() => {
        b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0);
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  });
};
export const toastInvoicePopup = (msg, timer) => {
  let timerInterval;
  Swal.fire({
    title: '<div class="green-color">Please LogIn/SignUp to view Invoice</div>',
    // html: "I will close in <b></b> milliseconds.",
    html: msg,
    timer: timer,
    timerProgressBar: true,
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      const content = Swal.getHtmlContainer();
      const $ = content.querySelector.bind(content);
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("strong");
      timerInterval = setInterval(() => {
        b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0) + " seconds";
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  });
};
