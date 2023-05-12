import classNames from 'classnames/bind';
import styles from './Blogs.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Blogs() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>BLOGS</div>

            <div className={cx('content')}>
                <div className={cx('blog-left')}>
                    <div className={cx('top')}>
                        <input type="text" name="search-blog" className={cx('search-blog')} placeholder="Tìm kiếm..." />
                        <button type="submit" name="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>

                    <div className={cx('bottom')}>
                        <h3>Bài viết mới</h3>

                        <div className={cx('bottom-wrapper')}>
                            <div className={cx('bottom-content')}>
                                <div className={cx('img')}></div>

                                <div className={cx('title')}>Title</div>
                            </div>

                            <div className={cx('bottom-content')}>
                                <div className={cx('img')}></div>

                                <div className={cx('title')}>Title</div>
                            </div>

                            <div className={cx('bottom-content')}>
                                <div className={cx('img')}></div>

                                <div className={cx('title')}>Title</div>
                            </div>

                            <div className={cx('bottom-content')}>
                                <div className={cx('img')}></div>

                                <div className={cx('title')}>Title</div>
                            </div>

                            <div className={cx('bottom-content')}>
                                <div className={cx('img')}></div>

                                <div className={cx('title')}>Title</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('blog-right')}></div>
            </div>
        </div>
    );
}
export default Blogs;
