import React from "react";
import { connect } from 'react-redux';
import PlayQuestionnaire from '../../components/questionnaire/play';
import styles from '../home/style.module.scss';
import Header from '../../components/layout/header';

function Play(props:any) {


    const idQuest = props.match.params.hasOwnProperty('quest')?props.match.params.quest:''

  return (
    <div className={styles.container}>
      <header>
        <title>Ecologeo</title>
        <meta name="description" content="Aplicación Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </header>

      <Header />
      <main className={styles.main}>
        <PlayQuestionnaire idQuest={idQuest} />       
      </main>

      {/*<Footer />*/}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
})

const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Play);
