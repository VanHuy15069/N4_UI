import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Navigation from '~/components/Navigation/Navigation';
import Tippy from '@tippyjs/react/headless';
import { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faCaretDown,
    faCartShopping,
    faChalkboardUser,
    faCircleXmark,
    faMagnifyingGlass,
    faSpinner,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState, useRef } from 'react';
import { Context } from '~/Provider/Provider';
import MenuUser from '../MenuUser/MenuUser';
import MenuUserItem from '../MenuUser/MenuUserItem/MenuUserItem';
import ProductSearchItem from '../ProductSearchItem/ProductSearchItem';
import Avarta from '../Avarta/Avatar';
import axios from 'axios';
const cx = classNames.bind(styles);
const imageLogo = require('./LOGO.png');
function Header() {
    const [state, setState, user, setUser, , setShow] = useContext(Context);
    const [showResult, setShowResult] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
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
    const handleCart = () => {
        if (!state) {
            setShow(true);
        } else {
            navigate('/cart');
        }
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    };
    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        const timer = setTimeout(() => {
            axios
                .get('http://localhost:5000/api/v1/product/getTitle', {
                    params: {
                        title: searchValue,
                    },
                })
                .then((res) => {
                    setSearchResult(res.data.title.rows);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(true);
                });
        }, 500);
        return () => clearInterval(timer);
    }, [searchValue]);
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Link to="/" className={cx('logo')}>
                        <img src={imageLogo} alt="" />
                    </Link>

                    <div className={cx('search')}>
                        <Tippy
                            interactive
                            visible={showResult && searchResult.length > 0}
                            onClickOutside={handleHideResult}
                            render={(attrs) => (
                                <div className={cx('search-Result')} tabIndex="-1" {...attrs}>
                                    <div className={cx('wrapper-search')}>
                                        {searchResult.map((result, index) => {
                                            return <ProductSearchItem key={index} data={result} />;
                                        })}
                                    </div>
                                </div>
                            )}
                        >
                            <div className={cx('wrapper-input')}>
                                <input
                                    className={cx('input')}
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    spellCheck={false}
                                    ref={inputRef}
                                    value={searchValue}
                                    onChange={handleChange}
                                    onFocus={() => setShowResult(true)}
                                />
                                {!!searchValue && !loading && (
                                    <button className={cx('clear')} onClick={handleClear}>
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </button>
                                )}
                                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                                <button className={cx('btn-search')}>
                                    <span className={cx('icon-search')}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </span>
                                </button>
                            </div>
                        </Tippy>
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
                        <div className={cx('cart')} onClick={handleCart}>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                    </div>
                </div>
            </div>
            <Navigation />
        </Fragment>
    );
}
export default Header;
