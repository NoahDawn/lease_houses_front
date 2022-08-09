// 初始的订单数据
import { dateCodeChange, differDays } from "common/Utils"

export default function orderData() {
  let orderList =  [ // 订单数据
    {
      id: 1,
      renterId: 4,
      ownerId: 1,
      houseId: 1,
      rentMonth: 4,
      renterState: 1,
      ownerState: 1,
      detail: "",
      invalidTime: dateCodeChange(new Date('2021-02-24 08:00:00'))
    },
    {
      id: 2,
      renterId: 5,
      ownerId: 1,
      houseId: 6,
      rentMonth: 2,
      renterState: 3,
      ownerState: 1,
      detail: "",
      invalidTime: dateCodeChange(new Date('2021-02-24 08:00:00'))
    },
    {
      id: 3,
      renterId: 4,
      ownerId: 1,
      houseId: 10,
      rentMonth: 7,
      renterState: 1,
      ownerState: 1,
      detail: "",
      invalidTime: dateCodeChange(new Date('2021-02-24 08:00:00'))
    },
    {
      id: 4,
      renterId: 6,
      ownerId: 1,
      houseId: 16,
      rentMonth: 2,
      renterState: 1,
      ownerState: 1,
      detail: "",
      invalidTime: dateCodeChange(new Date('2021-02-24 08:00:00'))
    },
    {
      id: 5,
      renterId: 7,
      ownerId: 1,
      houseId: 18,
      rentMonth: 10,
      renterState: 1,
      ownerState: 1,
      detail: "",
      invalidTime: dateCodeChange(new Date('2021-02-24 08:00:00'))
    },
    {
      id: 6,
      renterId: 5,
      ownerId: 2,
      houseId: 23,
      rentMonth: 4,
      renterState: 1,
      ownerState: 1,
      detail: "",
      invalidTime: dateCodeChange(new Date('2021-02-24 08:00:00'))
    },
    {
      id: 7,
      renterId: 4,
      ownerId: 2,
      houseId: 25,
      rentMonth: 5,
      renterState: 3,
      ownerState: 1,
      detail: "",
      invalidTime: dateCodeChange(new Date('2021-02-24 08:00:00'))
    },
    {
      id: 8,
      renterId: 6,
      ownerId: 2,
      houseId: 28,
      rentMonth: 3,
      renterState: 1,
      ownerState: 1,
      detail: "",
      invalidTime: dateCodeChange(new Date('2021-02-24 08:00:00'))
    },
    {
      id: 9,
      renterId: 7,
      ownerId: 3,
      houseId: 32,
      rentMonth: 6,
      renterState: 1,
      ownerState: 1,
      detail: "",
      invalidTime: dateCodeChange(new Date('2021-02-24 08:00:00'))
    },
    {
      id: 10,
      renterId: 5,
      ownerId: 1,
      houseId: 14,
      rentMonth: 3,
      renterState: 0,
      ownerState: 1,
      detail: "",
      invalidTime: dateCodeChange(new Date('2021-02-24 08:00:00'))
    },
  ]

  return orderList
}
