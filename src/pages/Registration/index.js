import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";


import styles from './Login.module.scss';

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
      defaultValues: {
          fullName:'',
          email: '',
          password:''
        },
        mode:'onChange',
    });
  
    const onSubmit = async(values) => {
        const data = await dispatch(fetchRegister(values));

        if (!data.payload) {
            return alert('Registration failed!');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        } 
    }

    if (isAuth) {
        return <Navigate to ="/" />
    }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField
        className={styles.field}
        label="Full Name"
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', {required:'Enter your Name'})}
        fullWidth
      />
      <TextField
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', {required:'Enter the email'})}
        fullWidth
        type='email'
      />
      <TextField
        className={styles.field}
        label="Password"
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', { required: 'Enter the password' })}
        fullWidth
        type='password'
        />
      
      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Register
        </Button>
      </form>
    </Paper>
  );
};