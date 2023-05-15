import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { sliderCurnon } from '~/Images/images';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './slider.css';
const cx = classNames.bind(styles);
function Slider() {
    return (
        <div className={cx('wrapper')}>
            <Swiper
                loop={true}
                speed={700}
                rewind={false}
                navigation={true}
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="wrapper-slider"
            >
                <SwiperSlide>
                    <img
                        className={cx('slider-img')}
                        src="https://galle.vn/upload_images/images/2021/11/05/rolex.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img className={cx('slider-img')} src={sliderCurnon} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className={cx('slider-img')}
                        src="https://donghouytin.vn/wp-content/uploads/2022/03/dong-ho-uy-tin-banner-1.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className={cx('slider-img')}
                        src="https://thejulius.com.vn/wp-content/uploads/2022/04/MUA-NHIEU-GIAM-NHIEU.jpg"
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
export default Slider;
