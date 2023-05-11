import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Contact from './Contact';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Slider />
            <div className={cx('container')}>
                <div>{children}</div>
                <Contact />
            </div>
            <Footer />
        </div>
    );
}
export default DefaultLayout;
