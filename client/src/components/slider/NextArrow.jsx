import { FaArrowRight } from 'react-icons/fa'; // Import arrow icons
// Custom next arrow component
export const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
};
