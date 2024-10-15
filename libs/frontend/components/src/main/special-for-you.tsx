import { SpecialForYouItem } from './special-for-you-item'

export function SpecialForYou(): JSX.Element {
  const mockData = [
    {
      title: 'crossfit',
      image: 'preview-03'
    },
    {
      title: 'power',
      image: 'preview-02'
    },
    {
      title: 'boxing',
      image: 'preview-01'
    }
  ]
  return (
    <section className="special-for-you">
          <div className="container">
            <div className="special-for-you__wrapper">
              <div className="special-for-you__title-wrapper">
                <h2 className="special-for-you__title">Специально подобрано для вас</h2>
                <div className="special-for-you__controls">
                  <button className="btn-icon special-for-you__control" type="button" aria-label="previous">
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                  </button>
                  <button className="btn-icon special-for-you__control" type="button" aria-label="next">
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlinkHref="#arrow-right"></use>
                    </svg>
                  </button>
                </div>
              </div>
              <ul className="special-for-you__list">
                { mockData.map((item) => (<SpecialForYouItem title={item.title} image={item.image} />))}
              </ul>
            </div>
          </div>
        </section>
  )
}
