import Head from 'next/head'
import buildFullUrl from '../lib/buildFullUrl'
import clsx from 'clsx'
import { kebabCase } from 'lib/helpers'

export const EXPECTED_URL =
  'https://seasoned.cc/fake-path/2/resource?tags[]=fake&tags[]=path&at-page=2'

const url = buildFullUrl({
  baseUrl: 'https://seasoned.cc/',
  name: 'resource',
  id: 2,
  customPath: '/fake-path/:id/resource',
  queryStringParser: kebabCase,
  query: {
    tags: ['fake', 'path'],
    atPage: 2,
    nan: NaN,
    null: null,
    undef: undefined,
  } as any,
})

export default function Home() {
  const isEqual = url === EXPECTED_URL
  return (
    <div
      className={clsx(
        'transition-all duration-300 relative h-screen flex text-gray-900 flex-col items-center justify-center text-center text-gray-800',
        isEqual ? 'bg-green-200' : 'bg-red-200',
      )}
    >
      <Head>
        <title>Frontend test</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <aside className="text-8xl">{isEqual ? '🤤' : '😢'}</aside>
      <main className="relative z-10 m-10 shadow-xl p-6 px-10 rounded-lg bg-white">
        <h2 className="font-semibold uppercase mb-1">Expected URL:</h2>
        <code>{EXPECTED_URL}</code>
        <h2 className="font-semibold uppercase mt-4 mb-1">Actual URL:</h2>
        <code
          className={clsx(
            'transition-all duration-300',
            isEqual ? 'text-green-600' : 'text-red-600',
          )}
        >
          {url}
        </code>
      </main>
    </div>
  )
}
