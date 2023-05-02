import classNames from 'classnames/bind';
import styles from './MenuUser.module.scss';
const cx = classNames.bind(styles);
function MenuUser({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}
export default MenuUser;
