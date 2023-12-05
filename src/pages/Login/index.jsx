import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState:{errors,isValid}
    } = useForm({
        defaultValues:{
            email:'',
            password:''
        },
        mode:'onChange'
    })

    if(isAuth){
        return <Navigate to={'/'}/>
    }

    const onSubmit = async (values)=>{
        const data = await dispatch(fetchAuth(values))
        if(!data.payload){
            return  alert('Error login')
        }

        if ('token' in data.payload){
            window.localStorage.setItem('token',data.payload.token)
        }
    }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login account
      </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                className={styles.field}
                label="E-Mail"
                type={"email"}
                error={Boolean(errors.email?.message)}
                {...register('email', { required : 'Enter email'})}
                helperText={errors.email?.message}
                fullWidth
            />
            <TextField
                type={"password"}
                className={styles.field}
                label="Password"
                fullWidth
                error={Boolean(errors.password?.message)}
                {...register('password', { required : 'Enter password'})}
                helperText={errors.password?.message}

            />
            <Button disabled={!isValid} type={"submit"} size="large" variant="contained" fullWidth>
                Login
            </Button>
        </form>
    </Paper>
  );
};
