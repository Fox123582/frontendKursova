import React from 'react';
import Grid from "@mui/material/Grid";
import {Post, TagsBlock} from "../../components";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {motion} from "framer-motion";


function SortOnTagsPage(props) {
    const nav = useNavigate()
    const {tag} = useParams()

    const { posts, tags} = useSelector( state => state.posts)

    const userData = useSelector( state => state.auth.data)

    const isPostLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'

    console.log(posts.items)
    let dataToRender = posts.items.filter(elem => elem.tags.some(elementTag => elementTag === tag))

    console.log(dataToRender)
    console.log(tag)


    if(dataToRender.length === 0){
        nav('/')
    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isPostLoading ? [...Array(5)] : dataToRender ).map((obj,index) => isPostLoading ? <Post  key={index} isLoading={true}/> : (
                        (
                            <motion.div
                                whileHover={{scale:1.03}}
                                key={obj._id}
                                animate={{
                                    y: [100, 0],
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
    )
}

export default SortOnTagsPage;
