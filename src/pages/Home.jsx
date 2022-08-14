import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import usePagination from './usePagination';


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



  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(heroes.items.length / PER_PAGE);
  const _DATA = usePagination(heroes.items, PER_PAGE);

  const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
                  {(isHeroesLoading?[...Array(5)] : _DATA.currentData()).map((obj, index) =>
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

      <Stack spacing={2}>
        <Pagination
          count={count}
          color="primary"
          page={page}
          onChange={handleChange}
        />
      </Stack>

    </>
  );
};