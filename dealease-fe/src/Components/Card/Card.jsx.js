// import { useState } from "react";
// import "../../assets/scss/button.scss";

// export default function ImageInput() {
//   const [image, setImage] = useState(null);

//   const onImageChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(URL.createObjectURL(event.target.files[0]));
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={onImageChange} className="file" />

//       {image && <img src={image} alt="preview image" />}
//     </div>
//   );
// }