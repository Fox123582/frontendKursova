import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import {NavLink, useLocation} from "react-router-dom";
import {motion} from "framer-motion";

export const TagsBlock = ({ items, isLoading = true }) => {
    const location = useLocation();
    const currentUrl = location.pathname

    const handleClick = () => {
        // Прокрутить страницу наверх
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to={`/tags/${name}`}>
            <ListItem
                key={i}
                disablePadding
                selected={currentUrl === `/tags/${name}`}
                style={{
                    backgroundColor: currentUrl === `/tags/${name}` ? 'rgba(0, 0, 0, 0.1)' : null,
                    // Добавляем стили при наведении
                    '&:hover': {
                        backgroundColor: '#F5F5F5',
                    },
                }}
                onClick={handleClick}
            >

                <motion.span
                    whileHover={{scale:1.05}}
                    style={{width:'100%'}}
                    transition={{ duration: 0.3,type:'spring', stiffness:300 }}
                >
                  <ListItemButton style={{
                      '&:hover': {
                          backgroundColor: '#F5F5F5',
                      }
                  }}>
                    <ListItemIcon>
                      <TagIcon />
                    </ListItemIcon>
                    {isLoading ? (
                      <Skeleton width={100} />
                    ) : (
                      <ListItemText primary={name} />
                    )}
                  </ListItemButton>
                </motion.span>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </SideBlock>
  );
};
