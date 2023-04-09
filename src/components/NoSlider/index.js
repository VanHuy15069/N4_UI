import Header from '../DefaulLayout/Header';
import Footer from '../DefaulLayout/Footer';
import classNames from 'classnames/bind';
import styles from './NoSlider.module.scss';
const cx = classNames.bind(styles);
function NoSlider({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('wrapper')}>{children}</div>
            <Footer />
        </div>
    );
}
export default NoSlider;
