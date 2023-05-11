import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Navigation from '~/components/Navigation/Navigation';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faBagShopping,
    faCaretDown,
    faCartShopping,
    faChalkboardUser,
    faMagnifyingGlass,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { Context } from '~/Provider/Provider';
import MenuUser from '../MenuUser/MenuUser';
import MenuUserItem from '../MenuUser/MenuUserItem/MenuUserItem';
import Avarta from '../Avarta/Avatar';
const cx = classNames.bind(styles);
const imageLogo = require('./LOGO.png');
function Header() {
    const [state, setState, user, setUser, , setShow] = useContext(Context);
    const navigate = useNavigate();
    const handleLogin = () => {
        setShow(true);
    };
    const handleLogout = () => {
        setState(false);
        setUser();
        localStorage.removeItem('token');
        localStorage.removeItem('userLogin');
        navigate('/');
        window.location.reload();
    };
    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Link to="/" className={cx('logo')}>
                        <img src={imageLogo} alt="" />
                    </Link>
                    <div className={cx('search')}>
                        <div className={cx('wrapper-input')}>
                            <input className={cx('input')} type="text" placeholder="Tìm kiếm..." />
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
                                <Link to="/account">
                                    <div className={cx('wrapper-avarta')}>
                                        <Avarta>
                                            {user.firstName.slice(0, 1)}
                                            {user.lastName.slice(0, 1)}
                                        </Avarta>
                                    </div>
                                </Link>
                                <p className={cx('username')}>{user.username}</p>
                                <span className={cx('icon-menu')}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                    <MenuUser className={cx('wrapper-menu')}>
                                        <Link to="/account">
                                            <MenuUserItem icon={faUser} content={'Tài khoản'} />
                                        </Link>
                                        <MenuUserItem icon={faCartShopping} content={'Đơn hàng'} />
                                        {user.admin && (
                                            <Link to="/admin">
                                                <MenuUserItem icon={faChalkboardUser} content={'Quản lý'} />
                                            </Link>
                                        )}
                                        <MenuUserItem
                                            icon={faArrowRightFromBracket}
                                            className={cx('logout')}
                                            content={'Đăng xuất'}
                                            onClick={handleLogout}
                                        />
                                    </MenuUser>
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
