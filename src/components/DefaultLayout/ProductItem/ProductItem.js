import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Context } from '~/Provider/Provider';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function ProductItem({ src, title, price, className, id, classNameImg = false, onClick }) {
    const [, , user, , , setShow, ,] = useContext(Context);
    const [cart, setCart] = useState(false);
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const classname = cx('img', { classNameImg });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            axios
                .post('http://localhost:5000/api/v1/order/addOder', {
                    userId: user.id,
                    productId: id,
                    quantity: 1,
                    priceTotal: price,
                })
                .then((res) => {
                    if (id === res.data.order[0].productId) {
                        setCart(true);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setShow(true);
        }
    };
    const handleClick = (e) => {
        e.stopPropagation();
    };
    return (
        <div className={cx('wrapper', className)}>
            <form onSubmit={handleSubmit}>
                <div className={cx('item')} onClick={onClick}>
                    <Link to={`/information/${id}`}>
                        <div className={cx('box-img')}>
                            <img className={classname} src={`http://localhost:5000/src/${src}`} alt="" />
                        </div>
                        <div className={cx('product-info')}>
                            <p className={cx('title')}>{title}</p>
                            <p className={cx('price')}>{VND.format(price)}</p>
                        </div>
                    </Link>
                    <div className={cx('control')}>
                        {cart ? (
                            <Link to="/cart">
                                <div className={cx('btn', 'btn-link')}>
                                    Xem giỏ hàng{' '}
                                    <span>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </span>
                                </div>
                            </Link>
                        ) : (
                            <button type="submit" onClick={handleClick} className={cx('btn')}>
                                Thêm vào giỏ
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
export default ProductItem;
