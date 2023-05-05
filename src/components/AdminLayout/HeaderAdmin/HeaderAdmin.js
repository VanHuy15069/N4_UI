import classNames from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function HeaderAdmin() {
    const user = JSON.parse(localStorage.getItem('userLogin'));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>Quản trị hệ thống</div>
                <div className={cx('action')}>
                    <div className={cx('home')}>
                        <Link to="/">
                            <span className={cx('icon')}>
                                <FontAwesomeIcon icon={faHouse} />
                            </span>
                        </Link>
                        <Link to="/">
                            <p className={cx('text')}>Website</p>
                        </Link>
                    </div>
                    <div className={cx('admin')}>
                        <Link to="/account">
                            <img
                                className={cx('img')}
                                src="https://i.pinimg.com/736x/1f/98/af/1f98afd74f89124f327933ab734a6313.jpg"
                                alt="admin"
                            />
                        </Link>
                        <p className={cx('name')}>{user.username}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HeaderAdmin;
