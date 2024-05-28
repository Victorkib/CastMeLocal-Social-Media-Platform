import { FaArrowLeft } from 'react-icons/fa'; // Import arrow icons
// Custom previous arrow component
export const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
};
