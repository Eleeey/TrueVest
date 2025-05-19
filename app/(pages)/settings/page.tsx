import { getClerkUser, getUserInfo } from "@/actions/User";
import SettingsForm from "@/components/shared/SettingsForm";

const page = async () => {
  const clerkUser = await getClerkUser();
  const user = await getUserInfo();
  return (
    <>
      <SettingsForm
        firstName={clerkUser?.firstName}
        lastName={clerkUser?.lastName}
        email={clerkUser?.primaryEmailAddress}
        verified={user?.verified}
        fullName={clerkUser?.fullName}
        phone=""
      />
    </>
  );
};

export default page;
