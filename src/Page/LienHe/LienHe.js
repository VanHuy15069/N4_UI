/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import styles from './LienHe.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const cx = classNames.bind(styles);

function LienHe() {
    let [check, setCheck] = useState('');
    let [data, setData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        address: '',
        message: '',
    });

    let { username, email, phoneNumber, address, message } = data;

    let handleChange = (e) => {
        let spaceValue = e.target.value;
        if (!spaceValue.startsWith(' ')) {
            setData({ ...data, [e.target.name]: [e.target.value] });
        }
        console.log(e.target.value);
    };

    let handleRegister = (e) => {
        e.preventDefault();
        if (!data.username || !data.email || !data.address || !data.phoneNumber || !data.message) {
            setCheck('Vui lòng nhập đủ thông tin');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('maps')}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4737884515184!2d105.7325318752119!3d21.05373098060188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1683199430147!5m2!1svi!2s"
                    width="1200"
                    height="600"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className={cx('about-our')}>
                <div className={cx('item-1')}>
                    <div className={cx('item-logo')}>{/* <FontAwesomeIcon icon="fas fa-map-signs" /> */}</div>
                    <div className="item-text">
                        <h3>Địa chỉ</h3>
                        <p>Số 298 Đ. Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội</p>
                    </div>
                </div>

                <div className={cx('item-1')}>
                    <div className={cx('item-logo')}>{/* <FontAwesomeIcon icon="fas fa-map-signs" /> */}</div>
                    <div className="item-text">
                        <h3>Điện thoại</h3>
                        <h4>000000000000000000</h4>
                        <p>19001000 - Phòng kỹ thuật</p>
                        <p>19888877 - Phòng CSKH</p>
                    </div>
                </div>

                <div className={cx('item-1')}>
                    <div className={cx('item-logo')}>{/* <FontAwesomeIcon icon="fas fa-map-signs" /> */}</div>
                    <div className="item-text">
                        <h3>Email</h3>
                        <p>email is here</p>
                    </div>
                </div>
            </div>

            <div className={cx('form-user')}>
                <form onSubmit={handleRegister}>
                    <div className={cx('input-value')}>
                        <div className={cx('input-1')}>
                            <input
                                type="text"
                                placeholder="Họ tên"
                                onChange={handleChange}
                                name="username"
                                value={username}
                            />
                        </div>
                        <div className={cx('input-1')}>
                            <input type="text" placeholder="Email" onChange={handleChange} name="email" value={email} />
                        </div>
                    </div>

                    <div className={cx('input-value')}>
                        <div className={cx('input-1')}>
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                onChange={handleChange}
                                name="phoneNumber"
                                value={phoneNumber}
                            />
                        </div>
                        <div className={cx('input-1')}>
                            <input
                                type="text"
                                placeholder="Địa chỉ"
                                onChange={handleChange}
                                name="address"
                                value={address}
                            />
                        </div>
                    </div>

                    <div className={cx('input-value')}>
                        <div className={cx('input-1')}>
                            <textarea
                                placeholder="Lời nhắn"
                                onChange={handleChange}
                                name="message"
                                value={message}
                            ></textarea>
                        </div>
                    </div>

                    <div className={cx('btn-submit')}>
                        <button type="submit">Gửi</button>
                    </div>
                </form>
                {check && (
                    <div className={cx('error')}>
                        <p className={cx('err-desc')}>{check}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default LienHe;
