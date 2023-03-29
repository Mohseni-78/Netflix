import { GetServerSideProps } from 'next'
import React from 'react'
// Imported Components =============>
import Account from '@/components/Account'
// Imported Types =============>
import { userT } from '@/typing'
// Imported Utils ============>
import { verifyToken } from '@/utils/functions'

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
        destination: "/",
        permanent: false,
      }
    }
  }
  return {
    props: { user: verifiedToken }
  }

}