import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
const cx = classNames.bind(styles);
function ProfilePage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h3>Danh sách đơn hàng</h3>
                <div className={cx('body')}>Không có đơn hàng nào</div>
            </div>
        </div>
    );
}
export default ProfilePage;
