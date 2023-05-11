import classNames from 'classnames/bind';
import styles from './Wrapper.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Wrapper({ children, icon, header, control = false, onCLick }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={icon} />
                </span>
                <h2 className={cx('title')}>{header}</h2>
                {control && (
                    <span className={cx('icon', 'more-icon')} onClick={onCLick}>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                )}
            </div>
            {children}
        </div>
    );
}
export default Wrapper;
