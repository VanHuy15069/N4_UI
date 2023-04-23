import Header from '../DefaultLayout/Header';
import Footer from '../DefaultLayout/Footer';
import Contact from '../DefaultLayout/Contact';
import classNames from 'classnames/bind';
import styles from './NoSlider.module.scss';
const cx = classNames.bind(styles);
function NoSlider({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('wrapper')}>
                {children}
                <Contact />
            </div>
            <Footer />
        </div>
    );
}
export default NoSlider;
