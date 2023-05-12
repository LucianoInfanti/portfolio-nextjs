import styles from './index.module.css'
import Link from 'next/link'
import Head from 'next/head'
import client from '../apolloClient'
import { gql } from '@apollo/client'
import ShuffleText from '../components/shuffletext'

// ED: Adicionei esses novos imports
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Context } from '../provider'

export default function Home({ articles }) {
  const context = useContext(Context)
  const router = useRouter()

  // Criei esse evento para mudar a rota
  const handleClick = (event, route) => {
    event.preventDefault()
    context.toggleSiteVisibility()

    setTimeout(() => {
      router.push(route)

      setTimeout(() => {
        context.toggleSiteVisibility()
      }, 600)
    }, 600)
  }

  return (
    <>
      <Head>
        <title>Luciano Infanti</title>
      </Head>
      <div className={styles.wip}>
        <p>WIP</p>
      </div>
      <div className={styles.bodyWrapper}>
        <div
          style={{ stagger: 1 }}
          data-animate
          className={styles.contentWrapper}
        >
          <span className={styles.overline}>Luciano Infanti</span>
          <p>
            Senior designer and aspiring coder. <br />
            Currently honing my skills at{' '}
            <a href="https://work.co/" target="blank" className="underlineLink">
              {' '}
              <ShuffleText text={'Work & Co'} />
            </a>
          </p>
        </div>

        <div className={styles.contentWrapper}>
          <span className={styles.overline}>Hailing frequencies open</span>
          <div className={styles.social}>
            <a
              target="blank"
              className="underlineLink"
              href="https://www.linkedin.com/in/luciano-infanti/"
            >
              <ShuffleText text={'LinkedIn'} />
            </a>
            <span className={styles.span}>, </span>
            <a
              target="blank"
              className="underlineLink"
              href="https://github.com/LucianoInfanti"
            >
              <ShuffleText text={'Github'} />
            </a>
            <span className={styles.span}>, </span>
            <a
              target="blank"
              className="underlineLink"
              href="https://savee.it/lucianoinfanti/"
            >
              <ShuffleText text={'Savee'} />
            </a>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <span className={styles.overline}>Writing</span>
          <div className={styles.articleWrapper}>
            {articles.map((article, index) => (
              <li key={article.id} className={styles.articleItem}>
                <div className={styles.articleRow}>
                  <a onClick={(event) => handleClick(event, article.slug)}>
                    <ShuffleText text={article.title} />
                  </a>
                  <div className={styles.divider}></div>
                  <p>{article.date.substring(6).replace(/-/g, '.')}</p>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Articles {
        articles {
          id
          date
          slug
          title
        }
      }
    `,
  })

  const { articles } = data
  return {
    props: {
      articles,
    },
  }
}
