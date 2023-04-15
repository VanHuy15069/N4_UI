import classNames from 'classnames';
import styles from './Contact.scss';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className="content-left">
                <h2>ĐĂNG KÝ NHẬN THÔNG TIN</h2>
            </div>

            <div className="content-right">
                <div className="input-email">
                    <input type="email" placeholder="Email..." className="email" />
                </div>
                <div className="btn-sign-up">
                    <input type="submit" value="Đăng ký" className="sign-up" />
                </div>
            </div>
        </div>
    );
}

export default Contact;
