import classNames from 'classnames/bind';
import styles from './BoxMSG.module.scss';
const cx = classNames.bind(styles);
function BoxMSG({ children, onClickOK, onClickHide, control = false, type }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box')}>
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
            </div>
        </div>
    );
}
export default BoxMSG;
