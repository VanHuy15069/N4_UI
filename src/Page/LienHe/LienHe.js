import classNames from 'classnames/bind';
import styles from './LienHe.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faSquarePhone } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const cx = classNames.bind(styles);

function LienHe() {
    const [check, setCheck] = useState('');
    const [data, setData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        note: '',
    });
    const [success, setSuccess] = useState(false);
    const { fullName, email, phoneNumber, address, note } = data;
    const classname = cx('error', { success });
    let handleChange = (e) => {
        let spaceValue = e.target.value;
        if (!spaceValue.startsWith(' ')) {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };
    let handleRegister = (e) => {
        e.preventDefault();
        if (!data.fullName || !data.email || !data.address || !data.phoneNumber || !data.note) {
            setCheck('Vui lòng nhập đầy đủ thông tin!');
            setSuccess(false);
        } else {
            axios
                .post('http://localhost:5000/api/v1/contact/addContact', data)
                .then(() => {
                    setData({
                        fullName: '',
                        email: '',
                        phoneNumber: '',
                        address: '',
                        note: '',
                    });
                    setCheck('Gửi thông tin liên hệ thành công!');
                    setSuccess(true);
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('maps')}>
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4737884515184!2d105.7325318752119!3d21.05373098060188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1683199430147!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className={cx('about-our')}>
                <div className={cx('item-1')}>
                    <span className={cx('item-logo')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <div className={cx('item-text')}>
                        <h3>Địa chỉ</h3>
                        <p>Số 298 Đ. Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội</p>
                    </div>
                </div>

                <div className={cx('item-1')}>
                    <span className={cx('item-logo')}>
                        <FontAwesomeIcon icon={faSquarePhone} />
                    </span>
                    <div className={cx('item-text')}>
                        <div className="item-text">
                            <h3>Điện thoại</h3>
                            <h4>1900 636 648</h4>
                            <p>19001000 - Phòng kỹ thuật</p>
                            <p>19888877 - Phòng CSKH</p>
                        </div>
                    </div>
                </div>
                <div className={cx('item-1')}>
                    <span className={cx('item-logo')}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <div className={cx('item-text')}>
                        <h3>Email</h3>
                        <p>n4vippromax@gmail.com</p>
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
                                name="fullName"
                                value={fullName}
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
                                name="note"
                                value={note}
                            ></textarea>
                        </div>
                    </div>

                    <div className={cx('btn-submit')}>
                        <button type="submit">Gửi</button>
                    </div>
                </form>
                {check && (
                    <div className={classname}>
                        <p className={cx('err-desc')}>{check}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default LienHe;
