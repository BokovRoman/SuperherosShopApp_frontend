import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { fetchRemoveHeroes } from '../../redux/slices/heroes';
import styles from './Hero.module.scss';

export const Hero = ({
    id,
    nickname,
    isLoading,
    images,
    isEditable,
    viewsCount,
    user,

}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <Loader/>
  }

  const onClickRemove = () => { 
    isLoading = false;
    if (window.confirm('Do you want to delete this Hero??')) {
            dispatch(fetchRemoveHeroes(id));
         }
  };
    
  return (
      <div className={styles.root}>
          <ul className={styles.HeroList}>
              <li key={id} >
                  {isEditable && (
                        <div className={styles.editButtons}>
                        <Link to={`/heroes/${id}/edit`}>
                            <IconButton color="primary">
                            <EditIcon />
                            </IconButton>
                        </Link>
                        <IconButton onClick={onClickRemove} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                        </div>
                    )}
                    <Link className={styles.Link}
                        to={`/heroes/${id}`}
                    >
                    <div>
                        <img className={styles.image}
                            src={images} alt={nickname}/>
                    </div>
                      <p className={styles.title}>{nickname}</p>
                      <p className={styles.owner}>Created by: {user}</p>
                      <p className={styles.views}>Views: {viewsCount}</p>
                    </Link>
                </li>
          </ul>
    </div>
  );
};