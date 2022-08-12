import React from "react";

import { HeroItem } from "../components/HeroItem";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../axios";
import Loader from '../components/Loader';

export const FullHero = () => {
    const [data, setData] = useState();
    const [isLoading, setisLoading] = useState(true);

    const { id } = useParams();
    
    useEffect(() => {

        axios.get(`/heroes/${id}`).then(res => {
            setData(res.data);
            setisLoading(false);
        })
            .catch((err) => {
                console.warn(err);
                alert('Error due getting Hero')
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <Loader/>
    }

  return (
    <>
      <HeroItem
        id={data._id}
        nickname={data.nickname}
        images={data.images}
        user={data.user.fullName}
        viewsCount={data.viewsCount}
        real_name={data.real_name}
        origin_description={data.origin_description}
        superpowers={data.superpowers}
        catch_phrase={data.catch_phrase}
      />
    </>
  );
};