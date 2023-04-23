import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faSquarePhone } from '@fortawesome/free-solid-svg-icons';
import { faSkype } from '@fortawesome/free-brands-svg-icons';
import MenuItem from '~/components/Navigation/MenuItem/MenuItem';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-information')}>
                <div className={cx('information')}>
                    <div className={cx('contact')}>
                        <h3>THÔNG TIN LIÊN HỆ</h3>
                        <div className={cx('desc')}>
                            <span className={cx('icon')}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            <p className={cx('text')}>Số 298 Đ. Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội</p>
                        </div>
                        <div className={cx('desc')}>
                            <span className={cx('icon')}>
                                <FontAwesomeIcon icon={faSquarePhone} />
                            </span>
                            <p className={cx('text')}>0969696969</p>
                        </div>
                        <div className={cx('desc')}>
                            <span className={cx('icon')}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <p className={cx('text')}>n4vippro@gmail.com</p>
                        </div>
                        <div className={cx('desc')}>
                            <span className={cx('icon')}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <p className={cx('text')}>n4vippromax@gmail.com</p>
                        </div>
                        <div className={cx('desc')}>
                            <span className={cx('icon')}>
                                <FontAwesomeIcon icon={faSkype} />
                            </span>
                            <p className={cx('text')}>demonhunterp</p>
                        </div>
                    </div>

                    <div className={cx('contact')}>
                        <h3>LIÊN KẾT</h3>
                        <div className={cx('desc')}>
                            <MenuItem to={'/review'} data={'Giới thiệu'} block />
                        </div>
                        <div className={cx('desc')}>
                            <MenuItem to={'/product/nam'} data={'Đồng hồ nam'} block />
                        </div>
                        <div className={cx('desc')}>
                            <MenuItem to={'/product/nu'} data={'Đồng hồ nữ'} block />
                        </div>
                        <div className={cx('desc')}>
                            <MenuItem to={'/blogs'} data={'Blogs'} block />
                        </div>
                        <div className={cx('desc')}>
                            <MenuItem to={'/lien-he'} data={'Liên hệ'} block />
                        </div>
                    </div>

                    <div className={cx('contact')}>
                        <h3>HỖ TRỢ</h3>
                        <div className={cx('desc')}>
                            <p className={cx('text')}>Hướng dẫn mua hàng</p>
                        </div>
                        <div className={cx('desc')}>
                            <p className={cx('text')}>Hướng dẫn thanh toán</p>
                        </div>
                        <div className={cx('desc')}>
                            <p className={cx('text')}>Chính sách bảo hành</p>
                        </div>
                        <div className={cx('desc')}>
                            <p className={cx('text')}>Chính sách đổi trả</p>
                        </div>
                        <div className={cx('desc')}>
                            <p className={cx('text')}>Tư vấn khách hàng</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('copy-right')}>
                <p className={cx('copt-right-text')}>© Bản quyền thuộc về N4 WATCH</p>
            </div>
        </div>
    );
}
export default Footer;
