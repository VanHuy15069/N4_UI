import classNames from 'classnames/bind';
import styles from './ProfileLayout.module.scss';
import Header from '../DefaultLayout/Header';
import Footer from '../DefaultLayout/Footer';
const cx = classNames.bind(styles);
function ProfileLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('nav-bar')}>
                    <h3>Thông tin tài khoản</h3>
                </div>
                <div className={cx('container')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}
export default ProfileLayout;
