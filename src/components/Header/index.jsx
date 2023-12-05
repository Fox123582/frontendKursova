import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";
import {motion} from "framer-motion";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()


  const onClickLogout = ()=>{
    if (window.confirm('Are you sure to logout')){
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  }



  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to={'/'} className={styles.logo} >
            <motion.div whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:300 }}>BLOG</motion.div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
                <>
                  <Link to={'/add-post'}>
                      <Button variant="outlined">
                        <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:300 }}>
                          Write an article
                        </motion.span>
                      </Button>
                  </Link>

                  <Button onClick={onClickLogout} variant="contained" color={'error'}>
                    <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:300 }}>Log out</motion.span>
                  </Button>
                </>
              ) : (
                  <>
                    <Link to={'/login'}>
                        <Button variant="outlined">
                          <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:300 }}>Log in</motion.span>
                        </Button>
                    </Link>
                    <Link to={'/register'}>
                      <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:300 }}>
                        <Button variant="contained">
                          <motion.span whileHover={{scale:1.05}} transition={{ duration: 0.3,type:'spring', stiffness:300 }}>Create an account</motion.span>
                        </Button>
                      </motion.span>
                    </Link>
                  </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
