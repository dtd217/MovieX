export const InlineError = ({ error }) => (
   <div className="text-red-500 flex items-center">
      <i className="fa-solid fa-triangle-exclamation mr-2"></i>
      <p>{error}</p>
   </div>
)