import { getUserInfo } from "@/actions/User"
import SimplifiedKYC from "@/components/shared/kyc-form"

export default async function Page() {

  const verified = await getUserInfo( )
  return <SimplifiedKYC verified={verified?.verified} />
}
