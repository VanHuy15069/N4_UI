import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import classNames from 'classnames/bind';
import styles from './DefauldLayout.module.scss';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Slider />
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    );
}
export default DefaultLayout;
