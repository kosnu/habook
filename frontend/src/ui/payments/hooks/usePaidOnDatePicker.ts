import { atom, useRecoilState, useResetRecoilState } from "recoil"

const paidOnDatePickerAtom = atom<Date>({
  key: "payments-paid-on-date-picker-atom",
  default: new Date(),
})

export function usePaidOnDatePicker() {
  const [value, setValue] = useRecoilState(paidOnDatePickerAtom)
  const resetPaidOnDatePicker = useResetRecoilState(paidOnDatePickerAtom)

  const handlePaidOnDateChange = (date: Date | null) => {
    date && setValue(date)
  }

  return {
    paidOnDate: value,
    changePaidOnDate: handlePaidOnDateChange,
    resetPaidOnDatePicker: resetPaidOnDatePicker,
  }
}
