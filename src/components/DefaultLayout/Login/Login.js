import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useState, useContext } from 'react';
import { Context } from '~/Provider/Provider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();
    const [, setSate, , setUser, , setShow, ,] = useContext(Context);
    const [login, setLogin] = useState(true);
    const [rePassword, setRePassword] = useState('');
    const [check, setCheck] = useState('');
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        address: '',
    });
    const { firstName, lastName, username, email, phoneNumber, password, address } = data;
    const handleRegister = () => {
        setLogin(false);
        setCheck('');
    };
    const handleShow = () => {
        setShow(false);
    };
    const handleLogin = () => {
        setLogin(true);
        setCheck('');
    };
    //Lấy value ô input
    const handleChange = (e) => {
        const spaceValue = e.target.value;
        if (!spaceValue.startsWith(' ')) {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };
    //SỦ LÝ ĐĂNG KÝ
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        if (
            !data.firstName ||
            !data.lastName ||
            !data.username ||
            !data.email ||
            !data.phoneNumber ||
            !data.address ||
            !data.password
        ) {
            setCheck('Bạn nhập thiếu thông tin, vui lòng nhập thêm thông tin!');
        } else if (data.username.search(' ') > -1) {
            setCheck('Tên đăng nhập không hợp lệ!');
        } else if (isNaN(data.phoneNumber)) {
            setCheck('Bạn nhập sai số điện thoại!');
        } else if (data.password.length < 8 || data.password.search(' ') > -1) {
            setCheck('Mật khẩu không hợp lệ!');
        } else if (data.password !== rePassword) {
            setCheck('Mật khẩu xác nhận bạn nhập không khớp!');
        } else {
            axios
                .post('http://localhost:5000/api/v1/auth/register', data)
                .then((res) => {
                    if (res.data.err === 0) {
                        setLogin(true);
                        setCheck('');
                    } else if (res.data.err === 2) {
                        setCheck(res.data.msg);
                    }
                })
                .catch(() => {
                    alert('Có lỗi khi gửi dữ liệu tới máy chủ!');
                });
        }
        navigate('/');
    };
    //SỬ LÝ LOGIN
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        if (!data.username || !data.password) {
            setCheck('Nhập đầy đủ thông tin để đăng nhập!');
        } else {
            axios
                .post('http://localhost:5000/api/v1/auth/login', { username: data.username, password: data.password })
                .then((res) => {
                    if (res.data.err === 0) {
                        const myUser = JSON.stringify(res.data.response);
                        setUser(res.data.response);
                        setShow(false);
                        setSate(true);
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userLogin', myUser);
                        if (res.data.response.admin) {
                            navigate('/admin');
                        } else {
                            navigate('/');
                        }
                        window.location.reload();
                    } else if (res.data.err === 2) {
                        setCheck(res.data.msg);
                    }
                })
                .catch(() => {
                    alert('Có lỗi khi gửi dữ liệu tới máy chủ!');
                    navigate('/');
                });
        }
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
                {login ? (
                    //FORM LOGIN
                    <form onSubmit={handleSubmitLogin}>
                        <div className={cx('box')}>
                            <p className={cx('text')}>Tên đăng nhập</p>
                            <input
                                className={cx('input')}
                                type="text"
                                placeholder="Tên đăng nhập"
                                name="username"
                                onChange={handleChange}
                                value={username}
                            />
                        </div>
                        <div className={cx('box')}>
                            <p className={cx('text')}>Mật khẩu</p>
                            <input
                                className={cx('input')}
                                type="password"
                                placeholder="Mật khẩu"
                                name="password"
                                onChange={handleChange}
                                value={password}
                            />
                        </div>
                        <div className={cx('wrap-btn')}>
                            {check && (
                                <div className={cx('error')}>
                                    <span className={cx('icon-err')}>
                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                    </span>
                                    <p className={cx('err-desc')}>{check}</p>
                                </div>
                            )}
                            <div className={cx('btn', 'back')} onClick={handleShow}>
                                TRỞ LẠI
                            </div>
                            <button type="submit" className={cx('btn')}>
                                ĐĂNG NHẬP
                            </button>
                        </div>
                    </form>
                ) : (
                    //FORM REGISTER
                    <form onSubmit={handleSubmitRegister}>
                        <div className={cx('box', 'line')}>
                            <p className={cx('text')}>First Name</p>
                            <input
                                className={cx('input')}
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                onChange={handleChange}
                                value={firstName}
                            />
                        </div>
                        <div className={cx('box', 'line')}>
                            <p className={cx('text')}>Last Name</p>
                            <input
                                className={cx('input')}
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={handleChange}
                                value={lastName}
                            />
                        </div>
                        <div className={cx('box')}>
                            <p className={cx('text')}>Tên đăng nhập</p>
                            <input
                                className={cx('input')}
                                type="text"
                                placeholder="Tên đăng nhập"
                                name="username"
                                onChange={handleChange}
                                value={username}
                            />
                        </div>
                        <div className={cx('box')}>
                            <p className={cx('text')}>Email</p>
                            <input
                                className={cx('input')}
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={email}
                            />
                        </div>
                        <div className={cx('box')}>
                            <p className={cx('text')}>Số điện thoại</p>
                            <input
                                className={cx('input')}
                                type="text"
                                placeholder="Số điện thoại"
                                name="phoneNumber"
                                onChange={handleChange}
                                value={phoneNumber}
                            />
                        </div>
                        <div className={cx('box')}>
                            <p className={cx('text')}>Địa chỉ</p>
                            <input
                                className={cx('input')}
                                type="text"
                                placeholder="Địa chỉ"
                                name="address"
                                onChange={handleChange}
                                value={address}
                            />
                        </div>
                        <div className={cx('box')}>
                            <p className={cx('text')}>Mật khẩu</p>
                            <input
                                className={cx('input')}
                                type="password"
                                placeholder="Mật khẩu"
                                name="password"
                                onChange={handleChange}
                                value={password}
                            />
                        </div>
                        <div className={cx('box')}>
                            <p className={cx('text')}>Xác nhận mật khẩu</p>
                            <input
                                className={cx('input')}
                                type="password"
                                placeholder="Mật khẩu"
                                onChange={(e) => setRePassword(e.target.value)}
                                value={rePassword}
                            />
                        </div>
                        <div className={cx('wrap-btn')}>
                            {check && (
                                <div className={cx('error')}>
                                    <span className={cx('icon-err')}>
                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                    </span>
                                    <p className={cx('err-desc')}>{check}</p>
                                </div>
                            )}
                            <div className={cx('btn', 'back')} onClick={handleShow}>
                                TRỞ LẠI
                            </div>
                            <button type="submit" className={cx('btn')}>
                                ĐĂNG KÝ
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
export default Login;
