import classNames from 'classnames';
import styles from './Contact.modules.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Contact() {
    let [data, setData] = useState({
        email: '',
    });
    let { email } = data;
    let [check, setCheck] = useState('');

    let handleChange = (e) => {
        let mail = e.target.value;
        if (!mail.startsWith(' ')) {
            setData({ ...data, [e.target.name]: [e.target.value] });
        }
        console.log(mail);
    };

    let pushData = (e) => {
        e.preventDefault();
        if (!data.email) {
            setCheck('Vui lòng nhập đủ thông tin trước khi gửi!');
        } else {
            alert(data.email);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-left')}>
                <h2>ĐĂNG KÝ NHẬN THÔNG TIN</h2>
            </div>

            <div className={cx('content-right')}>
                <div className={cx('top')}>
                    <div className={cx('input-email')}>
                        <input
                            type="email"
                            placeholder="Email..."
                            className={cx('email')}
                            onChange={handleChange}
                            value={email}
                            name="email"
                        />
                    </div>
                    <div className={cx('btn-sign-up')}>
                        <input type="submit" value="Đăng ký" className={cx('sign-up')} onClick={pushData} />
                    </div>
                </div>
                <div className={cx('bottom')}>
                    {check && (
                        <div className="error">
                            <p>{check}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Contact;
