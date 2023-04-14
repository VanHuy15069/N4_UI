import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useState, useContext } from 'react';
import { Context } from '~/Provider/Provider';
const cx = classNames.bind(styles);
function Login() {
    const [, , , setShow] = useContext(Context);
    const [login, setLogin] = useState(true);
    let [input, check] = useState('ngu', 'asc');
    const handleRegister = () => {
        setLogin(false);
    };
    const handleShow = () => {
        setShow(false);
    };
    const handleLogin = () => {
        setLogin(true);
    };

    return (
        <div className={cx('wrapper')} onClick={handleShow}>
            <div className={cx('form')} onClick={(e) => e.stopPropagation()}>
                {login ? (
                    <div className={cx('header')}>
                        <h3 className={cx('title')}>ĐĂNG NHẬP</h3>
                        <p className={cx('action')} onClick={handleRegister}>
                            Đăng ký
                        </p>
                    </div>
                ) : (
                    <div className={cx('header')}>
                        <h3 className={cx('title')}>ĐĂNG KÝ</h3>
                        <p className={cx('action')} onClick={handleLogin}>
                            Đăng nhập
                        </p>
                    </div>
                )}

                <form>
                    <div className={cx('box')}>
                        <p className={cx('text')}>Tên đăng nhập</p>
                        <input
                            className={cx('input')}
                            type="text"
                            placeholder="Tên đăng nhập"
                            
                        />
                    </div>
                    {!login && (
                        <div className={cx('box')}>
                            <p className={cx('text')}>Email</p>
                            <input className={cx('input')} type="email" placeholder="Email" />
                        </div>
                    )}
                    {!login && (
                        <div className={cx('box')}>
                            <p className={cx('text')}>Số điện thoại</p>
                            <input className={cx('input')} type="email" placeholder="Số điện thoại" />
                        </div>
                    )}

                    <div className={cx('box')}>
                        <p className={cx('text')}>Mật khẩu</p>
                        <input className={cx('input')} type="password" placeholder="Mật khẩu" />
                    </div>
                    {!login && (
                        <div className={cx('box')}>
                            <p className={cx('text')}>Xác nhận mật khẩu</p>
                            <input className={cx('input')} type="password" placeholder="Mật khẩu" />
                        </div>
                    )}
                    <div className={cx('wrap-btn')}>
                        <div className={cx('btn', 'back')} onClick={handleShow}>
                            TRỞ LẠI
                        </div>
                        {login ? (
                            <button className={cx('btn')}>ĐĂNG NHẬP</button>
                        ) : (
                            <button className={cx('btn')} onClick={handleRegister}>
                                ĐĂNG KÝ
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;
