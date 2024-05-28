import Slider from 'react-slick';
import { NextArrow } from './slider/NextArrow';
import { PrevArrow } from './slider/PrevArrow';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons

const UserSlider = ({ users }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 1000,
    nextArrow: <NextArrow />, // Pass NextArrow component
    prevArrow: <PrevArrow />, // Pass PrevArrow component
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Check if there are more slides to show or scroll to
  const hasMoreSlidesToShow = users.length > settings.slidesToShow;
  const hasMoreSlidesToScroll = users.length > settings.slidesToScroll;

  // Render the slider only if there are more slides
  return (
    <>
      {hasMoreSlidesToShow && hasMoreSlidesToScroll && (
        <Slider {...settings} className="user-slider">
          {users.map((user) => (
            <div key={user.id} className="user-item">
              <div className="user-icon-container">
                <img
                  src={user.profileUrl}
                  alt={user.username}
                  className="user-icon"
                />
              </div>
              <span className="user-id">{user.id}</span>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};

export default UserSlider;
