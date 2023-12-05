import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";
import {actionsPosts} from "../../redux/slices/posts";
import {motion} from "framer-motion";

export const AddPost = () => {
    const {id} = useParams()
    const isEditing = Boolean(id)

    const nav = useNavigate()
    // const imageUrl = ''
    const isAuth = useSelector(selectIsAuth)
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const dispatch = useDispatch()


    const inputFileRef = useRef(null)

    const handleChangeFile = async (event)=>{
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image',file)
            const { data } = await axios.post('/uploads',formData)
            setImageUrl(data.url)
        } catch (err){
            console.warn(err)
        }
    }

    const  onClickRemoveItem = async ()=>{
        setImageUrl('')
    }


    const onChange = useCallback((value) => {
        setText(value);
    }, []);


    const onCancelHandler = ()=>{
            nav('/')
    }

    const onSubmit = async ()=>{
        try{
            setIsLoading(true)
            const fields = {
                title,
                imageUrl,
                text,
                tags
            }

            const { data } = isEditing
                ? await axios.patch(`/posts/${id}`,fields)
                : await axios.post('/posts',fields)

            isEditing ? dispatch( actionsPosts.updatePost(data.updatedPost)) : dispatch(actionsPosts.addNewPost(data))
            const _id = isEditing ? id : data._id

            nav(`/posts/${_id}`)
        } catch (err){
            console.warn(err)
        }
    }


    useEffect(() => {
        if(id){
            axios.get(`/posts/${id}`).then(res =>{
                console.log(res)
                setTitle(res.data.title)
                setText(res.data.text)
                setImageUrl(res.data.imageUrl)
                setTags(res.data.tags.join(','))
            })
        }
    }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

    if(window.localStorage.getItem('token') && !isAuth){
        return <Navigate to={'/'}/>
    }


  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick = {()=> inputFileRef.current.click()} variant="outlined" size="large">
          <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:300 }}>
              Download preview
          </motion.span>
      </Button>
        <input ref={inputFileRef} type={"file"} onChange={handleChangeFile} hidden={true}/>
        { imageUrl && (
            <>
                <Button style={{marginLeft: 10}} onClick={onClickRemoveItem} variant="contained" size="large" color={'error'}>
                    <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:300 }}>
                        Delete
                    </motion.span>
                </Button>
                <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="uploaded"/>
            </>
        )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Article title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
          value={tags}
          onChange={e => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick ={onSubmit} size="large" variant="contained">
            <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:300 }}>
                {isEditing ? 'Change' : 'Public'}
            </motion.span>
        </Button>
        <Button onClick = {onCancelHandler} size="large">
            <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:300 }}>
                Cancel
            </motion.span>
        </Button>
      </div>
    </Paper>
  );
};
