import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './BlogSideBar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function BlogSideBar() {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/v1/blog/getAllBlog')
            .then((res) => {
                setBlog(res.data.blog);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('blog-left')}>
                    <div className={cx('middle')}>
                        <h3>Bài viết mới</h3>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('bottom-wrapper-c')}>
                            {blog
                                .sort((a, b) => b.id - a.id)
                                .slice(0, 6)
                                .map((blog, index) => {
                                    return (
                                        <Link to={`/informationBlog/${blog.id}`} title={blog.title} key={index}>
                                            <div className={cx('bottom-wrapper')}>
                                                <div className={cx('bottom-content')}>
                                                    <div className={cx('img')}>
                                                        <img src={`http://localhost:5000/src/${blog.image}`} alt="" />
                                                    </div>

                                                    <div className={cx('title')}>{blog.title}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
