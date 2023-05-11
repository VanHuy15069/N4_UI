import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);
function SideBar({ getCurnon, getNakzen, getRolex, getJulius, getRossini, getAll }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('title')}>Danh mục sản phẩm</h3>
                <div className={cx('line')}></div>
                <div className={cx('box')}>
                    <NavLink to="/product/nam" end className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <p onClick={getAll} className={cx('category')}>
                            Đồng hồ nam
                        </p>
                    </NavLink>

                    <NavLink to="/product/nu" end className={(nav) => cx('menu-item', { active: nav.isActive })}>
                        <p onClick={getAll} className={cx('category')}>
                            Đồng hồ nữ
                        </p>
                    </NavLink>
                </div>
            </div>
            <div className={cx('container')}>
                <h3 className={cx('title')}>Thương hiệu</h3>
                <div className={cx('line')}></div>
                <div className={cx('box')}>
                    <div onClick={getCurnon} className={cx('category')}>
                        Curnon
                    </div>
                    <div onClick={getJulius} className={cx('category')}>
                        Julius
                    </div>
                    <div onClick={getNakzen} className={cx('category')}>
                        Nakzen
                    </div>
                    <div onClick={getRolex} className={cx('category')}>
                        Rolex
                    </div>
                    <div onClick={getRossini} className={cx('category')}>
                        Rossini
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SideBar;
