import { atom, useRecoilState, useResetRecoilState } from "recoil"

const paidOnAtom = atom<Date>({
  key: "payments-paid-on-atom",
  default: new Date(),
})

export function usePaidOnDate() {
  const [value, setValue] = useRecoilState(paidOnAtom)
  const resetPaidOnDate = useResetRecoilState(paidOnAtom)

  const handlePaidOnDateChange = (date: Date | null) => {
    date && setValue(date)
  }

  return {
    paidOnDate: value,
    changePaidOnDate: handlePaidOnDateChange,
    resetPaidOnDate: resetPaidOnDate,
  }
}
