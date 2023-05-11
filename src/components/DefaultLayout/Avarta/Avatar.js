import classNames from 'classnames/bind';
import styles from './Avarta.module.scss';
const cx = classNames.bind(styles);

function Avarta({ children }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('text')}>{children}</p>
        </div>
    );
}
export default Avarta;
