import classNames from 'classnames/bind';
import styles from './MenuUserItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);
function MenuUserItem({ content, className, onClick, icon }) {
    return (
        <div className={cx('wrapper', className)} onClick={onClick}>
            <span className={cx('icon')}>
                <FontAwesomeIcon icon={icon} />
            </span>
            {content}
        </div>
    );
}
export default MenuUserItem;
