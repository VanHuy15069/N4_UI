import classNames from 'classnames/bind';
import styles from './TableDetails.module.scss';
const cx = classNames.bind(styles);

function TableDetails({ products, priceSum, note }) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <div className={cx('data-table_detail')}>
            <table className={cx('table-detail')}>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => {
                        return (
                            <tr key={index}>
                                <td className={cx('product-item')}>
                                    <p className={cx('product-title')}>{product.productInfo.title}</p>
                                    <div className={cx('quantity')}>{` × ${product.quantity}`}</div>
                                </td>
                                <td className={cx('bold')}>
                                    {VND.format(product.productInfo.price * product.quantity)}
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className={cx('primary')}>Tổng phụ</td>
                        <td className={cx('bold')}>{VND.format(priceSum)}</td>
                    </tr>
                    <tr>
                        <td className={cx('bold', 'not-back')}>Giao hàng</td>
                        <td>Giao hàng miễn phí</td>
                    </tr>
                    <tr>
                        <td className={cx('bold', 'not-back')}>Phương thức thanh toán</td>
                        <td>Trả tiền mặt khi nhận hàng</td>
                    </tr>
                    <tr className={cx('boder-bold', 'primary')}>
                        <td>Tổng</td>
                        <td className={cx('bold')}>{VND.format(priceSum)}</td>
                    </tr>
                </tbody>
            </table>
            <p className={cx('note')}>
                Ghi chú: <span>{note}</span>
            </p>
        </div>
    );
}
export default TableDetails;
