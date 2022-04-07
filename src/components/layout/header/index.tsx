import React, { useState, useEffect } from 'react';
import styles from '../../../pages/home/style.module.scss';
import { get } from '../../../utils/SesionStorage';
import AddIcon from '@mui/icons-material/Add';
import MenuUser from './menuUser';
import Avatar from '@mui/material/Avatar';
import { bindActionCreators } from 'redux';
//import * as foroAction from '../../actions/foro';
import { connect } from 'react-redux';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';



const itemMenu = { minWidth: 100, color: 'blue', cursor: 'pointer' }


function Header(props:any) {

  const [show, setShow] = useState(false);
  const [tokenUser, setToken] = useState(null);
  const [nameUser, setNameUser] = useState('');
  const [avatarUser, setAvatarUser] = useState(null)
  const [showMenuUser, setShowMenuUser] = useState(false);
  const [id_user, setId_user] = useState('');
  const [showSearch, setShowSearch] = useState(false);


  useEffect(() => {
    const name: any = get('@name_user');
    const id: any = get('@id_user');
    const token: any = get('@token');
    setNameUser(name);
    setToken(token)
    setId_user(id)
  }, []);

  
  const closeModal = (e: any) => {
    setShow(!show);
  };

  const handleCloseMenu = () => {
    setShowMenuUser(false);
  }

  const onShowMenuUser = () =>{
    setShowMenuUser(true);
  }

  return (
    <div className={styles.headerConteniner} style={{height:showSearch?'110px':'70px' }}>
      <div className={styles.headerGeneral} style={{height:showSearch?'50%':'100%' }}>
        {/*<Menu />*/}
        <div >
          
              <a className={styles.h1Title} href="/"  >
                <h1>Aplicación Quiz</h1>
              </a>
          
        </div>

        

       
        
        {tokenUser !== null ?
          <div >
            <Stack direction="row" spacing={3}>
            <Link to="/">
            <Avatar sx={{ bgcolor: "#1976d2", margin: "6px 8px", cursor: "pointer"}}>
              <HomeIcon />
            </Avatar>
            </Link>
            <Link to="/create">
                <Avatar sx={{ bgcolor: "#1976d2", margin: "6px 8px", cursor: "pointer"}}>
              <AddIcon />
            </Avatar>
            </Link>

            <MenuUser 
                avatarUser={avatarUser} 
                nameUser={nameUser}
                id_user={id_user}
                />
          </Stack> 
          </div>
          :
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Typography sx={itemMenu}> <Link to="/">Iniciar sesión</Link></Typography>
            <Typography sx={itemMenu}><Link to="/signup">Registrate</Link></Typography>   
            </Box>}
          

      </div>
      
    </div>
  )
}

const mapStateToProps = (state: any) => ({
})

const mapDispatchToProps = (dispatch: any) => ({
  //actions: bindActionCreators(foroAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);