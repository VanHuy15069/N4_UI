import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import HeaderAdmin from './HeaderAdmin/HeaderAdmin';
import Navbar from './Navbar/Navbar';
const cx = classNames.bind(styles);
function AdminLayout({ children }) {
    return (
        <div>
            <HeaderAdmin />
            <div className={cx('container')}>
                <Navbar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
export default AdminLayout;
