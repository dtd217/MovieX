import * as yup from "yup";

// Login validation
const loginValidation = yup.object().shape({
   email: yup.string().email().required("Xin hãy điền đầy đủ email!").trim(),
   password: yup.string()
      .required("Xin hãy điền đầy đủ mật khẩu!")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(20, "Mật khẩu phải ít hơn 20 ký tự")
      .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 1 chữ số").trim(),
});

// Register validation
const registerValidation = yup.object().shape({
   email: yup.string().email().required("Xin hãy điền đầy đủ email!").trim(),
   password: yup.string()
      .required("Xin hãy điền đầy đủ mật khẩu!")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(20, "Mật khẩu phải ít hơn 20 ký tự"),
   name: yup.string().required("Xin hãy điền đầy đủ tên!").trim(),
});