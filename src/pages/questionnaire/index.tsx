import React from "react";
import { connect } from 'react-redux';
import Questionnaire from '../../components/questionnaire';
import styles from '../home/style.module.scss';
import Header from '../../components/layout/header';

function Home() {


  return (
    <div className={styles.container}>
      <header>
        <title>Ecologeo</title>
        <meta name="description" content="Aplicación Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </header>

      <Header />
      <main className={styles.main}>
        <Questionnaire />

        
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
