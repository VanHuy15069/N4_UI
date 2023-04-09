import styles from './MenuItem.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);
function MenuItem({ to, data, block = false }) {
    return (
        <NavLink to={to} end className={(nav) => cx('menu-item', { active: nav.isActive })}>
            <span className={cx('title', { block })}>{data}</span>
        </NavLink>
    );
}
export default MenuItem;
