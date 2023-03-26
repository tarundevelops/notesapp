import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {

  let router = useRouter()
  function red(){

    router.push("/dashboard")
  }


  return (
    <>
      <Head>
        <title>NotesApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

<p>This app helps to make notes</p>

{props.isLoggedIn ? (<Link href={"/dashboard"}>Go to dashboard </Link>):(<><Link href={"/login"}>Login</Link> <span>or</span><Link href={"/signup"}>Signup</Link></>)}


      </main>
    </>
  )
}
