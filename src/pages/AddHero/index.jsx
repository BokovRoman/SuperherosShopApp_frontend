import React, {useState} from 'react';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, Navigate , useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import 'easymde/dist/easymde.min.css';
import styles from './AddHero.module.scss';
import axios from '../../axios';
import { useEffect } from 'react';

export const AddHero = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isAuth = useSelector(selectIsAuth);
    const [isLoading, setIsLoading] = useState(false);
    const [nickname, setNickname] = useState('');
    const [real_name, setReal_name] = useState('');
    const [origin_description, setOrigin_description]= useState('');
    const [superpowers, setSuperpowers] = useState('');
    const [catch_phrase, setCatch_phrase] = useState('');
    const [images, setImages] = useState('');
   
    const isEditing = Boolean(id);

    
    const onSubmit = async () => {
        try {
            setIsLoading(true);

            const fields = {
                nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase,
                images
            }

            const { data } = isEditing
                ? await axios.patch(`/heroes/${id}`, fields)
                :await axios.post('/heroes', fields);

            const _id =isEditing? id: data._id;

        navigate(`/heroes/${_id}`);
        } catch(err) {
            console.warn(err);
            alert('Error due creating Hero')
        }
    }

    useEffect(() => {
        if (id) {
            axios.get(`/heroes/${id}`).then(({ data }) => {
                setNickname(data.nickname);
                setReal_name(data.real_name);
                setOrigin_description(data.origin_description);
                setSuperpowers(data.superpowers);
                setCatch_phrase(data.catch_phrase);
                setImages(data.images);
            }).catch(err => {
                console.warn(err);
                alert('Error due update Hero')
            });
        }
    }, []);

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to ="/" />
    }


    return (
    <Paper style={{ padding: 30 }}>
        <div className={styles.notice}>
                {isEditing ? 'Update fields that you want' : 'Fill all fields for creating new Hero'}  
        </div>
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Nickname"
        value={nickname}
        onChange={(e)=>setNickname(e.target.value)}
        fullWidth
            />
        <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Real name"
        value={real_name}
        onChange={(e)=>setReal_name(e.target.value)}
        fullWidth
            />
        <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Origin description"
        value={origin_description}
        onChange={(e)=>setOrigin_description(e.target.value)}
        fullWidth
            />
        <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Superpowers"
        value={superpowers}
        onChange={(e)=>setSuperpowers(e.target.value)}
        fullWidth
            />
        <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Catch phrase"
        value={catch_phrase}
        onChange={(e)=>setCatch_phrase(e.target.value)}
        fullWidth
        /> 
        <TextField
            classes={{ root: styles.title }}
            variant="standard"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            placeholder="Url of image for downloading"
            fullWidth
        />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
                    {isEditing? 'Save': 'Create'}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};