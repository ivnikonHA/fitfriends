//import styles from './main.module.css';
import { Header, LookForCompany, PopularTrainings, SpecialForYou, SpecialOffers } from '@fitfriends/components'

export function Main() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <SpecialForYou />
        <SpecialOffers />
        <PopularTrainings />
        <LookForCompany />
      </main>
    </div>
  );
}

export default Main;
