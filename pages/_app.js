import '../styles/global.css'
import Provider, { Context } from '../provider'

export default function App({ Component, pageProps, router }) {
  return (
    <Provider>
      <Context.Consumer>
        {(context) => {
          const { isPageVisible } = context.state

          return (
            <div
              className="page-wrapper"
              style={{
                opacity: isPageVisible ? '1' : '0',
              }}
            >
              <Component {...pageProps} />
            </div>
          )
        }}
      </Context.Consumer>
    </Provider>
  )
}
