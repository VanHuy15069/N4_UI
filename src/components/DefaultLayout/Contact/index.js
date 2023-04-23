import classNames from 'classnames';
import styles from './Contact.modules.scss';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-left')}>
                <h2>ĐĂNG KÝ NHẬN THÔNG TIN</h2>
            </div>

            <div className={cx('content-right')}>
                <div className={cx('input-email')}>
                    <input type="email" placeholder="Email..." className={cx('email')} />
                </div>
                <div className={cx('btn-sign-up')}>
                    <input type="submit" value="Đăng ký" className={cx('sign-up')} />
                </div>
            </div>
        </div>
    );
}

export default Contact;
