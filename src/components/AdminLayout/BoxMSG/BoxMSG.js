import classNames from 'classnames/bind';
import styles from './BoxMSG.module.scss';
const cx = classNames.bind(styles);
function BoxMSG({ children, onClickOK, onClickHide, control = false, type, maxWidth = false, messageErr }) {
    const className = cx('box', { maxWidth });
    return (
        <div className={cx('wrapper')}>
            <div className={className}>
                <div className={cx('message')}>{children}</div>
                {control ? (
                    <div className={cx('control')}>
                        <button type={type} onClick={onClickOK} className={cx('btn')}>
                            Xác nhận
                        </button>
                        <button onClick={onClickHide} className={cx('btn', 'btn-cancle')}>
                            Hủy bỏ
                        </button>
                    </div>
                ) : (
                    <div onClick={onClickHide} className={cx('cancle')}>
                        X
                    </div>
                )}
                {messageErr && <p className={cx('check-err')}>Có lỗi! {messageErr}</p>}
            </div>
        </div>
    );
}
export default BoxMSG;
