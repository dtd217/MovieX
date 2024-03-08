import * as yup from "yup";

// Login validation
const LoginValidation = yup.object().shape({
   email: yup.string().email().required("Xin hãy điền đầy đủ email!").trim(),
   password: yup.string()
      .required("Xin hãy điền đầy đủ mật khẩu!")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(20, "Mật khẩu phải ít hơn 20 ký tự")
      .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 1 chữ số").trim(),
});

// Register validation
const RegisterValidation = yup.object().shape({
   email: yup.string().email().required("Xin hãy điền đầy đủ email!").trim(),
   password: yup.string()
      .required("Xin hãy điền đầy đủ mật khẩu!")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(20, "Mật khẩu phải ít hơn 20 ký tự")
      .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 1 chữ số").trim(),
   name: yup.string().required("Xin hãy điền đầy đủ tên!")
      .max(20, "Tên phải ít hơn 20 ký tự")
      .matches(/^[a-zA-Z]/)
});

// Update profile validation
const ProfileValidation = yup.object().shape({
   name: yup.string()
      .required("Xin hãy điền đầy đủ tên!")
      .max(20, "Tên phải là 20 ký tự")
      .matches(/^[a-zA-Z]/).trim(),
   email: yup.string().email().required("Xin hãy điền đầy đủ email!").trim(),
})

// Change password validation
const PasswordValidation = yup.object().shape({
   oldPassword: yup.string()
      .required("Xin hãy điền đầy đủ mật khẩu!")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(20, "Mật khẩu phải ít hơn 20 ký tự")
      .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 1 chữ số").trim(),
   newPassword: yup.string()
      .required("Xin hãy điền đầy đủ mật khẩu!")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(20, "Mật khẩu phải ít hơn 20 ký tự")
      .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 1 chữ số").trim(),
   confirmPassword: yup.string()
      .required("Xin hãy điền đầy đủ mật khẩu!")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(20, "Mật khẩu phải ít hơn 20 ký tự")
      .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 1 chữ số").trim()
      .oneOf([yup.ref("newPassword"), null], "Mật khẩu phải khớp nhau!"),
})

export { LoginValidation, RegisterValidation, ProfileValidation, PasswordValidation };
