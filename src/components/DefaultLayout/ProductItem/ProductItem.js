import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function ProductItem({ src, title, price, className, id, classNameImg = false }) {
    const classname = cx('img', { classNameImg });
    return (
        <div className={cx('wrapper', className)}>
            <Link to={`/information/${id}`}>
                <div className={cx('item')}>
                    <div className={cx('box-img')}>
                        <img className={classname} src={src} alt="" />
                    </div>
                    <div className={cx('product-info')}>
                        <p className={cx('title')}>{title}</p>
                        <p className={cx('price')}>{price}</p>
                        <button className={cx('btn')}>Thêm vào giỏ</button>
                    </div>
                </div>
            </Link>
        </div>
    );
}
export default ProductItem;
