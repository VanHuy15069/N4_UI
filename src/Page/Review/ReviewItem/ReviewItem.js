import classNames from 'classnames/bind';
import styles from './ReviewItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);
function ReviewItem({ icon, title, text }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('icon')}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className={cx('box')}>
                <h3 className={cx('title')}>{title}</h3>
                <p className={cx('text')}>{text}</p>
            </div>
        </div>
    );
}
export default ReviewItem;
