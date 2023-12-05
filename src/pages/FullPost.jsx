import React, {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown';

import { Post } from "../components";
import {useParams} from "react-router-dom";
import axios from "../axios";

export const FullPost = () => {
    const [data,setData] = useState()
    const [isLoading,setIsLoading] = useState(true)

    const {id} = useParams()

    console.log(id)

    useEffect(() => {
        axios.get(`/posts/${id}`).then(res => {
            setData(res.data)
            setIsLoading(false)
        }).catch(err=>{
            console.warn(err)
        })
    }, []);

    if (isLoading){
        return <Post isLoading={isLoading}/>
    }
  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}/>
      </Post>
    </>
  );
};
