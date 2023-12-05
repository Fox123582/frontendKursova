import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components";
import { TagsBlock } from "../components";
import {useDispatch, useSelector} from "react-redux";
import {fetchPost, fetchTags} from "../redux/slices/posts";
import {motion} from "framer-motion";


export const Home = () => {
    const dispatch = useDispatch()

    const { posts, tags} = useSelector( state => state.posts)

    const userData = useSelector( state => state.auth.data)

    const isPostLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'
    const [renderPopular, setRenderPopular] = useState(false)


    useEffect(() => {
        dispatch(fetchPost())
        dispatch(fetchTags())
    }, []);

    const mostPopular = posts.items.filter(elem => elem.viewsCount > 10).sort((a, b) => b.viewsCount - a.viewsCount);
    const dataToRender = renderPopular ?  mostPopular : posts.items

    const onClickPopular = ()=>{
        setRenderPopular(true)
    }
    const onClickAll =()=>{
        setRenderPopular(false)
    }






    return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={renderPopular ? 1 : 0}
        aria-label="basic tabs example"
      >
        <Tab onClick = {onClickAll} label="New" />
        <Tab onClick = {onClickPopular} label="Most Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : dataToRender ).map((obj,index) => isPostLoading ? <Post  key={index} isLoading={true}/> : (
              (
                  <motion.div
                      whileHover={{scale:1.03}}
                      key={obj._id}
                      animate={{
                          y: [50, 0],
                      }}
                      transition={{ duration: 0.3,type:'spring', stiffness:300 }}>
                          <Post
                              key={obj._id}
                              id={obj._id}
                              title={obj.title}
                              imageUrl={obj.imageUrl}
                              user={obj.user}
                              createdAt={obj.createdAt}
                              viewsCount={obj.viewsCount}
                              commentsCount={obj.commentsCount}
                              tags={obj.tags}
                              isEditable={userData?._id === obj.user._id}
                          />
                  </motion.div>
              )
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items}
            isLoading={isTagsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
