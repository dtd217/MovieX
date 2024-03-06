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
      .max(20, "Mật khẩu phải ít hơn 20 ký tự"),
   name: yup.string().required("Xin hãy điền đầy đủ tên!")
      .max(20, "Tên phải ít hơn 20 ký tự")
      .matches(/^[a-zA-Z]/)
});

const ProfileValidation = yup.object().shape({
   name: yup.string()
      .required("Xin hãy điền đầy đủ tên!")
      .max(20, "Tên phải là 20 ký tự")
      .matches(/^[a-zA-Z]/).trim(),
   email: yup.string().email().required("Xin hãy điền đầy đủ email!").trim(),
})

export { LoginValidation, RegisterValidation, ProfileValidation };
