import Navbar from '@/component/Navbar'
import '@/styles/globals.css'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
export default function App({ Component, pageProps }) {
  const [isLoggedIn,setLoggedIn] = useState(false)
  let router = useRouter()
    function logoutuser(){
        axios.post("/api/logout").then((data)=>{
        setLoggedIn(false)
        router.push("/")

        })
    }
  return (
    <>

    <Head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"/>
    </Head>
<Navbar isLoggedIn={isLoggedIn} logoutuser={logoutuser} setLoggedIn={setLoggedIn} />
  <Component {...pageProps} setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
  
    </>
  )
}
