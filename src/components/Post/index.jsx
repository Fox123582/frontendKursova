import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchRemovePost} from "../../redux/slices/posts";

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch()

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onRemoveHandler = ()=>{
    if (window.confirm('Are you sure to delete the post')){
      dispatch(fetchRemovePost(id))
    }

  }
  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton color="secondary">
            <DeleteIcon onClick = {onRemoveHandler} />
          </IconButton>
        </div>
      )}
      {imageUrl &&(
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={`http://localhost:4444${imageUrl}`}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          {tags.length > 0 && (
              <ul className={styles.tags}>
                {tags.map((name) => (
                    name.trim() !== '' &&
                    (<li key={name}>
                      <Link to={`/tags/${name}`}>#{name}</Link>
                    </li>)
                ))}
              </ul>
          ) }

          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
