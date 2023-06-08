import classNames from 'classnames/bind';
import styles from './ProductSearchItem.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function ProductSearchItem({ data }) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <Link to={`/information/${data.id}`} className={cx('wrapper')}>
            <div className={cx('image')}>
                <img className={cx('image-product')} src={`http://localhost:5000/src/${data.image}`} alt="" />
            </div>
            <div className={cx('information')}>
                <h4 className={cx('title')}>{data.title}</h4>
                <p className={cx('price')}>{VND.format(data.price)}</p>
            </div>
        </Link>
    );
}
export default ProductSearchItem;
