import './GlobalStyles.scss';
import classNames from 'classnames/bind';
import styles from './Scroll.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
const cx = classNames.bind(styles);
function GlobalStyles({ children }) {
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 400) {
                setDisplay(true);
            } else {
                setDisplay(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
    }, []);
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div>
            {children}
            {display && (
                <div className={cx('scroll-icon')} onClick={handleClick}>
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            )}
        </div>
    );
}
export default GlobalStyles;
