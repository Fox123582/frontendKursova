import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState:{errors,isValid}
    } = useForm({
        defaultValues:{
            fullName:'',
            email:'',
            password:''
        },
        mode:'onChange'
    })

    if(isAuth){
        return <Navigate to={'/'}/>
    }

    const onSubmit = async (values)=>{
        const data = await dispatch(fetchRegister(values))
        if(!data.payload){
            return  alert('Error register')
        }

        if ('token' in data.payload){
            window.localStorage.setItem('token',data.payload.token)
        }
    }


  return (
    <Paper classes={{ root: styles.root }}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Create account
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <TextField
                error={Boolean(errors.fullName?.message)}
                {...register('fullName', { required : 'Enter fullName'})}
                helperText={errors.fullName?.message}
                className={styles.field}
                label="Full name"
                fullWidth
            />
            <TextField
                className={styles.field}
                label="E-Mail"
                fullWidth
                type={"email"}
                error={Boolean(errors.email?.message)}
                {...register('email', { required : 'Enter email'})}
                helperText={errors.email?.message}
            />
            <TextField
                className={styles.field}
                label="Password"
                fullWidth
                type={"password"}
                error={Boolean(errors.password?.message)}
                {...register('password', { required : 'Enter password'})}
                helperText={errors.password?.message}
            />
            <Button disabled={!isValid} type={"submit"} size="large" variant="contained" fullWidth>
                Create account
            </Button>
        </form>
    </Paper>
  );
};
