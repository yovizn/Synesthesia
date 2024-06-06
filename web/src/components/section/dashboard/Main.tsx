import { PromotorType } from '@/types/promotor.type'

type Props = {
  data?: PromotorType
}
const MainDashboard = ({ data }: Props) => {
  return <div>{data?.promotorName}</div>
}
export default MainDashboard
