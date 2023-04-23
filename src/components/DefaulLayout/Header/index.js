import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Navigation from '~/components/Navigation/Navigation';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { Context } from '~/Provider/Provider';
const cx = classNames.bind(styles);
const imageLogo = require('./LOGO.png');
const imageAvatar = require('./User.png');
function Header() {
    const [state, , user, , , setShow] = useContext(Context);
    const handleLogin = () => {
        setShow(true);
    };
    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Link to={'/'} className={cx('logo')}>
                        <img src={imageLogo} alt="" />
                    </Link>
                    <div className={cx('search')}>
                        <div className={cx('wrapper-input')}>
                            <input className={cx('input')} type="text" />
                            <button className={cx('btn-search')}>
                                <span className={cx('icon-search')}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className={cx('action')}>
                        {state ? (
                            <div className={cx('user')}>
                                <img className={cx('img')} src={imageAvatar} alt="" />
                                <p className={cx('username')}>{user}</p>
                                <span className={cx('icon-menu')}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </span>
                            </div>
                        ) : (
                            <p className={cx('login-title')} onClick={handleLogin}>
                                Đăng Nhập
                            </p>
                        )}
                        <Link to={'/cart'} className={cx('cart')}>
                            <FontAwesomeIcon icon={faBagShopping} />
                        </Link>
                    </div>
                </div>
            </div>
            <Navigation />
        </Fragment>
    );
}
export default Header;
