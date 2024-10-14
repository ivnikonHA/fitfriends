import { Header } from '../components/header/header';
import { LookForCompany } from '../components/main/look-for-company';
import { PopularTrainings } from '../components/main/popular-trainings';
import { SpecialForYou } from '../components/main/special-for-you';
import { SpecialOffers } from '../components/main/special-offers';

export function MainPage(): JSX.Element {
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

  )
}
