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

const MovieValidation = yup.object().shape({
   title: yup.string().required("Tên phim không được trống!"),
   desc: yup.string().required("Mô tả không được trống!"),
   categories: yup.array().required("Thể loại không được trống!"),
   language: yup.string().required("Ngôn ngữ không được trống!"),
   year: yup.number().required("Năm sản xuất không được trống!"),
   episode: yup.string().required("Số tập phim không được trống!"),
   status: yup.string().required("Trạng thái phim không được trống!"),
   type: yup.string().required("Phân loại phim không được trống!"),
   age: yup.string().required("Độ tuổi xem phim không được trống!"),
   studio: yup.string().required("Studio không được trống!"),
   director: yup.string().required("Director không được trống!"),
})

export { ReviewValidation, MovieValidation }