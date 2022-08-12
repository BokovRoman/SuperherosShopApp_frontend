import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

import { Hero } from '../components/Hero';
import { fetchHeroes } from '../redux/slices/heroes';


export const Home = () => {
  const dispatch = useDispatch();
    const userData= useSelector(state => state.auth.data);
    const {heroes } = useSelector(state => state.heroes);

    const isHeroesLoading = heroes.status === 'loading';

    useEffect(() => {
        dispatch(fetchHeroes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(heroes);

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
                  {(isHeroesLoading?[...Array(5)] : heroes.items).map((obj, index) =>
                      isHeroesLoading ? (
                          <Hero key={index} isLoading={true}/>
                      ):
                  (
            <Hero
                id={obj._id}
                key={obj._id}
                nickname={obj.nickname}
                images={obj.images}
                user={obj.user.fullName}
                viewsCount={obj.viewsCount}
                isLoading={false}
                isEditable={userData?._id}
            />
          ))}
        </Grid>

      </Grid>
    </>
  );
};