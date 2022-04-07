import React, {useEffect, useState } from "react";
import { connect } from 'react-redux';
import Login from '../../components/auth/login';
import Questionnaire from '../../components/questionnaire';
import styles from './style.module.scss';
import Header from '../../components/layout/header';
import { get } from '../../utils/SesionStorage';

function Home() {

  const [id_user, setId_user] = useState('');

  useEffect(() => {
    const idUser = get("@id_user") ?? '';
    setId_user(idUser);
  }, []);


  return (
    <div className={styles.container}>
      <header>
        <title>Ecologeo</title>
        <meta name="description" content="Aplicación Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </header>

      <Header />
      <main className={styles.main}>
        {id_user == ""?
        <Login />:
        <Questionnaire />}
        

        
      </main>

      {/*<Footer />*/}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
})

const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
