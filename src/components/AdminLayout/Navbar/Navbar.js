import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faChartColumn,
    faLeaf,
    faNewspaper,
    faRectangleList,
    faUsers,
    faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Navbar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav-bar')}>
                <Link to="/admin">
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faChartColumn} />
                        </span>
                        <p className={cx('text')}>Thống kê</p>
                    </div>
                </Link>
                <Link to="/admin/feedback">
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faMessage} />
                        </span>
                        <p className={cx('text')}>Phản hồi</p>
                    </div>
                </Link>
                <div className={cx('nav-bar_title')}>Quản lý cửa hàng</div>
                <Link to="/">
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faNewspaper} />
                        </span>
                        <p className={cx('text')}>Tin tức</p>
                    </div>
                </Link>
                <Link to="/admin/product">
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faLeaf} />
                        </span>
                        <p className={cx('text')}>Sản phẩm</p>
                    </div>
                </Link>
                <Link to="/admin/category">
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faRectangleList} />
                        </span>
                        <p className={cx('text')}>Loại sản phẩm</p>
                    </div>
                </Link>
                <div className={cx('nav-bar_title')}>Quản lý bán hàng</div>
                <Link to="/admin/user">
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faUsers} />
                        </span>
                        <p className={cx('text')}>Khách hàng</p>
                    </div>
                </Link>
                <Link to="/">
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </span>
                        <p className={cx('text')}>Đơn hàng</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default Navbar;
