import classNames from 'classnames/bind';
import styles from './BoxMSG.module.scss';
const cx = classNames.bind(styles);
function BoxMSG({ message, onClickOK, onClickHide }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box')}>
                <p className={cx('message')}>{message}</p>
                <div className={cx('control')}>
                    <button onClick={onClickOK} className={cx('btn')}>
                        Xác nhận
                    </button>
                    <button onClick={onClickHide} className={cx('btn', 'btn-cancle')}>
                        Hủy bỏ
                    </button>
                </div>
            </div>
        </div>
    );
}
export default BoxMSG;
