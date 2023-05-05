import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
const cx = classNames.bind(styles);
function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div>
                    <h2>ĐĂNG KÝ NHẬN THÔNG TIN</h2>
                </div>
                <div className={cx('content-right')}>
                    <div className={cx('input-email')}>
                        <input type="email" placeholder="Email..." className={cx('email')} />
                    </div>
                    <div className={cx('btn-sign-up')}>
                        <input type="button" value="Đăng ký" className={cx('sign-up')} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contact;
