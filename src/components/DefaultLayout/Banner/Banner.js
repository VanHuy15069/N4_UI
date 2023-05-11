import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
const cx = classNames.bind(styles);
function Banner({ src }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('img')} src={src} alt="" />
        </div>
    );
}
export default Banner;
