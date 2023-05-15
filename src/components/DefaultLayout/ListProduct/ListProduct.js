import styles from './ListProduct.module.scss';
import classNames from 'classnames/bind';
import ProductItem from '../ProductItem/ProductItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './slideproducts.css';
const cx = classNames.bind(styles);
function ListProduct({
    products,
    title,
    rewind = false,
    slidesPerView,
    classNameImg = false,
    onClick,
    mTopNull = false,
}) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const classname = cx('products', { mTopNull });
    return (
        <div className={classname}>
            {title && (
                <div className={cx('box-title')}>
                    <span className={cx('line')}></span>
                    <p className={cx('title')}>{title}</p>
                    <span className={cx('line')}></span>
                </div>
            )}
            <div className={cx('products-list')}>
                {products.length > 0 ? (
                    <Swiper
                        loop={!rewind}
                        slidesPerView={slidesPerView}
                        spaceBetween={30}
                        rewind={rewind}
                        navigation={true}
                        modules={[Navigation]}
                        className="wrapper-slider_product"
                    >
                        {products.map((product, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <ProductItem
                                        id={product.id}
                                        src={`http://localhost:5000/src/${product.image}`}
                                        title={product.title}
                                        price={VND.format(product.price)}
                                        classNameImg={classNameImg}
                                        onClick={onClick}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <p className={cx('text')}>SẢN PHẨM ĐÃ HẾT HÀNG</p>
                )}
            </div>
        </div>
    );
}
export default ListProduct;
