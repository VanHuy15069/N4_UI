import classNames from 'classnames/bind';
import styles from './Review.module.scss';
import ReviewItem from './ReviewItem/ReviewItem';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import {
    faCircleCheck,
    faClockRotateLeft,
    faHandHoldingDollar,
    faScrewdriverWrench,
    faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Review() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('my-group')}>
                <img
                    className={cx('img')}
                    src="https://blog.leflair.com/wp-content/uploads/2022/02/chinh-dong-ho-co-orient-1200x900.jpg"
                    alt=""
                />
                <div className={cx('information')}>
                    <h1 className={cx('title')}>Giới thiệu về N4 Watch</h1>
                    <p className={cx('text')}>
                        “Cùng với sự phát triển không ngừng của thời trang thế giới, rất nhiều thương hiệu cho ra đời
                        những mẫu đồng hồ nam chính hãng đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ… Một chiếc
                        đồng hồ nam cao cấp chính hãng khắc họa một giá trị đích thực khi nói đến phụ kiện xa xỉ dành
                        cho phái mạnh. Hiện nay, đồng hồ là phụ kiện thời trang thiết yếu đối với những người đàn ông
                        hiện đại ngày nay. Trên cổ tay của những người đàn ông thành đạt luôn dành vị trí cho một chiếc
                        đồng hồ nam cao cấp.”
                    </p>
                </div>
            </div>
            <div className={cx('review')}>
                <ReviewItem
                    icon={faProductHunt}
                    title={'Hàng chính hãng'}
                    text={
                        'Hiện nay, đồng hồ là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay'
                    }
                />
                <ReviewItem
                    icon={faCircleCheck}
                    title={'Sản phẩm mới 100%'}
                    text={
                        'Hiện nay, đồng hồ là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay'
                    }
                />
                <ReviewItem
                    icon={faScrewdriverWrench}
                    title={'Bảo hành 12 tháng'}
                    text={
                        'Hiện nay, đồng hồ là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay'
                    }
                />
                <ReviewItem
                    icon={faClockRotateLeft}
                    title={'Đổi trả trong 7 ngày'}
                    text={
                        'Hiện nay, đồng hồ là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay'
                    }
                />
                <ReviewItem
                    icon={faTruckFast}
                    title={'Miễn phí giao hàng'}
                    text={
                        'Hiện nay, đồng hồ là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay'
                    }
                />
                <ReviewItem
                    icon={faHandHoldingDollar}
                    title={'Giá cả hợp lý'}
                    text={
                        'Hiện nay, đồng hồ là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay'
                    }
                />
            </div>
        </div>
    );
}
export default Review;
