import { GetServerSideProps } from 'next'
import React from 'react'
// Imported Components =============>
import AccountCom from '@/components/AccountCom'
// Imported Types =============>
import { userT } from '@/typing'
// Imported Utils ============>
import { verifyToken } from '@/utils/functions'

interface props {
  user: userT
}
const Account = ({ user }: props) => {
  return (
    <>
      <AccountCom user={user} />
    </>
  )
}

export default Account

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