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
    faBlog,
} from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);
function Navbar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav-bar')}>
                <NavLink to="/admin" end className={(nav) => cx({ active: nav.isActive })}>
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faChartColumn} />
                        </span>
                        <p className={cx('text')}>Thống kê</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/feedback" end className={(nav) => cx({ active: nav.isActive })}>
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faMessage} />
                        </span>
                        <p className={cx('text')}>Phản hồi</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/manage_blogs" end className={(nav) => cx({ active: nav.isActive })}>
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faBlog} />
                        </span>
                        <p className={cx('text')}>Blogs</p>
                    </div>
                </NavLink>
                <div className={cx('nav-bar_title')}>Quản lý cửa hàng</div>
                <Link to="/">
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faNewspaper} />
                        </span>
                        <p className={cx('text')}>Tin tức</p>
                    </div>
                </Link>
                <NavLink to="/admin/product" end className={(nav) => cx({ active: nav.isActive })}>
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faLeaf} />
                        </span>
                        <p className={cx('text')}>Sản phẩm</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/category" end className={(nav) => cx({ active: nav.isActive })}>
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faRectangleList} />
                        </span>
                        <p className={cx('text')}>Loại sản phẩm</p>
                    </div>
                </NavLink>
                <div className={cx('nav-bar_title')}>Quản lý bán hàng</div>
                <NavLink to="/admin/user" end className={(nav) => cx({ active: nav.isActive })}>
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faUsers} />
                        </span>
                        <p className={cx('text')}>Khách hàng</p>
                    </div>
                </NavLink>
                <Link to="/">
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </span>
                        <p className={cx('text')}>Đơn hàng</p>
                    </div>
                </Link>
                <NavLink to="/admin/feedback" end className={(nav) => cx({ active: nav.isActive })}>
                    <div className={cx('nav-bar_item')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faMessage} />
                        </span>
                        <p className={cx('text')}>Phản hồi</p>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}
export default Navbar;
