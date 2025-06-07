import BadgesDisplay from "@/components/shared/ranks"
import { handleClick,getUserInfo } from "@/actions/User";

const Badges = async () => {
  const user=await getUserInfo()
  const badge=user?.badge1
  return (
  <BadgesDisplay badg={badge} handleClick={handleClick} />
);
};

export default Badges;
