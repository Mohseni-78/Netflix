import Account from '@/components/Account'
import { userT } from '@/typing'
import { verifyToken } from '@/utils/functions'
import { GetServerSideProps } from 'next'
import React from 'react'
interface props {
  user: userT
}
const account = ({ user }: props) => {
  return (
    <>
      <Account user={user} />
    </>
  )
}

export default account

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies
  const verifiedToken = await verifyToken(token || '')
  if (!token) {
    return {
      redirect: {
        destination: "/"
      }
    }
  }
  return { props: { user: verifiedToken } }

}