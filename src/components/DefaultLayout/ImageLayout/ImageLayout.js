import classNames from 'classnames/bind';
import styles from './ImageLayout.module.scss';
const cx = classNames.bind(styles);
function ImageLayout({ src, title, onHihe }) {
    return (
        <div className={cx('wrapper')} onClick={onHihe}>
            <div className={cx('box')}>
                <div className={cx('box-img')}>
                    <img
                        onClick={(e) => e.stopPropagation()}
                        className={cx('img')}
                        src={`http://localhost:5000/src/${src}`}
                        alt=""
                    />
                </div>
                <div className={cx('title')} onClick={(e) => e.stopPropagation()}>
                    <p className={cx('name')}>{title}</p>
                </div>
            </div>
        </div>
    );
}
export default ImageLayout;
