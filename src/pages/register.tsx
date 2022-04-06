import React from "react";
import { connect } from 'react-redux';
import Register from '../components/auth/register';
import styles from './home/style.module.scss';
import Header from '../components/layout/header';

function Home() {


  return (
    <div className={styles.container}>

      <Header />
      <main className={styles.main}>
        <Register />

        
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
