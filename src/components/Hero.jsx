import Slider from 'react-slick';
import styled from 'styled-components';

const Hero = () => {
  const settings = {
    dots: true,
    arrow: false,
    infinite: true,
    fade: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
  };

  return (
    <Wrapper>
      <Slider {...settings} className='slider'>
        <div className='slide-item'>
          <img src='./images/slide1.jfif' alt='1' />
        </div>
        <div className='slide-item'>
          <img src='./images/slide2.jfif' alt='2' />
        </div>
        <div className='slide-item'>
          <img src='./images/slide3.png' alt='3' />
        </div>
      </Slider>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .slider {
    .slide-item {
      width: 100%;
      height: 350px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      /* Small Screen */
      @media (max-width: 768px) {
        height: 200px;
      }
    }
    .slick-dots {
      bottom: 15px;
    }
  }
`;

export default Hero;
