import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
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
                rewind={false}
                navigation={true}
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                className="wrapper-slider"
            >
                <SwiperSlide>
                    <img
                        className={cx('slider-img')}
                        src="https://tiemchupanh.com/wp-content/uploads/2021/10/deo-dong-ho-tay-nao.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className={cx('slider-img')}
                        src="https://curnonwatch.com/blog/wp-content/uploads/2021/03/dong-ho-deo-taybia.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className={cx('slider-img')}
                        src="https://www.thegioidongho.com.vn/wp-content/uploads/2023/03/40TH-ANniversary.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className={cx('slider-img')}
                        src="https://thejulius.com.vn/wp-content/uploads/2019/12/IMG_7068-1200x800.jpg"
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
export default Slider;
