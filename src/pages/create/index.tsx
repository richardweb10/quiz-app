import React from "react";
import { connect } from 'react-redux';
import CreateQuestion from '../../components/create';
import styles from './styles.module.scss';
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
        <CreateQuestion />

        
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
