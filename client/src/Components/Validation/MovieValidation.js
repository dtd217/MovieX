import * as yup from "yup";

const ReviewValidation = yup.object().shape({
   comment: yup
      .string()
      .required("Xin hãy điền đầy đủ đánh giá!")
      .max(200, "Đánh giá phải chứa tối đa 200 ký tự!"),
   rate: yup
      .number()
      .required("Chọn điểm đánh giá!"),
})

export { ReviewValidation }