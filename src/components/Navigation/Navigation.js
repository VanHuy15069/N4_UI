import styles from './Navigation.module.scss';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem/MenuItem';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function Navigation() {
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 155) {
                setDisplay(true);
            } else {
                setDisplay(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
    }, []);
    return (
        <div className={cx('wrapper', { active: display })}>
            <div className={cx('menu')}>
                <MenuItem to={'/'} data={'TRANG CHỦ'} />
                <MenuItem to={'/review'} data={'GIỚI THIỆU'} />
                <MenuItem to={'/product/nam'} data={'ĐỒNG HỒ NAM'} />
                <MenuItem to={'/product/nu'} data={'ĐỒNG HỒ NỮ'} />
                <MenuItem to={'/blogs'} data={'BLOGS'} />
                <MenuItem to={'/lien-he'} data={'LIÊN HỆ'} />
            </div>
        </div>
    );
}
export default Navigation;
