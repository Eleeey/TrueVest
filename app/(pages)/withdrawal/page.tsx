import React from 'react'
import WithdrawalForm from '@/components/shared/withrawal'
import { getUserInfo } from "@/actions/User"
type Props = {}

const page = async (props: Props) => {
  const user = await getUserInfo()
  return (<div className="flex  bg-slate-800 w-full h-[100vh] space-around">  <WithdrawalForm  balance={user?.Balance}/></div>

  )
}

export default page
