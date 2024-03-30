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
   image: yup.string().required("Ảnh phim không được trống!"),
   banner: yup.string().required("Ảnh bìa không được trống!"),
   categories: yup.array().required("Thể loại không được trống!"),
   language: yup.string().required("Ngôn ngữ không được trống!"),
   year: yup.string().required("Năm sản xuất không được trống!"),
   episode: yup.string().required("Số tập phim không được trống!"),
   status: yup.string().required("Trạng thái phim không được trống!"),
   type: yup.array().required("Phân loại phim không được trống!"),
   video: yup.string().required("Video phim không được trống!"),
   characters: yup.array().required("Diễn viên không được trống!"),
})

export { ReviewValidation, MovieValidation }