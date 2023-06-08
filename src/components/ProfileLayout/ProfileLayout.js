import classNames from 'classnames/bind';
import styles from './ProfileLayout.module.scss';
import Header from '../DefaultLayout/Header';
import Footer from '../DefaultLayout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import BoxMSG from '../AdminLayout/BoxMSG/BoxMSG';
import { useState, useContext } from 'react';
import { Context } from '~/Provider/Provider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);
function ProfileLayout({ children }) {
    const navigate = useNavigate();
    const [userLocal, setUserLoacal] = useState(JSON.parse(localStorage.getItem('userLogin')));
    const [, , user, setUser, , , ,] = useContext(Context);
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        firstName: userLocal.firstName,
        lastName: userLocal.lastName,
        email: userLocal.email,
        phoneNumber: userLocal.phoneNumber,
        address: userLocal.address,
    });
    const { firstName, lastName, email, phoneNumber, address } = data;
    const hideBox = () => {
        setShow(false);
        setData({
            firstName: userLocal.firstName,
            lastName: userLocal.lastName,
            email: userLocal.email,
            phoneNumber: userLocal.phoneNumber,
            address: userLocal.address,
        });
    };
    const handleChange = (e) => {
        const spaceValue = e.target.value;
        if (!spaceValue.startsWith(' ')) {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/v1/user/${user.id}`, data)
            .then((res) => {
                setUser({
                    ...user,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                });
                setShow(false);
                setUserLoacal(res.data.editUser);
                localStorage.removeItem('userLogin');
                localStorage.setItem('userLogin', JSON.stringify(res.data.editUser));
                navigate('/account');
            })
            .catch(() => {
                alert('Không thể kết nối đến server');
            });
    };
    return (
        <div>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('nav-bar')}>
                    <div className={cx('header')}>
                        <h3 className={cx('title')}>Thông tin tài khoản</h3>
                        <span className={cx('icon')} onClick={() => setShow(true)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </span>
                    </div>
                    <p className={cx('text')}>
                        Tài khoản: <span className={cx('infor')}>{userLocal.username}</span>
                    </p>
                    <p className={cx('text')}>
                        Họ và tên:{' '}
                        <span className={cx('infor')}>
                            {userLocal.firstName} {userLocal.lastName}
                        </span>
                    </p>
                    <p className={cx('text')}>
                        Email: <span className={cx('infor')}>{userLocal.email}</span>
                    </p>
                    <p className={cx('text')}>
                        Số điện thoại: <span className={cx('infor')}>{userLocal.phoneNumber}</span>
                    </p>
                    <p className={cx('text')}>
                        Địa chỉ: <span className={cx('infor')}>{userLocal.address}</span>
                    </p>
                    <div className={cx('button')}>
                        <button className={cx('btn')}>Đổi mật khẩu</button>
                    </div>
                </div>
                <div className={cx('container')}>{children}</div>
            </div>
            <Footer />
            {show && (
                <BoxMSG onClickHide={hideBox}>
                    <form onSubmit={handleUpdate}>
                        <table className={cx('table')}>
                            <tbody>
                                <tr>
                                    <td>Fist name:</td>
                                    <td>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            onChange={handleChange}
                                            name="firstName"
                                            value={firstName}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Last name:</td>
                                    <td>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            onChange={handleChange}
                                            name="lastName"
                                            value={lastName}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>
                                        <input
                                            className={cx('input')}
                                            type="email"
                                            onChange={handleChange}
                                            name="email"
                                            value={email}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Số điện thoại:</td>
                                    <td>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            onChange={handleChange}
                                            name="phoneNumber"
                                            value={phoneNumber}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ:</td>
                                    <td>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            name="address"
                                            value={address}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={cx('wrapper-btn')}>
                            <button type="submit" className={cx('update-btn')}>
                                Sửa
                            </button>
                        </div>
                    </form>
                </BoxMSG>
            )}
        </div>
    );
}
export default ProfileLayout;
